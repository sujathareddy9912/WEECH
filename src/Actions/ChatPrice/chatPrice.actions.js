import {
  CHATPRICE_ERROR,
  CHATPRICE_LOADING,
  CHATPRICE_SUCCESS,
} from '../../ActionConstant/chatPrice.constant';

export const getChatPriceLoading = payload => ({
  type: CHATPRICE_LOADING,
  payload,
});

export const getChatPriceSuccess = payload => ({
  type: CHATPRICE_SUCCESS,
  payload,
});

export const getChatPriceError = payload => ({
  type: CHATPRICE_ERROR,
  payload,
});
