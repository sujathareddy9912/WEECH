import {takeLatest, put, call} from 'redux-saga/effects';
import request from '../../Helper/request';
import {GAME_REQUEST} from '../../ActionConstant/game.constant';
import {
  getGameLoading,
  getGameSuccess,
  getGameError,
} from '../../Actions/game/game.actions';

/* Api*/

const getGameApi = async data => {
  return request({
    url: `language/dummy_data`,
    method: 'POST',
    data,
  });
};

/*SAGA */

function* getGame(data) {
  try {
    const {payload} = data;
    yield put(getGameLoading());
    const res = yield call(getGameApi, payload);
    if (res && res.data.code === 200) {
      yield put(getGameSuccess(res.data));
    } else {
      yield put(getGameError(res.data));
    }
  } catch (error) {
    console.log('INSIDE Dashboard ACTION CALL AFTER ERROR', error);
    if (error.data) {
      yield put(
        getGameError({
          error: error.data,
        }),
      );
    }
  }
}

export default function* GameSaga() {
  yield takeLatest(GAME_REQUEST, getGame);
}
