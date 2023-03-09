import styled from 'styled-components';

export const StyledChatGroupGreeter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1 1 auto;
  margin: 20px 0;
`;

export const ChatGroupGreeterDate = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.secondaryColor};
`;

export const ChatGroupGreeterHistoryInfo = styled.label`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.text.secondaryColor};
  font-size: 0.8rem;
`;

export const ChatGroupGreeterHistoryWho = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
`;

export const ChatGroupAction = styled.div`
  display: inline-block;
  margin: 8px 8px;
`;

export const ChatGroupActionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
