import styled from 'styled-components';

export const StyledButton = styled.div<StyledButtonProps>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gap || '5px'};
  padding: 5px;
  border: 1px solid ${(props) => (props.outlined ? props.theme.button.outlineColor : 'transparent')};
  transition: background 0.1s ease;
  &:hover {
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    background: ${(props) => (props.disabled ? '' : props.isHoverHighlighted ? props.theme.button.hoverColor : '')};
  }
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  & svg {
    fill: ${(props) => props.color || props.theme.button.textColor};
  }
`;

export const ButtonName = styled.div<ButtonNameProps>`
  flex: 1;
  display: flex;
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: center;
  text-align: center;
  user-select: none;
  color: ${(props) => props.color || props.theme.button.textColor};
`;

interface IconWrapperProps {
  color?: string;
}

interface ButtonNameProps {
  color?: string;
  justifyContent?: string;
}

interface StyledButtonProps {
  gap?: string;
  outlined?: boolean;
  disabled?: boolean;
  isHoverHighlighted?: boolean;
}
