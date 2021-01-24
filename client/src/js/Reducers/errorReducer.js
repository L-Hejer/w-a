import { GET_ERRORS } from '../constants/ActionsTypes';

const initialState = {
  msg: {},
  status: null,
  id: null,
};

const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      console.log(payload.msg.errors);
      return {
        msg: payload.msg.errors,
        status: payload.status,
        id: payload.id,
      };

    default:
      return state;
  }
};

export default errorReducer;
