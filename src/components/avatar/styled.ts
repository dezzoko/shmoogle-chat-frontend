import styled from 'styled-components';

export const AvatarWrapper = styled.div<AvatarWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
  width: ${(props) => props.size || '100%'};
  height: ${(props) => props.size || '100%'};
  border-radius: ${(props) => props.borderRadius};
  background: ${(props) => props.background || 'purple'};
  & img {
    width: ${(props) => props.size || '100%'};
    height: ${(props) => props.size || '100%'};
  }
`;

//margin-top: -3px;
export const AvatarLabel = styled.label<AvatarLabelProps>`
  font-size: ${(props) => props.fontSize || '1rem'};
  user-select: none;
  height: 100%;
  line-height: ${(props) => props.lineHeight || '2rem'};
  &:hover {
    cursor: inherit;
  }
`;

interface AvatarWrapperProps {
  size?: string;
  background?: string;
  borderRadius?: string;
}

interface AvatarLabelProps {
  fontSize?: string;
  lineHeight?: string;
}
