import { GET_ERRORS } from '../constants/ActionsTypes';

// Return Auth errors
export const returnAuthErrors = (msg, status, id = null) => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {
      msg,
      status,
      id,
    },
  });
};
