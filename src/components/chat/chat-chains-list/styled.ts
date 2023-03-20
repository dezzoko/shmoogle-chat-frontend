import styled from 'styled-components';

export const StyledChatChainsList = styled.div`
  background: ${({ theme }) => theme.block.background};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: inset 1px 0 0 ${({ theme }) => theme.block.shadowColor};
  padding: 10px 15px;
`;

export const ChatChainsListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: inset 0 -2px 0 ${({ theme }) => theme.block.shadowColor};
  margin: 0 -15px;
  padding: 0 15px;
  height: 72px;
`;

export const ChatChainsListContent = styled.div`
  overflow-y: auto;
  gap: 5px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChatChainsListTitle = styled.h3`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.text.primaryColor};
  font-size: 1.5rem;
  font-weight: 300;
`;
