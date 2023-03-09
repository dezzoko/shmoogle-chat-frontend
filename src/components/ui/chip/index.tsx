import { FC, MouseEvent } from 'react';

import { ChipLabel, StyledChip } from './style';
import { Avatar, RoundButton } from 'components/ui';
import CrossSvg from 'components/svg/cross-svg';

interface ChipProps {
  name?: string;
  imageSrc?: string;
  onButtonClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

// TODO: make passing one of the props necessary
const Chip: FC<ChipProps> = (props: ChipProps) => {
  const { name, imageSrc, onButtonClick } = props;

  return (
    <StyledChip>
      {name && !imageSrc ? <Avatar label={name[0]} size="20px" /> : <></>}
      {!name && imageSrc ? <Avatar src={imageSrc} label="" size="20px" /> : <></>}
      {name ? <ChipLabel>{name}</ChipLabel> : <></>}
      <RoundButton size="16px" onClick={onButtonClick}>
        <CrossSvg />
      </RoundButton>
    </StyledChip>
  );
};

Chip.displayName = 'Chip';

export default Chip;
