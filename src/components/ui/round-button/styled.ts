import styled from 'styled-components';

export const StyledRoundButton = styled.a<StyledRoundButtonProps>`
  border-radius: 50%;
  width: ${(props) => props.size || '20px'};
  height: ${(props) => props.size || '20px'};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  transition: background 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f6368;
  background: ${(props) => props.background};
  opacity: ${(props) => (props.disabled ? '0.8' : '1')};
  &:hover {
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    background: ${(props) => (props.disabled ? props.background : props.hoverBackground || props.theme.hoverColor)};
  }
`;

export interface StyledRoundButtonProps {
  size?: string;
  padding?: string;
  margin?: string;
  disabled?: boolean;
  background?: string;
  hoverBackground?: string;
}
