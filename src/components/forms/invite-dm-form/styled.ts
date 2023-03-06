import styled from 'styled-components';

export const StyledInviteDmForm = styled.div`
  background: ${({ theme }) => theme.block.background};
  border-radius: 10px;
  padding: 20px;
  overflow: visible;
`;

export const InviteDmFormTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-weight: 400;
`;

export const InviteDmFormInfo = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

export const InviteDmFormInputContainer = styled.div`
  height: 40px;
`;

export const InviteDmFormText = styled.p`
  color: ${({ theme }) => theme.text.secondaryColor};
`;

export const InviteDmFormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 30px;
  padding-top: 20px;
  gap: 15px;
  box-shadow: inset 0 2px 0 ${({ theme }) => theme.block.shadowColor};
`;
