import { FC, ReactNode, memo } from 'react';

import { IconWrapper, ButtonWithIconName, StyledButtonWithIcon } from './styled';

interface ButtonWithIconProps {
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

const ButtonWithIcon: FC<ButtonWithIconProps> = memo((props: ButtonWithIconProps) => {
  const { name, children, onClick, color, textJustifyContentProperty, ...other } = props;

  return (
    <StyledButtonWithIcon onClick={onClick} {...other}>
      {children ? <IconWrapper color={color}>{children}</IconWrapper> : <></>}

      <ButtonWithIconName color={color} justifyContent={textJustifyContentProperty}>
        {name}
      </ButtonWithIconName>
    </StyledButtonWithIcon>
  );
});

ButtonWithIcon.displayName = 'ButtonWithIcon';

export default ButtonWithIcon;
