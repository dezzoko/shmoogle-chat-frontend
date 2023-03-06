import styled from 'styled-components';

export const ChatSearchResultAvatarContainer = styled.div`
  margin: 0 12px;
`;

export const StyledChatSearchResult = styled.div`
  display: flex;
  align-items: center;
`;

export const ChatSearchResultInfo = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ChatSearchResultLogin = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.secondaryColor};
`;
