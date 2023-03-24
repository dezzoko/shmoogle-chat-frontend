import { OnlineIcon } from 'components/status-select/styled';
import NoBotherSvg from 'components/svg/no-bother-svg';
import OfflineSvg from 'components/svg/offline-svg';
import TextArea from 'components/ui/textArea';
import { User } from 'core/entities/user.entity';
import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { UserService } from 'shared/services/user.service';
import { userActions } from 'shared/store/reducers/user.slice';
import { backendUserToEntityFactory } from 'shared/utils/factories';
import { StatusCase, StatusCredit, StatusMenuContainer } from './styled';
export enum StatusOption {
  online = 1,
  noborther,
  offline,
}

interface StatusMenuProps {
  setHidden: Dispatch<SetStateAction<boolean>>;
}
const StatusMenu: FC<StatusMenuProps> = (props: StatusMenuProps) => {
  const { setHidden } = props;
  const dispatch = useAppDispatch();
  const { setLoggedUser } = userActions;
  const changeStatus = async (status: StatusOption) => {
    const updatedUser = await UserService.Instance.update({
      statusId: status,
    });
    dispatch(setLoggedUser(backendUserToEntityFactory(updatedUser as User)));
    setHidden(true);
  };

  return (
    <StatusMenuContainer>
      <StatusCase>
        <OnlineIcon />
        <StatusCredit onClick={() => changeStatus(StatusOption.online)}>
          <TextArea margin="0 0px 10px 10px">Онлайн</TextArea>
          <TextArea margin="0 0px 10px 10px" fontWeight="100">
            На месте
          </TextArea>
        </StatusCredit>
      </StatusCase>
      <StatusCase onClick={() => changeStatus(StatusOption.noborther)}>
        <NoBotherSvg />
        <StatusCredit>
          <TextArea margin="0 0px 10px 10px">Не беспокоить</TextArea>
          <TextArea margin="0 0px 10px 10px" fontWeight="100">
            Скрыть уведомления чата
          </TextArea>
        </StatusCredit>
      </StatusCase>
      <StatusCase onClick={() => changeStatus(StatusOption.offline)}>
        <OfflineSvg />
        <StatusCredit>
          <TextArea margin="0 0px 10px 10px">Нет на месте</TextArea>
          <TextArea margin="0 0px 10px 10px" fontWeight="100">
            На месте
          </TextArea>
        </StatusCredit>
      </StatusCase>
    </StatusMenuContainer>
  );
};

export default StatusMenu;
