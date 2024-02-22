import {
  CHATPRICE_ERROR,
  CHATPRICE_LOADING,
  CHATPRICE_RESET,
  CHATPRICE_SUCCESS,
} from '../../ActionConstant/chatPrice.constant';

const initalState = {
  chatPriceLoading: false,
  chatPriceSuccess: null,
  chatPriceError: null,
};

export default function ChatPriceReducer(state = initalState, {type, payload}) {
  switch (type) {
    case CHATPRICE_LOADING:
      return setChatPriceLoading(state);
    case CHATPRICE_SUCCESS:
      return setChatPriceSuccess(state, payload);
    case CHATPRICE_ERROR:
      return setChatPriceError(state, payload);
    case CHATPRICE_RESET:
      return setReset(state);
    default:
      return state;
  }
}

const setChatPriceLoading = state => ({
  ...state,
  chatPriceLoading: true,
  chatPriceSuccess: null,
  chatPriceError: null,
});

const setChatPriceSuccess = (state, payload) => ({
  ...state,
  chatPriceLoading: false,
  chatPriceSuccess: payload,
  chatPriceError: null,
});

const setChatPriceError = (state, payload) => ({
  ...state,
  chatPriceLoading: false,
  chatPriceSuccess: null,
  chatPriceError: payload,
});

const setReset = (state, payload) => ({
  ...state,
  chatPriceLoading: false,
  chatPriceSuccess: null,
  chatPriceError: null,
});
