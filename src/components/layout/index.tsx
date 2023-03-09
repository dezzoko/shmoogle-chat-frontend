import { FC, ReactNode } from 'react';

import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { BodyContainer, FlexContainer } from './styled';
import Header from './header';
import Sidebar from './sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isActive } = useAppSelector((state) => state.sidebarReducer);

  return (
    <>
      <Header />
      <FlexContainer>
        <Sidebar />
        <BodyContainer margin={isActive ? '' : '0 0 0 72px'}>{children}</BodyContainer>
      </FlexContainer>
    </>
  );
};

Layout.displayName = 'Layout';

export default Layout;
