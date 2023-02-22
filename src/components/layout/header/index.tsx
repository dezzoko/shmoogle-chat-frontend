import { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo_chat.png';
import { FlexContainer } from '../styled';
import { LogoContainer, SearchInputContainer, StyledHeader } from './styled';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { sidebarActions } from 'shared/store/reducers/sidebar.slice';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import RoundButton from '../../ui/round-button';
import SearchInput from '../../search-input';
import Tooltip from '../../tooltip';
import Avatar from '../../avatar';
import StatusSelect from 'components/status-select';
import MenuSvg from 'components/svg/menu-svg';
import SupportSvg from 'components/svg/support-svg';
import OptionsGearSvg from 'components/svg/options-gear-svg';
import AppsSvg from 'components/svg/apps-svg';
import { routes } from 'core/constants/routes';
import Modal from 'components/ui/modal';
import OptionsList from 'components/options';

const Header: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { isActive } = useAppSelector((state) => state.sidebarReducer);
  const [isModalHidden, setModalHidden] = useState(true);

  const { setIsActive, setIsOpened } = sidebarActions;

  const { user } = useAppSelector((state) => state.userReducer);

  const menuClickHandler = () => {
    dispatch(setIsActive(!isActive));
    dispatch(setIsOpened(!isActive));
  };

  const optionsClickHandler = () => {
    setModalHidden(false);
  };

  return (
    <>
      <StyledHeader>
        <FlexContainer align="center">
          <FlexContainer align="center" flex="0 2 auto">
            <Tooltip text="Главное меню">
              <RoundButton size="24px" padding="12px" margin="0 4px" onClick={menuClickHandler}>
                <MenuSvg />
              </RoundButton>
            </Tooltip>
            <Link to={routes.home}>
              <LogoContainer padding="0 20px 0 0">
                <img src={logo} />
              </LogoContainer>
            </Link>
          </FlexContainer>
          <FlexContainer align="center" flex="1 1 auto">
            <SearchInputContainer padding="0 30px 0 0">
              <SearchInput />
            </SearchInputContainer>
            <StatusSelect />
            <Tooltip text="Поддержка">
              <RoundButton size="24px" padding="8px">
                <SupportSvg />
              </RoundButton>
            </Tooltip>
            <Tooltip text="Настройки">
              <RoundButton size="24px" padding="8px" onClick={optionsClickHandler}>
                <OptionsGearSvg />
              </RoundButton>
            </Tooltip>
          </FlexContainer>
          <FlexContainer align="center" flex="0 0">
            <Tooltip text="Приложения Shmoogle">
              <RoundButton size="24px" padding="8px">
                <AppsSvg />
              </RoundButton>
            </Tooltip>
            <Tooltip text={`Аккаунт Shmoogle\n ${user?.username} \n ${user?.login}`}>
              <RoundButton size="32px" padding="4px">
                <Avatar src={user?.avatarUrl} label={user?.username[0] || 'u'} />
              </RoundButton>
            </Tooltip>
          </FlexContainer>
        </FlexContainer>
      </StyledHeader>
      <Modal title="Настройки" isHidden={isModalHidden} setHidden={setModalHidden}>
        <OptionsList />
      </Modal>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
