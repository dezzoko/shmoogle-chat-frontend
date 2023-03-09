import { FC, memo } from 'react';

import { AvatarLabel, AvatarWrapper } from './styled';

interface AvatarProps {
  label: string;
  src?: string;
  background?: string;
  size?: string;
  variant?: AvatarVariants;
}

export enum AvatarVariants {
  round = '50%',
  square = '5px',
}

const Avatar: FC<AvatarProps> = memo((props: AvatarProps) => {
  const { label, src, background, size, variant = AvatarVariants.round } = props;
  let fontSize = '';
  let lineHeight = '';
  if (size) {
    fontSize = Number.parseInt(size) / 2 + 'px';
    lineHeight = Number.parseInt(size) + 'px';
  }

  return (
    <AvatarWrapper size={size} background={background} borderRadius={variant}>
      {src ? (
        <img src={src} />
      ) : (
        <AvatarLabel fontSize={fontSize} lineHeight={lineHeight}>
          {label}
        </AvatarLabel>
      )}
    </AvatarWrapper>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
