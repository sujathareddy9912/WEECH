import {takeLatest, put, call} from 'redux-saga/effects';
import request from '../../Helper/request';
import {
  getProfileLoading,
  getProfileSuccess,
  getProfileError,
  updateProfileLoading,
  updateProfileSuccess,
  updateProfileError,
  getProfileImageLoading,
  getProfileImageSuccess,
  getProfileImageError,
  uploadProfileImageLoading,
  uploadProfileImageSuccess,
  uploadProfileImageError,
  getProfileVideoLoading,
  getProfileVideoSuccess,
  getProfileVideoError,
  uploadProfileVideoLoading,
  uploadProfileVideoSuccess,
  uploadProfileVideoError,
  deleteProfileImageVideoLoading,
  deleteProfileImageVideoSuccess,
  deleteProfileImageVideoError,
} from '../../Actions/Profile/profile.actions';

import {
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  GET_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_REQUEST,
  GET_PROFILE_VIDEO_REQUEST,
  UPDATE_PROFILE_VIDEO_REQUEST,
  DELETE_PROFILE_IMAGE_VIDEO_REQUEST,
} from '../../ActionConstant/profile.constant';

/** * APIs */

const getProfileApi = async () => {
  return request({
    url: `users/profile`,
    method: 'GET',
  });
};

const updateProfileApi = async data => {
  return request({
    url: `users/updateUserProfile`,
    method: 'PUT',
    data,
  });
};

const getFavouriteImagesApi = async data => {
  return request({
    url: `users/user_gallery/${data}`,
    method: 'GET',
  });
};

const uploadFavouriteImagesApi = async data => {
  return request({
    url: `video/save_image`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const getFavouriteVideosApi = async data => {
  return request({
    url: `users/user_video/${data}`,
    method: 'GET',
  });
};

const uploadFavouriteVideosApi = async data => {
  return request({
    url: `video/save_video`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const deleteFavouriteImageVideosApi = async data => {
  return request({
    url: `users/delete_files`,
    method: 'delete',
    data,
  });
};

/** SAGA */

function* getProfile() {
  try {
    yield put(getProfileLoading());
    const res = yield call(getProfileApi);
    if (res && res.data.code === 200) {
      yield put(getProfileSuccess(res.data));
    } else {
      yield put(getProfileError(res.data));
    }
  } catch (error) {
    if (error.data) {
      yield put(
        getProfileError({
          error: error.data,
        }),
      );
    }
  }
}

function* updateProfile(data) {
  try {
    const {payload} = data;
    yield put(updateProfileLoading());
    const res = yield call(updateProfileApi, payload);
    if (res && res.data.code === 200) {
      yield put(updateProfileSuccess(res.data));
    } else {
      yield put(updateProfileError(res.data));
    }
  } catch (error) {
    if (error.data) {
      yield put(
        updateProfileError({
          error: error.data,
        }),
      );
    }
  }
}

function* getFavouriteImages(data) {
  try {
    const {payload} = data;
    // alert(payload)
    yield put(getProfileImageLoading());
    const res = yield call(getFavouriteImagesApi, payload);
    if (res && res.data.code === 200) {
      yield put(getProfileImageSuccess(res.data));
    } else {
      yield put(getProfileImageError(res.data));
    }
  } catch (error) {
    if (error.data) {
      yield put(
        getProfileImageError({
          error: error.data,
        }),
      );
    }
  }
}

function* uploadFavouriteImages(data) {
  try {
    const {payload} = data;
    yield put(uploadProfileImageLoading());
    const res = yield call(uploadFavouriteImagesApi, payload);
    if (res && res.data.code === 200) {
      yield put(uploadProfileImageSuccess(res.data));
    } else {
      yield put(uploadProfileImageError(res.data));
    }
  } catch (error) {
    if (error.data) {
      yield put(
        uploadProfileImageError({
          error: error.data,
        }),
      );
    }
  }
}

function* getFavouriteVideo(data) {
  try {
    const {payload} = data;
    yield put(getProfileVideoLoading());
    const res = yield call(getFavouriteVideosApi, payload);
    if (res && res.data.code === 200) {
      yield put(getProfileVideoSuccess(res.data));
    } else {
      yield put(getProfileVideoError(res.data));
    }
  } catch (error) {
    if (error.data) {
      yield put(
        getProfileVideoError({
          error: error.data,
        }),
      );
    }
  }
}

function* uploadFavouriteVidoes(data) {
  try {
    const {payload} = data;
    yield put(uploadProfileVideoLoading());
    const res = yield call(uploadFavouriteVideosApi, payload);
    if (res && res.data.code === 200) {
      yield put(uploadProfileVideoSuccess(res.data));
    } else {
      yield put(uploadProfileVideoError(res.data));
    }
  } catch (error) {
    if (error.data) {
      yield put(
        uploadProfileVideoError({
          error: error.data,
        }),
      );
    }
  }
}

function* deleteFavouriteImageVidoes(data) {
  try {
    const {payload} = data;
    yield put(deleteProfileImageVideoLoading());
    const res = yield call(deleteFavouriteImageVideosApi, payload);
    if (res && res.data.code === 200) {
      yield put(deleteProfileImageVideoSuccess(res.data));
    } else {
      yield put(deleteProfileImageVideoError(res.data));
    }
  } catch (error) {
    if (error.data) {
      yield put(
        deleteProfileImageVideoError({
          error: error.data,
        }),
      );
    }
  }
}

export default function* ProfileSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
  yield takeLatest(GET_PROFILE_IMAGE_REQUEST, getFavouriteImages);
  yield takeLatest(UPDATE_PROFILE_IMAGE_REQUEST, uploadFavouriteImages);
  yield takeLatest(GET_PROFILE_VIDEO_REQUEST, getFavouriteVideo);
  yield takeLatest(UPDATE_PROFILE_VIDEO_REQUEST, uploadFavouriteVidoes);
  yield takeLatest(
    DELETE_PROFILE_IMAGE_VIDEO_REQUEST,
    deleteFavouriteImageVidoes,
  );
}
