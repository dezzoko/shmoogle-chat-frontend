import styled from "styled-components";

export const StyledChoiceContainer = styled.div` 
  display: flex;
  justify-content: space-between;
`;

export enum ButtonVariant {
  outlined = 'outlined',
  primary = 'primary',
}

interface ButtonProps {
  variant: ButtonVariant;
}
export const StyledButton = styled.button<ButtonProps>`
  position: relative;
  box-sizing: inherit;
  border: none;
  background: ${({ variant }) => (variant === ButtonVariant.primary ? '#4282d5' : 'transparent')};
  margin-top: 20px;
  padding: 10px 10px;
  margin-left:-10px;
  min-width: 96px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ variant }) => (variant === ButtonVariant.primary ? 'white' : '#4282d5')};
  &:hover {
    background: ${({ variant }) => (variant === ButtonVariant.primary ? 'rgb(12, 0, 89)' : 'rgba(66, 130, 213, 0.1)')};
    cursor: pointer;
  }
`;
