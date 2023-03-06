import { ClientEvents } from 'core/constants/api';
import { FC, useEffect, useRef, useState } from 'react';
import { chatSocketEmitter } from 'shared/emitters/socket-emitter';
import { StyledErrorNotifier } from './style';

const ErrorNotifier: FC = () => {
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const errorTimeoutRef = useRef(0);

  const socketErrorHandler = (error: string) => {
    setError(error);
    setShowError(true);

    if (errorTimeoutRef.current) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => {
      setShowError(false);
    }, 2000);
  };

  useEffect(() => {
    chatSocketEmitter.subscribe(ClientEvents.ERROR, socketErrorHandler);

    return () => {
      chatSocketEmitter.unsubscribe(ClientEvents.ERROR, socketErrorHandler);
    };
  }, []);

  return <StyledErrorNotifier visible={showError}>{error}</StyledErrorNotifier>;
};

ErrorNotifier.displayName = 'ErrorNotifier';

export default ErrorNotifier;
