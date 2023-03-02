import Avatar from 'components/avatar';
import { User } from 'core/entities/user.entity';
import { FC, useEffect, useRef, VideoHTMLAttributes } from 'react';
import { MeetVideoDisabledVideoScreen, MeetVideoLabel, StyledMeetVideo } from './styled';

interface MeetVideoWindowOwnProps {
  src: MediaStream;
  user: User | null;
}

type MeetVideoWindowProps = MeetVideoWindowOwnProps & Omit<VideoHTMLAttributes<any>, keyof MeetVideoWindowOwnProps>;

const MeetVideoWindow: FC<MeetVideoWindowProps> = (props: MeetVideoWindowProps) => {
  const { src, user } = props;

  const video = useRef<HTMLVideoElement>(null);
  const videoSize = useRef<VideoSize>();

  useEffect(() => {
    if (video.current) {
      const { width, height } = video.current.getBoundingClientRect();
      videoSize.current = { width, height };
    }
  }, [video.current]);

  useEffect(() => {
    if (video.current && src) {
      video.current.srcObject = src;

    }
  }, [src, video.current]);

  return (
    <StyledMeetVideo>
      <video ref={video} autoPlay />
      {user && (
        <>
          <MeetVideoLabel>{user?.login}</MeetVideoLabel>
          {!src.getVideoTracks()[0].enabled && (
            <MeetVideoDisabledVideoScreen>
              <Avatar src={user.avatarUrl} label={user.username[0]} size="200px" />
            </MeetVideoDisabledVideoScreen>
          )}
        </>
      )}
    </StyledMeetVideo>
  );
};

MeetVideoWindow.displayName = 'MeetVideoWindow';

export default MeetVideoWindow;

interface VideoSize {
  width: number;
  height: number;
}
