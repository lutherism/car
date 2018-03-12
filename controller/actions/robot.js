import request from 'request';
import uuid from 'uuid';

function streamFromRobot(dispatch, getState) {
  const streamUuid = uuid();
  dispatch({
    type: 'STREAM_ROBOT_ATTEMPT',
    payload: {streamUuid}
  });
  request({
    wp: '/robot-stream',
    onSuccess: () => {
      dispatch({
        type: 'STREAM_ROBOT_SUCCESS',
        payload: {streamUuid}
      });
    },
    onFailure: () => {
      dispatch({
        type: 'STREAM_ROBOT_FAILURE',
        payload: {streamUuid}
      });
    },
    onClose: () => {
      dispatch({
        type: 'STREAM_ROBOT_CLOSE',
        payload: {streamUuid}
      });
    }
    onPacket: (packet) => {
      dispatch({
        type: 'STREAM_ROBOT_RECIEVE',
        payload: {
          streamUuid,
          packet
        }
      });
    }
  })
}
