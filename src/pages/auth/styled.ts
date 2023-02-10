import styled from 'styled-components';

export const LoginWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -225px;
  display: flex;
  flex-flow: column nowrap;
  width: 450px;
  height: 500px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #dadce0;
`;

export const ImageContainer = styled.div`
  width: 75px;
  height: 75px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
  }
`;
interface StyledSpanProps {
  fontSize: number;
  fontWeight: number;
  marginTop?: string;
  textAlign?: string;
}




export const StyledSpanContainer = styled.div<StyledSpanProps>`
  text-align: left;
  margin-top: ${(props) => props.marginTop || '15px'};
`;

