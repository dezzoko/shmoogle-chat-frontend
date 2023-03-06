import { FC } from 'react';
import { SpinnerContainer, StyledSpinner } from './styled';

const Spinner: FC = () => {
  return (
    <SpinnerContainer>
      <StyledSpinner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledSpinner>
    </SpinnerContainer>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
