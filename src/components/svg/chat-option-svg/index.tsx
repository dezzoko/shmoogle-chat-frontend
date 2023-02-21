import { FC, memo } from 'react';

import { SvgProps } from 'core/types/svg-props';
import { StyledSvg } from '../styled';

const ChatOptionSvg: FC<SvgProps> = memo((props: SvgProps) => {
  const { size, fill } = props;

  return (
    <StyledSvg height={size || '24'} viewBox="0 0 24 24" width={size || '24'} fill={fill}>
      <path d="M0 0h24v24H0V0z" fill="none"></path>
      <path d="M13 10h-2v3H8v2h3v3h2v-3h3v-2h-3zm1-8H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
    </StyledSvg>
  );
});

ChatOptionSvg.displayName = 'ChatOptionSvg';

export default ChatOptionSvg;
