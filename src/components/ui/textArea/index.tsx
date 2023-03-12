import { FC, PropsWithChildren } from 'react';
import { StyledTextArea, StyledTextAreaProps } from './styled';
interface TextAreaProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  padding?: string;
  margin?: string;
}

const TextArea: FC<PropsWithChildren<TextAreaProps>> = ({ children, ...props }) => {
  return <StyledTextArea {...props}>{children}</StyledTextArea>;
};
export default TextArea;
