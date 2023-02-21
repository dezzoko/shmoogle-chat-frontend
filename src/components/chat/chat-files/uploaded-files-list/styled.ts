import styled from 'styled-components';

export const MessageFeatures = styled.div`
  max-height: 10em;
  width: fit-content;
  overflow-y: auto;
  margin-top: 10px;
  margin-left: 40px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
export const FileItem = styled.div`
  box-shadow: 1px 1px 6px 0px rgba(34, 60, 80, 0.2);
  margin-bottom: 10px;
`;

export const ImageItem = styled.div`
  img {
    max-width: 30%;
    height: auto;
  }
`;
