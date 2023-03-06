import styled from 'styled-components';
export const FileMessageContainer = styled.div`
  display: flex;
  padding: 7px;
  align-items: center;
  margin-top: 5px;
  font-size: 16px;
  width: fit-content;
  border-radius: 5px;
  box-shadow: 1px 1px 6px 0px rgba(34, 60, 80, 0.2);
  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
    cursor: pointer;
  }
`;

export const ImageContainer = styled.img`
  height: 40px;
  width: 40px;
`;
