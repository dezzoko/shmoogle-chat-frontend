import { FC, memo } from 'react';

import { UserStatus } from 'core/entities/status.entity';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import { OnlineIcon, StatusSelectButton, StyledStatusSelect } from './styled';
import { ListCheckbox } from 'components/ui';
import NoBotherSvg from '../svg/no-bother-svg';
import OfflineSvg from '../svg/offline-svg';

function renderSwitch(statusId: UserStatus) {
  switch (statusId) {
    case UserStatus.online:
      return (
        <>
          <OnlineIcon />
          <label>Онлайн</label>
        </>
      );

    case UserStatus.offline:
      return (
        <>
          <OfflineSvg />
          <label>Нет на месте</label>
        </>
      );
    case UserStatus.nobother:
      return (
        <>
          <NoBotherSvg />
          <label>Не беспокоить</label>
        </>
      );
  }
}
interface StatusSelectProps {
  onClick: (e: any) => any;
  isOpen: boolean;
}
const StatusSelect: FC<StatusSelectProps> = memo((props: StatusSelectProps) => {
  const { onClick, isOpen } = props;
  const { user } = useAppSelector((state) => state.userReducer);

  if (!user) {
    return <></>;
  }

  return (
    <StyledStatusSelect onClick={onClick}>
      {renderSwitch(user.statusId)}
      <StatusSelectButton>
        <ListCheckbox onChecked={onClick} initialValue={isOpen} />
      </StatusSelectButton>
    </StyledStatusSelect>
  );
});

StatusSelect.displayName = 'StatusSelect';

export default StatusSelect;
