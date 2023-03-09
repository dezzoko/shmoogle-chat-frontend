import { FC, ReactNode, AnchorHTMLAttributes, MouseEvent } from 'react';

import { StyledRoundButton, StyledRoundButtonProps } from './styled';

interface RoundButtonProps extends StyledRoundButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
}

const RoundButton: FC<RoundButtonProps> = (props: RoundButtonProps) => {
  const { children, onClick, disabled, ...other } = props;

  const clickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onClick && !disabled) {
      onClick(event);
    }
  };

  return (
    <StyledRoundButton {...other} disabled={disabled} onClick={clickHandler}>
      {children}
    </StyledRoundButton>
  );
};

RoundButton.displayName = 'RoundButton';

export default RoundButton;
