import styled from 'styled-components';

export const StyledSidebar = styled.div<StyledSidebarProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: ${(props) => props.position || 'fixed'};
  box-shadow: inset -1px 0 0 ${({ theme }) => theme.block.shadowColor};
  width: ${(props) => props.width || '72px'};
  height: -webkit-fill-available;
  height: 100%;
  background: ${({ theme }) => theme.block.background};
  transition: width 0.1s ease;
  z-index: 1;
`;

export const ChatListContainer = styled.div<ChatListContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: ${(props) => props.flex};
`;

export const ChatListItemContainer = styled.div`
  border-radius: 0 30px 30px 0;
  margin: 0 42px 0 4px;
  padding: 2px 4px 2px 42px;
  background: ${({ theme }) => theme.activeChatListItemBackgroundColor};
  &:hover {
    cursor: pointer;
  }
`;

interface ChatListContainerProps {
  flex?: string;
}

interface StyledSidebarProps {
  width?: string;
  position?: string;
}
