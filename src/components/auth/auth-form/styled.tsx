import styled from 'styled-components';

export const InputForm = styled.form`
  width: 90%;
  margin: 0 auto;
`;

export const Input = styled.input`
  box-sizing: border-box;
  border-radius: 4px;
  color: #202124;
  font-size: 16px;
  width: 100%;
  height: 55px;
  padding-left: 14px;
  border: 0.001px solid rgb(118, 118, 118);
  margin-top: 24px;

  &:focus {
    outline: none;
    border: 2px solid blue;
  }
`;
interface StyledSpanProps {
  fontSize: number;
  fontWeight: number;
  marginTop?: string;
  textAlign?: string;
}

export const StyledSpan = styled.span<StyledSpanProps>`
  color: ${({ color }) => color || '#202124'};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  margin-top: ${({ marginTop }) => marginTop || '16px'};
  text-align: ${({ textAlign }) => textAlign || 'center'};
`;

export const StyledSpanContainer = styled.div<StyledSpanProps>`
  text-align: left;
  margin-top: ${(props) => props.marginTop || '15px'};
`;
