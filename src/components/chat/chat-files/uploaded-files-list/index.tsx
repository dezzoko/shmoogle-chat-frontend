import { FC } from 'react';
import { FileItem, ImageItem, MessageFeatures } from './styled';

interface UploadedFilesListProps {
  files: File[];
  imgURLs: string[];
}

const UploadedFilesList: FC<UploadedFilesListProps> = (props: UploadedFilesListProps) => {
  const { files, imgURLs } = props;

  return (
    <MessageFeatures>
      {files.map((f, i) => {
        if (f.type !== 'image/png') {
          return <FileItem key={i}> {f.name}</FileItem>;
        }
      })}

      {imgURLs.map((url, i) => (
        <ImageItem key={i}>
          <img src={url} />
        </ImageItem>
      ))}
    </MessageFeatures>
  );
};

export default UploadedFilesList;
