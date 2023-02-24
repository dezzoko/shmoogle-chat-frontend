import { FC } from 'react';

interface CallModalProps {
  callFrom: string;
  startCall: (isCaller: boolean, remoteId: string, config?: MediaStreamConstraints) => void;
  rejectCall: () => void;
}

const CallModal: FC<CallModalProps> = (props: CallModalProps) => {
  const { callFrom, startCall, rejectCall } = props;

  const acceptCallHandler = () => {
    startCall(false, callFrom);
  };

  return (
    <div>
      <div>
        <p>{callFrom} is calling</p>
        <button onClick={acceptCallHandler}>Accept</button>
        <button onClick={rejectCall}>Reject</button>
      </div>
    </div>
  );
};

CallModal.displayName = 'CallModal';

export default CallModal;
