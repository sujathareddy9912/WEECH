import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_RESET,
  GET_PROFILE_IMAGE_LOADING,
  GET_PROFILE_IMAGE_SUCCESS,
  GET_PROFILE_IMAGE_ERROR,
  UPDATE_PROFILE_IMAGE_LOADING,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_IMAGE_ERROR,
  UPDATE_PROFILE_IMAGE_RESET,
  GET_PROFILE_VIDEO_LOADING,
  GET_PROFILE_VIDEO_SUCCESS,
  GET_PROFILE_VIDEO_ERROR,
  GET_PROFILE_IMAGE_RESET,
  GET_PROFILE_VIDEO_RESET,
  UPDATE_PROFILE_VIDEO_LOADING,
  UPDATE_PROFILE_VIDEO_SUCCESS,
  UPDATE_PROFILE_VIDEO_ERROR,
  UPDATE_PROFILE_VIDEO_RESET,
  DELETE_PROFILE_IMAGE_VIDEO_LOADING,
  DELETE_PROFILE_IMAGE_VIDEO_SUCCESS,
  DELETE_PROFILE_IMAGE_VIDEO_ERROR,
  DELETE_PROFILE_IMAGE_VIDEO_RESET,
  SET_GENDER,
  IS_EDIT,
  IS_DONE,
} from '../../ActionConstant/profile.constant';

