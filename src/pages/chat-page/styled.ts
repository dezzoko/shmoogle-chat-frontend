import styled from 'styled-components';

export const StyledChatPage = styled.div`
  flex: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChatChainsListContainer = styled.div`
  flex: 2;
  height: 100%;
`;

export const ChatPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ChatPageBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ChatPageBodyOptions = styled.div`
  padding-left: 32px;
  box-shadow: inset 0px -2px 0 ${({ theme }) => theme.block.shadowColor};
`;

export const ChatPageBodyContent = styled.div`
  flex: 1;
`;

export const ChatPageFlexContainer = styled.div<ChatPageFlexContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  width: ${(props) => props.width};
`;

interface ChatPageFlexContainerProps {
  width?: string;
  alignItems?: string;
  justifyContent?: string;
}
