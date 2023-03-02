import styled from 'styled-components';

export const StyledChatPageOptionButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  gap: 10px;
  margin: 14px;
  padding: 5px;
  color: ${({ theme }) => theme.button.textColor};
  font-size: 0.875rem;
  background: none;
  &:hover {
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.05);
  }
  & svg {
    fill: ${({ theme }) => theme.button.textColor};
  }
`;
