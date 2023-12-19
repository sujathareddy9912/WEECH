import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
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
