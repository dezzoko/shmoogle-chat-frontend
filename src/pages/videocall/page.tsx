import { FC, useEffect, useState } from 'react';

import { RTCSignalingClientEvents, RTCSignalingServerEvents } from 'core/constants/api';
import { signalingServerSocket } from 'core/constants/signaling-server-socket';
import { PeerConnectionEmitter, PeerConnectionEvents } from 'shared/emitters/peer-connection-emitter';
import { mediaDevicesEmitter } from 'shared/emitters/media-devices-emitter';
import VideocallControlWindow from '.';
import Modal from 'components/ui/modal';
import CallModal from './CallModal';
import CallWindow from './CallWindow';

const VideocallPage: FC = () => {
  const [callFrom, setCallFrom] = useState('');
  const [calling, setCalling] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [localSrc, setLocalSrc] = useState<MediaStream>();
  const [remoteSrc, setRemoteSrc] = useState<MediaStream>();

  const [pc, setPc] = useState<PeerConnectionEmitter>();
  const [config, setConfig] = useState<MediaStreamConstraints>();

  const requestHandler = ({ from }: any) => {
    console.log('MEET::: got call from id ', from, ' (setting callFrom, showModal true)');
    setCallFrom(from);
    setShowModal(true);
  };

  const startCall = (isCaller: boolean, remoteId: string, config?: MediaStreamConstraints) => {
    setShowModal(false);
    setCalling(true);
    setConfig(config || { video: true, audio: true });

    const peerConnectionEmitter = new PeerConnectionEmitter(remoteId, mediaDevicesEmitter, signalingServerSocket);

    peerConnectionEmitter
      .subscribe(PeerConnectionEvents.LOCAL_STREAM, (stream: MediaStream) => {
        console.log('MEET::: local stream captured');
        setLocalSrc(stream);
      })
      .subscribe(PeerConnectionEvents.REMOTE_STREAM, (stream) => {
        console.log('MEET::: remote stream captured (setting calling false)');
        setRemoteSrc(stream);
        setCalling(false);
      })
      .start(isCaller, config);

    setPc(peerConnectionEmitter);
  };

  const rejectCall = () => {
    signalingServerSocket.emit(RTCSignalingServerEvents.END, { to: callFrom });
  };

  const finishCall = (isCaller: boolean) => {
    console.log('MEET::: finishing call isCaller ', isCaller);
    if (!pc) return;
    pc.stop(isCaller);

    setPc(undefined);
    setConfig(undefined);
    setCalling(false);
    setShowModal(false);
    setLocalSrc(undefined);
    setRemoteSrc(undefined);
  };

  useEffect(() => {
    signalingServerSocket.on(RTCSignalingClientEvents.REQUEST, requestHandler);
    return () => {
      signalingServerSocket.off(RTCSignalingClientEvents.REQUEST, requestHandler);
    };
  }, []);

  //TODO: add cleanup funcitons
  useEffect(() => {
    if (!pc) return;

    signalingServerSocket
      .on(RTCSignalingClientEvents.CALL, (data) => {
        console.log('MEET::: call with data');
        if (data.sdp) {
          console.log('SDP', data.sdp);
          pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') {
            pc.createAnswer();
          }
        } else {
          console.log('CANDIDATE', data.candidate);
          pc.addIceCandidate(data.candidate);
        }
      })
      .on(RTCSignalingClientEvents.END, () => finishCall(false));
  }, [pc]);

  return (
    <div>
      <VideocallControlWindow startCall={startCall} />
      {calling && <div>Calling...</div>}

      <Modal isHidden={!showModal} setHidden={(value: boolean) => setShowModal(!value)}>
        <CallModal
          callFrom={callFrom}
          startCall={startCall}
          rejectCall={() => {
            rejectCall();
            setShowModal(false);
          }}
        />
      </Modal>

      {remoteSrc && localSrc && pc ? (
        <CallWindow
          localSrc={localSrc}
          remoteSrc={remoteSrc}
          config={config}
          mediaDevice={pc?.mediaDevicesEmitter}
          finishCall={finishCall}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

VideocallPage.displayName = 'VideocallPage';

export default VideocallPage;
