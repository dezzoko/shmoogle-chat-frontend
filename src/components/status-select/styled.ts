import styled from 'styled-components';

export const StyledStatusSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.button.outlineColor};
  height: 36px;
  margin-bottom: 4px;
  margin-right: 12px;
  padding: 0 16px;

  &:hover {
    background-color: ${({ theme }) => theme.button.hoverColor};
  }
`;

export const StatusSelectButton = styled.div`
  margin-left: -5px;
  margin-top: 2px;
`;

export const OnlineIcon = styled.div`
  border-radius: 50%;
  background: green;
  width: 12px;
  height: 12px;
`;
