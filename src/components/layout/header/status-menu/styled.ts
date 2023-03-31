import styled from 'styled-components';

export const StatusMenuContainer = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  width: 15em;
`;

export const StyledStatusRadio = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;
export const StatusRadioIcon = styled.div`
  display: flex;
`;

export const StatusRadioLabel = styled.label`
  margin: 5px 0;

  ${StyledStatusRadio}:checked + & {
    background: ${({ theme }) => theme.button.hoverColor};
  }
`;
export const StatusCase = styled.div`
  cursor: pointer;
  padding: 0 15px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.button.hoverColor};
  }
`;
export const StatusCredit = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
