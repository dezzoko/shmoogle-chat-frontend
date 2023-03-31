import { FC, memo } from 'react';

import { SvgProps } from 'core/types/svg-props';
import { StyledSvg } from '../styled';

const ChoosenStatusSvg: FC<SvgProps> = memo((props: SvgProps) => {
  const { fill } = props;
  return (
    <StyledSvg width="20" height="20" viewBox="0 0 24 24" fill={fill}>
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
    </StyledSvg>
  );
});

ChoosenStatusSvg.displayName = 'AddUserSvg';

export default ChoosenStatusSvg;
