import { OnlineIcon } from 'components/status-select/styled';
import ChoosenStatusSvg from 'components/svg/choosen-status-svg';
import NoBotherSvg from 'components/svg/no-bother-svg';
import OfflineSvg from 'components/svg/offline-svg';
import TextArea from 'components/ui/textArea';
import { User } from 'core/entities/user.entity';
import { ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, useId, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/app-dispatch.hook';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { UserService } from 'shared/services/user.service';
import { userActions } from 'shared/store/reducers/user.slice';
import { backendUserToEntityFactory } from 'shared/utils/factories';
import { StatusCase, StatusCredit, StatusMenuContainer, StatusRadioLabel, StyledStatusRadio } from './styled';
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
  const { user } = useAppSelector((state) => state.userReducer);
  const [highlightedStatus, setHighlightedStatus] = useState(user?.statusId || 1);

  const { setLoggedUser } = userActions;

  const onStatusChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value in StatusOption) {
      const updatedUser = await UserService.Instance.update({
        statusId: +event.target.value,
      });
      dispatch(setLoggedUser(backendUserToEntityFactory(updatedUser as User)));
      setHighlightedStatus(+event.target.value);
      setHidden(true);
    }
  };

  return (
    <StatusMenuContainer>
      <StatusOptionRadio
        checked={highlightedStatus === StatusOption.online}
        value={StatusOption.online}
        onChange={onStatusChange}
      >
        <StatusCase>
          <OnlineIcon />
          <StatusCredit>
            <TextArea margin="0 0px 10px 10px">Онлайн</TextArea>
            <TextArea margin="0 0px 10px 10px" fontWeight="100">
              На месте
            </TextArea>
          </StatusCredit>
          {highlightedStatus === StatusOption.online && (
            <>
              <div
                style={{
                  flex: 1,
                }}
              ></div>
              <ChoosenStatusSvg />
            </>
          )}
        </StatusCase>
      </StatusOptionRadio>
      <StatusOptionRadio
        checked={highlightedStatus === StatusOption.noborther}
        value={StatusOption.noborther}
        onChange={onStatusChange}
      >
        <StatusCase>
          <NoBotherSvg />
          <StatusCredit>
            <TextArea margin="0 0px 10px 10px">Не беспокоить</TextArea>
            <TextArea margin="0 0px 10px 10px" fontWeight="100">
              Скрыть уведомления чата
            </TextArea>
          </StatusCredit>
          {highlightedStatus === StatusOption.noborther && (
            <>
              <div
                style={{
                  flex: 1,
                }}
              ></div>
              <ChoosenStatusSvg />
            </>
          )}
        </StatusCase>
      </StatusOptionRadio>
      <StatusOptionRadio
        checked={highlightedStatus === StatusOption.offline}
        value={StatusOption.offline}
        onChange={onStatusChange}
      >
        <StatusCase>
          <OfflineSvg />
          <StatusCredit>
            <TextArea margin="0 0px 10px 10px">Нет на месте</TextArea>
            <TextArea margin="0 0px 10px 10px" fontWeight="100">
              На месте
            </TextArea>
          </StatusCredit>
          {highlightedStatus === StatusOption.offline && (
            <>
              <div
                style={{
                  flex: 1,
                }}
              ></div>
              <ChoosenStatusSvg />
            </>
          )}
        </StatusCase>
      </StatusOptionRadio>
    </StatusMenuContainer>
  );
};
interface StatusOptionProps {
  children: ReactNode;
  checked?: boolean;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
const StatusOptionRadio: FC<StatusOptionProps> = (props: StatusOptionProps) => {
  const { children, value, checked, onChange, ...other } = props;

  const id = useId();

  return (
    <>
      <StyledStatusRadio {...other} type="radio" id={id} checked={checked} onChange={onChange} value={value} />
      <StatusRadioLabel htmlFor={id}>{children}</StatusRadioLabel>
    </>
  );
};

export default StatusMenu;
