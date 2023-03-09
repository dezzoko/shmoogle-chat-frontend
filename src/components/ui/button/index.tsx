import { FC, ReactNode, memo } from 'react';

import { IconWrapper, ButtonName, StyledButton } from './styled';

interface ButtonProps {
  name: string;
  children?: ReactNode;
  color?: string;
  outlined?: boolean;
  textJustifyContentProperty?: string;
  disabled?: boolean;
  isHoverHighlighted?: boolean;
  gap?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const { name, children, onClick, color, textJustifyContentProperty, ...other } = props;

  return (
    <StyledButton onClick={onClick} {...other}>
      {children ? <IconWrapper color={color}>{children}</IconWrapper> : <></>}

      <ButtonName color={color} justifyContent={textJustifyContentProperty}>
        {name}
      </ButtonName>
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;
