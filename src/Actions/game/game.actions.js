import {
  GAME_ERROR,
  GAME_LOADING,
  GAME_SUCCESS,
} from '../../ActionConstant/game.constant';

export const getGameLoading = payload => ({
  type: GAME_LOADING,
  payload,
});

export const getGameSuccess = payload => ({
  type: GAME_SUCCESS,
  payload,
});


export const getGameError = payload => ({
    type: GAME_ERROR,
    payload,
  });