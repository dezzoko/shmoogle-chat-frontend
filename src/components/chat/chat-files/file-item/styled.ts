import styled from 'styled-components';

interface FilesItemDivProps {
  type?: string;
}
export const FilesItemDiv = styled.div<FilesItemDivProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  padding-right: 400px;
  color: ${({ theme }) => theme.text.primaryColor};
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  box-shadow: inset 0px -2px 0 rgb(100 121 143 / 12%);

  div:nth-child(1) {
    flex: 1 1 450px;
  }
  div:nth-child(2) {
    flex: 1 1 250px;
  }
  div:nth-child(3) {
    flex: 1 1 400px;
  }
  div:nth-child(4) {
    flex: 0 0 85px;
  }

  &:hover {
    background-color: ${(props) => props.type === 'link' && 'rgba(24, 90, 188, 0.1)'};
  }
`;
