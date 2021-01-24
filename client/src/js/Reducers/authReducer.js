import {
  USER_LOADING,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_AUTH_USER,
  AUTH_ERRORS,
} from '../constants/ActionsTypes';

const initialState = {
  token: localStorage.getItem('token'), //null
  user: null,
  isAuth: false,
  isLoading: true,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        ...payload,
      };
    case GET_AUTH_USER:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        ...payload,
      };
    case LOGOUT_USER:
    case AUTH_ERRORS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
