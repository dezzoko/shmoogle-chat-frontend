import { FC, PropsWithChildren, TextareaHTMLAttributes } from 'react';
import { StyledTextArea, StyledTextAreaProps } from './styled';
export interface TextAreaOwnProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  padding?: string;
  margin?: string;
}
type TextAreaProps = TextAreaOwnProps & Omit<TextAreaOwnProps, keyof TextareaHTMLAttributes<any>>;

const TextArea: FC<PropsWithChildren<TextAreaProps>> = ({ children, ...props }) => {
  return <StyledTextArea {...props}>{children}</StyledTextArea>;
};
export default TextArea;
