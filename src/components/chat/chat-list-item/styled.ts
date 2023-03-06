import styled from 'styled-components';

export const StyledChatListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
`;

export const ChatListItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  overflow: hidden;
  flex: 1;
`;

export const ChatListActions = styled.div`
  display: flex;
  align-items: center;
`;

export const ChatListItemLastMessage = styled.div`
  font-size: 0.5rem;
  white-space: nowrap;
`;

export const ChatListItemName = styled.span`
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
