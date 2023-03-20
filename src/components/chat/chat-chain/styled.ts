import styled from 'styled-components';

export const StyledChatChain = styled.div`
  background: ${({ theme }) => theme.block.background};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: inset 1px 0 0 ${({ theme }) => theme.block.shadowColor};
  padding: 10px 15px;
`;

export const ChatChainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: inset 0 -2px 0 ${({ theme }) => theme.block.shadowColor};
  margin: 0 -15px;
  padding: 0 15px;
  height: 72px;
`;

export const ChatChainContent = styled.div`
  overflow-y: auto;
  gap: 5px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 5%;
`;

export const ChatChainResponses = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > hr {
    flex: 2;
    height: 0;
  }

  & > span {
    flex: 1;
    text-align: center;
  }
`;
