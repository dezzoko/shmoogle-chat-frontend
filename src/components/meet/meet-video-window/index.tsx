import { FC, useEffect, useRef, VideoHTMLAttributes } from 'react';
import { MeetVideoId } from './styled';

interface MeetVideoWindowOwnProps {
  src: MediaStream;
  label?: string;
}

type MeetVideoWindowProps = MeetVideoWindowOwnProps & Omit<VideoHTMLAttributes<any>, keyof MeetVideoWindowOwnProps>;

const MeetVideoWindow: FC<MeetVideoWindowProps> = (props: MeetVideoWindowProps) => {
  const { src, label } = props;

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
    <>
      <MeetVideoId>{label}</MeetVideoId>
      <video ref={video} autoPlay />
    </>
  );
};

MeetVideoWindow.displayName = 'MeetVideoWindow';

export default MeetVideoWindow;

interface VideoSize {
  width: number;
  height: number;
}
