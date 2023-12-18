import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
} from '../../ActionConstant/profile.constant';

const initalState = {
  getProfileLoading: false,
  getProfileSuccess: null,
  getProfileError: null,
};

export default function ProfileReducer(state = initalState, {type, payload}) {
  switch (type) {
    case GET_PROFILE_LOADING:
      return setProfileLoading(state);
    case GET_PROFILE_SUCCESS:
      return setProfileSuccess(state, payload);
    case GET_PROFILE_ERROR:
      return setProfileError(state, payload);
    default:
      return state;
  }
}

const setProfileLoading = state => ({
  ...state,
  getProfileLoading: true,
  getProfileSuccess: null,
  getProfileError: null,
});

const setProfileSuccess = (state, payload) => ({
  ...state,
  getProfileLoading: false,
  getProfileSuccess: payload,
  getProfileError: null,
});

const setProfileError = (state, payload) => ({
  ...state,
  getProfileLoading: false,
  getProfileSuccess: null,
  getProfileError: payload,
});
