import reduceReducers from 'reduce-reducers';

const defaultState = {};

export default function reduceReducers(
  (state, action) => state || defaultState,
  function robotStreamReducer(state, action) {
    switch (action.type) {
    case 'STREAM_ROBOT_ATTEMPT':
      return {
        ...state,
        ...action.payload
      };
    case 'STREAM_ROBOT_SUCCESS':
      return {
        ...state,
        ...action.payload
      };
    case 'STREAM_ROBOT_FAILURE':
      return {
        ...state,
        ...action.payload
      };
    case 'STREAM_ROBOT_CLOSE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
    }
  }
)''
