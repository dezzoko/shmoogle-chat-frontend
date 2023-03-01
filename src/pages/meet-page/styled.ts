import styled from 'styled-components';

export const StyledMeetPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #000;
`;

export const MeetPageMembersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  width: 95%;
  height: 90%;
  background: black;
`;

export const MeetPageVideo = styled.div<MeetPageVideoProps>`
  position: relative;
  width: ${(props) => `calc(calc( 100% / ${props.scale || 1}) - ${5 * props.scale}px )`};
  height: 100%;

  & video {
    width: 100%;
    height: 100%;
  }
`;

export const MeetPageControlPanel = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 60px;
  padding: 10px 5%;
  box-sizing: border-box;
`;

interface MeetPageVideoProps {
  scale: number;
}
