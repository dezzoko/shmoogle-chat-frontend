import styled from 'styled-components';
export interface StyledTextAreaProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  padding?: string;
  margin?: string;
  textAlign?: string;
  input?: boolean;
}

export const StyledTextArea = styled.div<StyledTextAreaProps>`
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '14px'};
  color: ${({ theme, ...props }) => props.color || theme.text.primaryColor};
  padding: ${(props) => props.padding || '0px'};
  margin: ${(props) => props.margin || '0px'};
  text-align: ${(props) => props.textAlign || 'left'};
`;
