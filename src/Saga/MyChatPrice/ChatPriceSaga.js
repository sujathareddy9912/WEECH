import {takeLatest, put, call} from 'redux-saga/effects';
import request from '../../Helper/request';
import {CHATPRICE_REQUEST} from '../../ActionConstant/chatPrice.constant';
import {
  getChatPriceLoading,
  getChatPriceSuccess,
  getChatPriceError,
} from '../../Actions/ChatPrice/chatPrice.actions';

/* Api*/

const getChatPriceSlabApi = async data => {
  return request({
    url: `income/get_chat_price_slab`,
    method: 'Get',
  });
};

/*SAGA */

function* getChatPriceSlab() {
  try {
    yield put(getChatPriceLoading());
    const res = yield call(getChatPriceSlabApi);
    if (res && res.data.code === 200) {
      yield put(getChatPriceSuccess(res.data));
    } else {
      yield put(getChatPriceError(res.data));
    }
  } catch (error) {
    console.log('INSIDE Dashboard ACTION CALL AFTER ERROR', error);
    if (error.data) {
      yield put(
        getChatPriceError({
          error: error.data,
        }),
      );
    }
  }
}

export default function* ChatPriceSaga() {
  yield takeLatest(CHATPRICE_REQUEST, getChatPriceSlab);
}
