import { FC, useState } from 'react';

import { MediaDevicesEmitter, MediaStreamType } from 'shared/emitters/media-devices-emitter';
import { MeetControlPanelEndCallImage } from './style';
import MicroOffSvg from 'components/svg/micro-off-svg';
import MicroOnSvg from 'components/svg/micro-on-svg';
import VideoOffSvg from 'components/svg/video-off-svg';
import VideoOnSvg from 'components/svg/video-on-svg';
import Tooltip from 'components/tooltip';
import RoundButton from 'components/ui/round-button';
import hangupImage from 'assets/end-call.png';

interface MeetControlPanelProps {
  mediaDevicesEmitter: MediaDevicesEmitter;
  config: MediaStreamConstraints;
  setConfig: (value: MediaStreamConstraints) => void;
  finishCall: () => void;
}

const MeetControlPanel: FC<MeetControlPanelProps> = (props: MeetControlPanelProps) => {
  const { mediaDevicesEmitter, config, setConfig, finishCall } = props;

  const [video, setVideo] = useState((config?.video as boolean) ?? true);
  const [audio, setAudio] = useState((config?.audio as boolean) ?? true);

  const toggleMediaDevice = (deviceType: MediaStreamType, value: boolean) => {
    switch (deviceType) {
      case 'Video':
        setVideo(value);
        setConfig({ ...config, video: value });
        mediaDevicesEmitter.toggle(deviceType, value);
        break;
      case 'Audio':
        setAudio(value);
        setConfig({ ...config, audio: value });
        mediaDevicesEmitter.toggle(deviceType, value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Tooltip text={audio ? 'Выключить микрофон' : 'Включить микрофон'}>
        <RoundButton
          size="40x"
          padding="8px"
          background={audio ? '' : 'red'}
          hoverBackground={audio ? '' : 'red'}
          onClick={() => toggleMediaDevice('Audio', !audio)}
        >
          {audio ? <MicroOnSvg size={40} fill={'#fff'} /> : <MicroOffSvg size={40} fill={'#fff'} />}
        </RoundButton>
      </Tooltip>
      <Tooltip text={video ? 'Выключить камеру' : 'Включить камеру'}>
        <RoundButton
          size="40px"
          padding="8px"
          background={video ? '' : 'red'}
          hoverBackground={video ? '' : 'red'}
          onClick={() => toggleMediaDevice('Video', !video)}
        >
          {video ? <VideoOnSvg size={40} fill={'#fff'} /> : <VideoOffSvg size={40} fill={'#fff'} />}
        </RoundButton>
      </Tooltip>
      <Tooltip text="Hang up">
        <RoundButton onClick={() => finishCall()} size="40px" padding="8px">
          <MeetControlPanelEndCallImage>
            <img src={hangupImage} />
          </MeetControlPanelEndCallImage>
        </RoundButton>
      </Tooltip>
    </>
  );
};

MeetControlPanel.displayName = 'MeetControlPanel';

export default MeetControlPanel;
