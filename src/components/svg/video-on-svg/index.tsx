import { FC, memo } from 'react';

import { SvgProps } from 'core/types/svg-props';
import { StyledSvg } from '../styled';

const VideoOnSvg: FC<SvgProps> = memo((props: SvgProps) => {
  const { fill, size } = props;
  return (
    <StyledSvg fill={fill} width={size || '24'} height={size || '24'} viewBox="0 0 24 24" focusable="false">
      <path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z"></path>
    </StyledSvg>
  );
});

VideoOnSvg.displayName = 'VideoOnSvg';

export default VideoOnSvg;
