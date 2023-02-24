import { RTCSignalingClientEvents, RTCSignalingServerEvents } from 'core/constants/api';
import { signalingServerSocket } from 'core/constants/signaling-server-socket';
import { ChangeEvent, FC, useEffect, useState } from 'react';

// TODO: authenticate users, meet rooms

interface VideocallControlWindowProps {
  startCall: (isCaller: boolean, remoteId: string, config?: MediaStreamConstraints) => void;
}

const VideocallControlWindow: FC<VideocallControlWindowProps> = (props: VideocallControlWindowProps) => {
  const { startCall } = props;

  const [localId, setLocalId] = useState('');
  const [remoteId, setRemoteId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    signalingServerSocket
      .on(RTCSignalingClientEvents.INITIALIZATION, ({ id }) => {
        console.log('MEET::: local id is ', id);
        setLocalId(id as string);
      })
      .emit(RTCSignalingServerEvents.INITIALIZATION); // check if this nessecery
  }, []);

  const call = (config?: MediaStreamConstraints) => {
    if (!remoteId.trim()) {
      return setError('No remote id was provided');
    }
    startCall(true, remoteId, config);
  };

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setRemoteId(event.target.value);
  };

  return (
    <>
      {error ? (
        <div>Some error occured: {error}</div>
      ) : (
        <div>
          <label>Window</label>
          <label>Your id is {localId}</label>
          <div>
            <label htmlFor="remoteId">Remote id</label>
            <input placeholder="Enter remote id" onChange={inputHandler} />
            <p>{error}</p>
          </div>
          <div>
            <button onClick={() => call()}>Call</button>
          </div>
        </div>
      )}
    </>
  );
};

VideocallControlWindow.displayName = 'VideocallControlWindow';

export default VideocallControlWindow;
