import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  GET_PROFILE_IMAGE_LOADING,
  GET_PROFILE_IMAGE_SUCCESS,
  GET_PROFILE_IMAGE_ERROR,
  UPDATE_PROFILE_IMAGE_LOADING,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_IMAGE_ERROR,
  GET_PROFILE_VIDEO_LOADING,
  GET_PROFILE_VIDEO_SUCCESS,
  GET_PROFILE_VIDEO_ERROR,
  UPDATE_PROFILE_VIDEO_LOADING,
  UPDATE_PROFILE_VIDEO_SUCCESS,
  UPDATE_PROFILE_VIDEO_ERROR,
  DELETE_PROFILE_IMAGE_VIDEO_LOADING,
  DELETE_PROFILE_IMAGE_VIDEO_SUCCESS,
  DELETE_PROFILE_IMAGE_VIDEO_ERROR,
  SET_GENDER,
  IS_DONE,
  IS_EDIT,
} from '../../ActionConstant/profile.constant';

export const getProfileLoading = payload => ({
  type: GET_PROFILE_LOADING,
  payload,
});

export const getProfileSuccess = payload => ({
  type: GET_PROFILE_SUCCESS,
  payload,
});

export const getProfileError = payload => ({
  type: GET_PROFILE_ERROR,
  payload,
});

export const updateProfileLoading = payload => ({
  type: UPDATE_PROFILE_LOADING,
  payload,
});

export const updateProfileSuccess = payload => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload,
});

export const updateProfileError = payload => ({
  type: UPDATE_PROFILE_ERROR,
  payload,
});

export const getProfileImageLoading = payload => ({
  type: GET_PROFILE_IMAGE_LOADING,
  payload,
});

export const getProfileImageSuccess = payload => ({
  type: GET_PROFILE_IMAGE_SUCCESS,
  payload,
});

export const getProfileImageError = payload => ({
  type: GET_PROFILE_IMAGE_ERROR,
  payload,
});

export const uploadProfileImageLoading = payload => ({
  type: UPDATE_PROFILE_IMAGE_LOADING,
  payload,
});

export const uploadProfileImageSuccess = payload => ({
  type: UPDATE_PROFILE_IMAGE_SUCCESS,
  payload,
});

export const uploadProfileImageError = payload => ({
  type: UPDATE_PROFILE_IMAGE_ERROR,
  payload,
});

export const getProfileVideoLoading = payload => ({
  type: GET_PROFILE_VIDEO_LOADING,
  payload,
});

export const getProfileVideoSuccess = payload => ({
  type: GET_PROFILE_VIDEO_SUCCESS,
  payload,
});

export const getProfileVideoError = payload => ({
  type: GET_PROFILE_VIDEO_ERROR,
  payload,
});

export const uploadProfileVideoLoading = payload => ({
  type: UPDATE_PROFILE_VIDEO_LOADING,
  payload,
});

export const uploadProfileVideoSuccess = payload => ({
  type: UPDATE_PROFILE_VIDEO_SUCCESS,
  payload,
});

export const uploadProfileVideoError = payload => ({
  type: UPDATE_PROFILE_VIDEO_ERROR,
  payload,
});

export const deleteProfileImageVideoLoading = payload => ({
  type: DELETE_PROFILE_IMAGE_VIDEO_LOADING,
  payload,
});

export const deleteProfileImageVideoSuccess = payload => ({
  type: DELETE_PROFILE_IMAGE_VIDEO_SUCCESS,
  payload,
});

export const deleteProfileImageVideoError = payload => ({
  type: DELETE_PROFILE_IMAGE_VIDEO_ERROR,
  payload,
});

export const setGender = payload => ({
  type: SET_GENDER,
  payload,
});

export const isEdit = payload => ({
  type: IS_EDIT,
  payload,
});

export const isDone = payload => ({
  type: IS_DONE,
  payload,
});
