import styled from 'styled-components';

export const UserSearchResultAvatarContainer = styled.div`
  margin: 0 12px;
`;

export const StyledUserSearchResult = styled.div`
  display: flex;
  align-items: center;
`;

export const UserSearchResultInfo = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const UserSearchResultLogin = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.secondaryColor};
`;
