import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ConferenceRoomService } from 'shared/services/conference-room.service';

const MeetRoomRequire: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRoomFound, setRoomFound] = useState(false);

  if (!id) {
    navigate(-1);
    return null;
  }

  useEffect(() => {
    ConferenceRoomService.Instance.getByJoinToken(id)
      .then((room) => {
        setRoomFound(true);
      })
      .catch((error) => {
        navigate(-1);
      });
  }, []);

  return <>{isRoomFound ? <>{children}</> : <></>}</>;
};

MeetRoomRequire.displayName = 'MeetRoomRequire';

export default MeetRoomRequire;
