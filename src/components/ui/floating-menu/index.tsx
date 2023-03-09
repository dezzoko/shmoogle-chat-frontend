import { FC, HTMLAttributes, memo, ReactNode, useEffect, useRef } from 'react';

import { MenuContainer, StyledFloatingMenu } from './styled';

interface FloatingMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  element?: ReactNode;
  isHidden: boolean;
  setHidden: (value: boolean) => void;
  marginTop?: string;
  marginLeft?: string;
}

const FloatingMenu: FC<FloatingMenuProps> = (props: FloatingMenuProps) => {
  const { children, element, isHidden, setHidden, ...other } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = (event: MouseEvent) => {
    if (event.target !== menuRef.current && !menuRef.current?.contains(event.target as Node)) {
      if (!isHidden) {
        setHidden(true);
      }
    }
  };

  useEffect(() => {
    document.documentElement.addEventListener('click', clickOutsideHandler);
    return () => {
      document.documentElement.removeEventListener('click', clickOutsideHandler);
    };
  }, [clickOutsideHandler]);

  if (!element) {
    return <>{children}</>;
  }

  return (
    <StyledFloatingMenu ref={menuRef}>
      <MenuContainer {...other} isHidden={isHidden}>
        {element}
      </MenuContainer>
      {children}
    </StyledFloatingMenu>
  );
};

FloatingMenu.displayName = 'FloatingMenu';

export default FloatingMenu;
