import styled from 'styled-components';

export const MessageContainer = styled.div`
  width: 100%;
`;

export const MessageDate = styled.div`
  width: 100%;
  text-align: center;
  color: grey;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const MessageListItemContainer = styled.div`
  &:hover {
    background: ${({ theme }) => theme.hoverColor};
  }
  margin: 5px 0;
`;
