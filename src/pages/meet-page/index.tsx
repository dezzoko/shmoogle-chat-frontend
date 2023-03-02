import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { User } from 'core/entities/user.entity';
import { routes } from 'core/constants/routes';
import { RTCSignalingClientEvents, RTCSignalingServerEvents } from 'core/constants/api';
import { PeerConnectionEmitter, PeerConnectionEvents } from 'shared/emitters/peer-connection-emitter';
import { mediaDevicesEmitter, MediaDevicesEvents } from 'shared/emitters/media-devices-emitter';
import { signalSocketEmitter } from 'shared/emitters/socket-emitter';
import { MeetPageControlPanel, MeetPageMembersContainer, MeetPageVideo, StyledMeetPage } from './styled';
import MeetVideoWindow from 'components/meet/meet-video-window';
import MeetControlPanel from 'components/meet/meet-control-panel';
import { useAppSelector } from 'shared/hooks/app-selector.hook';

interface Members {
  [id: string]: {
    pc?: PeerConnectionEmitter;
    src?: MediaStream;
    user?: User;
  };
}

const defaultMediaStreamConstraints = { video: true, audio: true };

// TODO: add signals for user muting audio/video tracks, add typization for socket emitter

const MeetPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useAppSelector((state) => state.userReducer);

  const [localId, setLocalId] = useState('');
  const [localSrc, setLocalSrc] = useState<MediaStream>();
  const [members, setMembers] = useState<Members>({});
  const [config, setConfig] = useState<MediaStreamConstraints>(defaultMediaStreamConstraints);

  const startCall = (isCaller: boolean, remoteId: string, remoteUser?: User) => {
    const peerConnectionEmitter = new PeerConnectionEmitter(
      remoteId,
      mediaDevicesEmitter,
      signalSocketEmitter.clientSocket!,
    );

    setMembers((prevMembers: Members) => {
      return {
        ...prevMembers,
        [remoteId]: { pc: peerConnectionEmitter, user: remoteUser },
      };
    });

    peerConnectionEmitter
      .subscribe(PeerConnectionEvents.LOCAL_STREAM, (stream) => {
        setLocalSrc(stream);
      })
      .subscribe(PeerConnectionEvents.REMOTE_STREAM, (stream) => {
        setMembers((prevMembers: Members) => {
          return { ...prevMembers, [remoteId]: { ...prevMembers[remoteId], src: stream } };
        });
      })
      .start(isCaller, config, user || undefined);

    // TODO: move to useEffect with delegation
    signalSocketEmitter
      .subscribe(RTCSignalingClientEvents.CALL, (data) => {
        if (data.from !== remoteId) return;
        if (data.sdp) {
          peerConnectionEmitter.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') {
            peerConnectionEmitter.createAnswer();
          }
        } else {
          peerConnectionEmitter.addIceCandidate(data.candidate);
        }
      })
      .subscribe(RTCSignalingClientEvents.END, ({ from }) => finishCall(false, from));
  };

  const endHandler = ({ from }: any) => finishCall(false, from);

  const finishCall = (isCaller: boolean, from?: string) => {
    if (!members.length) return;

    if (isCaller) {
      for (const memberId in members) {
        if (members[memberId].pc) {
          members[memberId].pc?.stop(isCaller);
        }
      }
      setMembers({});
      setConfig({});
      setLocalSrc(undefined);
      navigate(routes.home);
    } else {
      if (!from) return;

      const caller = members[from];

      if (!caller) return;

      caller.src = undefined;

      if (caller.pc) {
        caller.pc.stop(false);
        caller.pc = undefined;
      }
      setMembers((prevMembers) => {
        const withoutMember = prevMembers;
        delete withoutMember[from];
        return { ...withoutMember };
      });
    }
  };

  const requestHandler = ({ from, user }: any) => {
    startCall(false, from, user);
  };

  const newMemberHandler = ({ from, user }: any) => {
    startCall(true, from, user);
  };

  const configHandler = (newConfig: MediaStreamConstraints) => {
    setConfig(newConfig);
  };

  useEffect(() => {
    signalSocketEmitter
      .subscribe(RTCSignalingClientEvents.INITIALIZATION, ({ id }) => {
        setLocalId(id);
      })
      .emit(RTCSignalingServerEvents.INITIALIZATION); // check if this nessecery
  }, []);

  useEffect(() => {
    signalSocketEmitter
      .subscribe(RTCSignalingClientEvents.REQUEST, requestHandler)
      .subscribe(RTCSignalingClientEvents.NEW_MEMBER, newMemberHandler)
      .subscribe(RTCSignalingClientEvents.END, endHandler);

    return () => {
      signalSocketEmitter
        .unsubscribe(RTCSignalingClientEvents.REQUEST, requestHandler)
        .unsubscribe(RTCSignalingClientEvents.NEW_MEMBER, newMemberHandler)
        .unsubscribe(RTCSignalingClientEvents.END, endHandler);
    };
  }, []);

  useEffect(() => {
    signalSocketEmitter.emit(RTCSignalingServerEvents.JOIN_ROOM, { joinToken: id, user: user });
  }, [id]);

  useEffect(() => {
    mediaDevicesEmitter
      .subscribe(MediaDevicesEvents.STREAM, (stream) => {
        setLocalSrc(stream);
      })
      .start(config);
    return () => {
      mediaDevicesEmitter.stop();
    };
  }, []);

  return (
    <StyledMeetPage>
      <MeetPageMembersContainer>
        {localSrc ? (
          <MeetPageVideo scale={Object.keys(members).length + 1}>
            <MeetVideoWindow src={localSrc} muted user={user} />
          </MeetPageVideo>
        ) : (
          <></>
        )}
        {Object.keys(members)
          .filter((m) => members[m].src)
          .map((memberId) => (
            <MeetPageVideo scale={Object.keys(members).length + 1} key={memberId}>
              <MeetVideoWindow src={members[memberId].src!} user={members[memberId].user || null} />
            </MeetPageVideo>
          ))}
      </MeetPageMembersContainer>
      <MeetPageControlPanel>
        <MeetControlPanel
          mediaDevicesEmitter={mediaDevicesEmitter}
          config={config}
          setConfig={configHandler}
          finishCall={() => finishCall(true)}
        />
      </MeetPageControlPanel>
    </StyledMeetPage>
  );
};

MeetPage.displayName = 'MeetPage';

export default MeetPage;
