import styled from 'styled-components';

export const MeetVideoLabel = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const MeetVideoDisabledVideoScreen = styled.div`
  position: absolute;
`;

export const StyledMeetVideo = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: white;

  & video {
    width: 100%;
    height: 100%;
  }
`;
