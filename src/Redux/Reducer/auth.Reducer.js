import * as TYPES from '../Action/type';

const initialState = {
  getLanguageList: [],
  userLoginList: {},
};

const authReducer = (state = initialState, action) => {
  const prevState = {...state};
  const {type, payload} = action;
  switch (type) {
    case TYPES.GET_LANGUAGE_SUCCESS_ACTION:
      return {
        ...prevState,
        getLanguageList: payload,
      };
    case TYPES.LOGIN_SUCCESS_ACTION:
      return {
        ...prevState,
        userLoginList: payload,
      };

    default:
      return {...prevState};
  }
};

export default authReducer;
