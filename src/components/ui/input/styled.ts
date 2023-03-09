import styled from 'styled-components';

export const InputContainer = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 5px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 -1px 0 ${({ theme }) => theme.block.shadowColor};
  background: ${({ theme }) => theme.textarea.background};

  &::before {
    content: '';
    position: absolute;
    width: 0;
    background: blue;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 2px;
    background: ${({ theme }) => theme.button.textColor};
    transition: width 0s;
  }

  &:focus-within::before {
    width: 100%;
    transition: width 0.15s ease;
  }
`;

export const StyledInput = styled.input.attrs({
  type: 'text',
})`
  flex: 1;
  flex-basis: 30%;
  outline: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text.primaryColor};
  &::placeholder {
    color: ${({ theme }) => theme.textarea.placeholderColor};
  }
  &:focus {
    outline: none;
    border: none;
  }
`;

export const InputLengthIndicator = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textarea.placeholderColor};
  user-select: none;
`;