const initalState = {
  getProfileLoading: false,
  getProfileSuccess: null,
  getProfileError: null,

  updateProfileLoading: false,
  updateProfileSuccess: null,
  updateProfileError: null,

  getProfileImageLoading: false,
  getProfileImageSuccess: null,
  getProfileImageError: null,

  updateProfileImageLoading: false,
  updateProfileImageSuccess: null,
  updateProfileImageError: null,

  getProfileVideoLoading: false,
  getProfileVideoSuccess: null,
  getProfileVideoError: null,

  updateProfileVideoLoading: false,
  updateProfileVideoSuccess: null,
  updateProfileVideoError: null,

  deleteProfileImageVideoLoading: false,
  deleteProfileImageVideoSuccess: null,
  deleteProfileImageVideoError: null,

  appgender: null,
  isEdit: false,
  isDone: [],
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
    case GET_PROFILE_IMAGE_LOADING:
      return getProfileImageLoading(state);
    case GET_PROFILE_IMAGE_SUCCESS:
      return getProfileImageSuccess(state, payload);
    case GET_PROFILE_IMAGE_ERROR:
      return getProfileImageError(state, payload);
    case UPDATE_PROFILE_IMAGE_LOADING:
      return updateProfileImageLoading(state);
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return updateProfileImageSuccess(state, payload);
    case UPDATE_PROFILE_IMAGE_ERROR:
      return updateProfileImageError(state, payload);
    case GET_PROFILE_VIDEO_LOADING:
      return getProfileVideoLoading(state);
    case GET_PROFILE_VIDEO_SUCCESS:
      return getProfileVideoSuccess(state, payload);
    case GET_PROFILE_VIDEO_ERROR:
      return getProfileVideoError(state, payload);
    case UPDATE_PROFILE_VIDEO_LOADING:
      return updateProfileVideoLoading(state);
    case UPDATE_PROFILE_VIDEO_SUCCESS:
      return updateProfileVideoSuccess(state, payload);
    case UPDATE_PROFILE_VIDEO_ERROR:
      return updateProfileVideoError(state, payload);
    case UPDATE_PROFILE_IMAGE_RESET:
      return updateProfileImageReset(state);
    case UPDATE_PROFILE_VIDEO_RESET:
      return updateProfileVideoReset(state);
    case GET_PROFILE_IMAGE_RESET:
      return getProfileImageReset(state);
    case GET_PROFILE_VIDEO_RESET:
      return getProfileVideoReset(state);
    case DELETE_PROFILE_IMAGE_VIDEO_LOADING:
      return deleteProfileImageVideoLoading(state);
    case DELETE_PROFILE_IMAGE_VIDEO_SUCCESS:
      return deleteProfileImageVideoSuccess(state, payload);
    case DELETE_PROFILE_IMAGE_VIDEO_ERROR:
      return deleteProfileImageVideoError(state, payload);
    case DELETE_PROFILE_IMAGE_VIDEO_RESET:
      return deleteProfileImageVideoReset(state);
    case SET_GENDER:
      return setProfileGender(state, payload);
    case IS_DONE:
      return setIsDone(state, payload);
    case IS_EDIT:
      return setIsEdit(state, payload);
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

const getProfileImageLoading = state => ({
  ...state,
  getProfileImageLoading: true,
  getProfileImageSuccess: null,
  getProfileImageError: null,
});

const getProfileImageSuccess = (state, payload) => ({
  ...state,
  getProfileImageLoading: false,
  getProfileImageSuccess: payload,
  getProfileImageError: null,
});

const getProfileImageError = (state, payload) => ({
  ...state,
  getProfileImageLoading: false,
  getProfileImageSuccess: null,
  getProfileImageError: payload,
});

const updateProfileImageLoading = state => ({
  ...state,
  updateProfileImageLoading: true,
  updateProfileImageSuccess: null,
  updateProfileImageError: null,
});

const updateProfileImageSuccess = (state, payload) => ({
  ...state,
  updateProfileImageLoading: false,
  updateProfileImageSuccess: payload,
  updateProfileImageError: null,
});

const updateProfileImageError = (state, payload) => ({
  ...state,
  updateProfileImageLoading: false,
  updateProfileImageSuccess: null,
  updateProfileImageError: payload,
});

const getProfileVideoLoading = state => ({
  ...state,
  getProfileVideoLoading: true,
  getProfileVideoSuccess: null,
  getProfileVideoError: null,
});

const getProfileVideoSuccess = (state, payload) => ({
  ...state,
  getProfileVideoLoading: false,
  getProfileVideoSuccess: payload,
  getProfileVideoError: null,
});

const getProfileVideoError = (state, payload) => ({
  ...state,
  getProfileVideoLoading: false,
  getProfileVideoSuccess: null,
  getProfileVideoError: payload,
});

const updateProfileVideoLoading = state => ({
  ...state,
  updateProfileVideoLoading: true,
  updateProfileVideoSuccess: null,
  updateProfileVideoError: null,
});

const updateProfileVideoSuccess = (state, payload) => ({
  ...state,
  updateProfileVideoLoading: false,
  updateProfileVideoSuccess: payload,
  updateProfileVideoError: null,
});

const updateProfileVideoError = (state, payload) => ({
  ...state,
  updateProfileVideoLoading: false,
  updateProfileVideoSuccess: null,
  updateProfileVideoError: payload,
});

const deleteProfileImageVideoLoading = state => ({
  ...state,
  deleteProfileImageVideoLoading: true,
  deleteProfileImageVideoSuccess: null,
  deleteProfileImageVideoError: null,
});

const deleteProfileImageVideoSuccess = (state, payload) => ({
  ...state,
  deleteProfileImageVideoLoading: false,
  deleteProfileImageVideoSuccess: payload,
  deleteProfileImageVideoError: null,
});

const deleteProfileImageVideoError = (state, payload) => ({
  ...state,
  deleteProfileImageVideoLoading: false,
  deleteProfileImageVideoSuccess: null,
  deleteProfileImageVideoError: payload,
});

const updateProfileImageReset = state => ({
  ...state,
  updateProfileImageLoading: false,
  updateProfileImageSuccess: null,
  updateProfileImageError: null,
});

const updateProfileVideoReset = state => ({
  ...state,
  updateProfileVideoLoading: false,
  updateProfileVideoSuccess: null,
  updateProfileVideoError: null,
});

const getProfileImageReset = state => ({
  ...state,
  getProfileImageLoading: false,
  getProfileImageSuccess: null,
  getProfileImageError: null,
});

const getProfileVideoReset = state => ({
  ...state,
  getProfileVideoLoading: false,
  getProfileVideoSuccess: null,
  getProfileVideoError: null,
});

const deleteProfileImageVideoReset = state => ({
  ...state,
  deleteProfileImageVideoLoading: false,
  deleteProfileImageVideoSuccess: null,
  deleteProfileImageVideoError: null,
});

const setProfileGender = (state, payload) => ({
  ...state,
  appgender: payload,
});

const setIsEdit = (state, payload) => ({
  ...state,
  isEdit: payload,
});

const setIsDone = (state, payload) => {
  let done = [...state.isDone];
  if (!done.includes(payload)) {
    done.push(payload);
  }
  return {
    ...state,
    isDone: [...done],
  };
};

const updateProfileReset = state => ({
  ...state,
  getProfileLoading: false,
  getProfileSuccess: null,
  getProfileError: null,
  updateProfileLoading: false,
  updateProfileSuccess: null,
  updateProfileError: null,
});
