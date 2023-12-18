import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_RESET,
} from '../../ActionConstant/profile.constant';

const initalState = {
  getProfileLoading: false,
  getProfileSuccess: null,
  getProfileError: null,

  updateProfileLoading: false,
  updateProfileSuccess: null,
  updateProfileError: null,
};

export default function ProfileReducer(state = initalState, {type, payload}) {
  switch (type) {
    case GET_PROFILE_LOADING:
      return setProfileLoading(state);
    case GET_PROFILE_SUCCESS:
      return setProfileSuccess(state, payload);
    case GET_PROFILE_ERROR:
      return setProfileError(state, payload);
    case UPDATE_PROFILE_LOADING:
      return updateProfileLoading(state);
    case UPDATE_PROFILE_SUCCESS:
      return updateProfileSuccess(state, payload);
    case UPDATE_PROFILE_ERROR:
      return updateProfileError(state, payload);
    case UPDATE_PROFILE_RESET:
      return updateProfileReset(state);
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

const updateProfileLoading = state => ({
  ...state,
  updateProfileLoading: true,
  updateProfileSuccess: null,
  updateProfileError: null,
});

const updateProfileSuccess = (state, payload) => ({
  ...state,
  updateProfileLoading: false,
  updateProfileSuccess: payload,
  updateProfileError: null,
});

const updateProfileError = (state, payload) => ({
  ...state,
  updateProfileLoading: false,
  updateProfileSuccess: null,
  updateProfileError: payload,
});

const updateProfileReset = state => ({
  ...state,
  getProfileLoading: false,
  getProfileSuccess: null,
  getProfileError: null,
  updateProfileLoading: false,
  updateProfileSuccess: null,
  updateProfileError: null,
});
