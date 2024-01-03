import {
  GAME_ERROR,
  GAME_LOADING,
  GAME_RESET,
  GAME_SUCCESS,
} from '../../ActionConstant/game.constant';

const initalState = {
  gameLoading: false,
  gameSuccess: null,
  gameError: null,
};

export default function GameReducer(state = initalState, {type, payload}) {
  switch (type) {
    case GAME_LOADING:
      return setGameLoading(state);
    case GAME_SUCCESS:
      return setGameSuccess(state, payload);
    case GAME_ERROR:
      return setGameError(state, payload);
    case GAME_RESET:
      return setResetError(state);
    default:
      return state;
  }
}

const setGameLoading = state => ({
  ...state,
  gameLoading: true,
  gameSuccess: null,
  gameError: null,
});

const setGameSuccess = (state, payload) => ({
  ...state,
  gameLoading: false,
  gameSuccess: payload,
  gameError: null,
});

const setGameError = (state, payload) => ({
  ...state,
  gameLoading: false,
  gameSuccess: null,
  gameError: payload,
});

const setResetError = (state, payload) => ({
  ...state,
  gameLoading: false,
  gameSuccess: null,
  gameError: null,
});
