import { FC, useEffect, useRef, useState } from 'react';
import { MediaDevicesEmitter, MediaStreamType } from 'shared/emitters/media-devices-emitter';

interface CallWindowProps {
  remoteSrc: MediaStream;
  localSrc: MediaStream;
  mediaDevice: MediaDevicesEmitter;
  finishCall: (isCaller: boolean) => void;
  config?: MediaStreamConstraints;
}

const CallWindow: FC<CallWindowProps> = (props: CallWindowProps) => {
  const { remoteSrc, localSrc, mediaDevice, finishCall, config } = props;

  const remoteVideo = useRef<HTMLVideoElement>(null);
  const localVideo = useRef<HTMLVideoElement>(null);
  const localVideoSize = useRef<VideoSize>();

  const [video, setVideo] = useState((config?.video as boolean) ?? true);
  const [audio, setAudio] = useState((config?.audio as boolean) ?? true);

  const toggleMediaDevice = (deviceType: MediaStreamType, value: boolean) => {
    switch (deviceType) {
      case 'Video':
        setVideo(value);
        mediaDevice.toggle(deviceType, value);
        break;
      case 'Audio':
        setAudio(value);
        mediaDevice.toggle(deviceType, value);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (localVideo.current) {
      const { width, height } = localVideo.current.getBoundingClientRect();
      localVideoSize.current = { width, height };
    }
  }, [localVideo.current]);

  useEffect(() => {
    if (remoteVideo.current && remoteSrc) {
      remoteVideo.current.srcObject = remoteSrc;
    }

    if (localVideo.current && localSrc) {
      localVideo.current.srcObject = localSrc;
    }
  }, [remoteSrc, localSrc, remoteVideo.current, localVideo.current]);

  useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle('Video', video);
      mediaDevice.toggle('Audio', audio);
    }
  }, [mediaDevice]);

  return (
    <div>
      <div>
        <video ref={remoteVideo} autoPlay />
      </div>
      <div>
        <video ref={localVideo} autoPlay muted />
      </div>
      <div>
        <button onClick={() => toggleMediaDevice('Video', !video)}>Video</button>
        <button onClick={() => toggleMediaDevice('Audio', !audio)}>Audio</button>
      </div>
      <button onClick={() => finishCall(true)}>Hang up</button>
    </div>
  );
};

CallWindow.displayName = 'CallWindow';

export default CallWindow;

interface VideoSize {
  width: number;
  height: number;
}
