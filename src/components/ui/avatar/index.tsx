import { FC, ForwardedRef, forwardRef, memo, useRef } from 'react';

import { AvatarLabel, AvatarWrapper } from './styled';

interface AvatarProps {
  label: string;
  src?: string;
  background?: string;
  size?: string;
  variant?: AvatarVariants;
  onClick?: () => any;
  onDrop?: (e: any) => any;
  onDragEnter?: (e: any) => any;
  onDragOver?: (e: any) => any;
  ref?: ForwardedRef<HTMLDivElement>;
}

export enum AvatarVariants {
  round = '50%',
  square = '5px',
}

const Avatar: FC<AvatarProps> = forwardRef<HTMLDivElement, AvatarProps>((props: AvatarProps, ref) => {
  const {
    label,
    src,
    background,
    size,
    variant = AvatarVariants.round,
    onClick,
    onDragEnter,
    onDragOver,
    onDrop,
  } = props;
  let fontSize = '';
  let lineHeight = '';
  if (size) {
    fontSize = Number.parseInt(size) / 2 + 'px';
    lineHeight = Number.parseInt(size) + 'px';
  }

  return (
    <AvatarWrapper
      ref={ref}
      onDrop={onDrop}
      onDragStart={onDragEnter}
      onDragOver={onDragOver}
      size={size}
      background={background}
      borderRadius={variant}
      onClick={onClick}
    >
      {src ? (
        <img key={src} src={src} />
      ) : (
        <AvatarLabel fontSize={fontSize} lineHeight={lineHeight}>
          {label}
        </AvatarLabel>
      )}
    </AvatarWrapper>
  );
});
Avatar.displayName = 'Avatar';

export default memo(Avatar);
