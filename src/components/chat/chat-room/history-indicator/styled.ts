import styled from 'styled-components';

export const HistoryInfo = styled.label`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.text.secondaryColor};
  font-size: 0.8rem;
`;

export const HistoryWho = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text.primaryColor};
  font-weight: 600;
`;
