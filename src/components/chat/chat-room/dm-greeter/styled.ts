import styled from 'styled-components';

export const StyledDmGreeter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1 1 auto;
  margin: 20px 0;
`;

export const DmGreeterUsername = styled.label`
  font-size: 1.2rem;
`;

export const DmGreeterLogin = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text.secondaryColor};
`;
