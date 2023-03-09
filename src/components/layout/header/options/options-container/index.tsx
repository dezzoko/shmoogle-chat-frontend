import { FC, PropsWithChildren } from 'react';

import { StyledOptionsContainer } from './styled';

const OptionsContainer: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;

  return <StyledOptionsContainer>{children}</StyledOptionsContainer>;
};

OptionsContainer.displayName = 'OptionsContainer';

export default OptionsContainer;
