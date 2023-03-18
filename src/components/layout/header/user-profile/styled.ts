import styled from 'styled-components';

export const StyledUserContainer = styled.div`
  position: absolute;
  top: 3.5em;
  right: -2em;
  padding: 10px;
  border-radius: 15px;
  background: ${({ theme }) => theme.block.background};
  box-shadow: 0px 0px 0px 5px #f3f6fc;
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const UserCredits = styled.div`
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input<{ isInvalidUserName: boolean }>`
  border: ${(props) => (props.isInvalidUserName ? 'solid red' : 'solid black')};
  width: 10em;
  border-radius: 5px;
  &:focus {
    outline: none;
    box-shadow: ${(props) => (props.isInvalidUserName ? '1px 1px 2px 0 red' : '1px 1px 2px 0 black')};
  }
`;
