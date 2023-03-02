import styled from 'styled-components';

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ListBody = styled.div<ListBodyProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: ${(props) => (props.isEmpty ? 'center' : '')};
  justify-content: ${(props) => (props.isEmpty ? 'center' : '')};
  height: 100%;
  padding: 0 4px 0 30px;
  overflow-y: auto;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

export const NameContainer = styled.div`
  flex-grow: 1;
`;

export const MeetListItemContainer = styled.div`
  border-radius: 0 30px 30px 0;
  margin-left: -30px;
  padding: 2px 0;
  padding-left: 30px;
  background: ${({ theme }) => theme.activeChatListItemBackgroundColor};
  &:hover {
    cursor: pointer;
  }
`;

export const CheckboxContainer = styled.div`
  margin: 0 5px;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.hoverColor};
  }
`;

export const KeyboardImage = styled.div`
  background-image: url('https://www.gstatic.com/images/icons/material/system_gm/1x/keyboard_black_20dp.png');
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
`;

export const CameraImage = styled.div`
  background-image: url('//ssl.gstatic.com/ui/v1/icons/mail/rfr/video_call_black_1x.png');
  background-position: center;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
`;

interface ListBodyProps {
  isEmpty?: boolean;
}
