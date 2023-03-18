import styled from 'styled-components';
import { TextAreaOwnProps } from '.';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StyledTextAreaProps extends TextAreaOwnProps {}

export const StyledTextArea = styled.div<StyledTextAreaProps>`
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '14px'};
  color: ${({ theme, ...props }) => props.color || theme.text.primaryColor};
  padding: ${(props) => props.padding || '0px'};
  margin: ${(props) => props.margin || '0px'};
  text-align: ${(props) => props.textAlign || 'left'};
`;
