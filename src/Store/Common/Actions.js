import {createActions} from 'reduxsauce';

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable. This can be used
 * to listen to actions:
 *
 * - to trigger reducers to update the state, for example in App/Stores/Example/Reducers.js
 * - to trigger sagas, for example in App/Sagas/index.js
 *
 * Actions can be dispatched:
 *
 * - in React components using `dispatch(...)`, for example in App/App.js
 * - in sagas using `yield put(...)`, for example in App/Sagas/ExampleSaga.js
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const {Types, Creators} = createActions({
  getLanguage: ['payload'],
  getLanguageLoading: [null],
  getLanguageSuccess: ['payload'],
  getLanguageFailure: [null],

  userLogin: ['payload'],
  userLoginLoading: [null],

  updateUserProfile: ['payload'],
  updateUserProfileLoading: [null],
  updateUserProfileSuccess: ['payload'],
  updateUserProfileFailure: [null],

  getUserProfile: ['payload'],

  getUserGallary: ['payload'],
  getUserGallaryLoading: [null],
  getUserGallarySuccess: ['payload'],
  getUserGallaryFailure: [null],

  getUserVideo: ['payload'],
  getUserVideoLoading: [null],
  getUserVideoSuccess: ['payload'],
  getUserVideoFailure: [null],

  getUserFilter: ['payload'],
  getUserFilterLoading: [null],
  getUserFilterSuccess: ['payload'],
  getUserFilterFailure: [null],

  social_login: ['payload'],
  social_loginLoading: [null],
  social_loginSuccess: ['payload'],

  tradeUserExisting: ['payload'],
  tradeUserExistingLoading: [null],
  tradeUserExistingSuccess: ['payload'],
  tradeUserExistingFailure: [null],

  tradeTransactionInitializer: ['payload'],
  tradeTransactionInitializerLoading: [null],
  tradeTransactionInitializerSuccess: ['payload'],
  tradeTransactionInitializerFailure: [null],

  getTradeTransactionsList: ['payload'],
  getTradeTransactionsListLoading: [null],
  getTradeTransactionsListSuccess: ['payload'],
  getTradeTransactionsListFailure: [null],

  getTradeTransfer: ['payload'],
  getTradeTransferLoading: [null],
  getTradeTransferSuccess: ['payload'],
  getTradeTransferFailure: [null],

  clearOtp: null,

  clearUpdateProfile: null,
});

export const CommonTypes = Types;
export default Creators;
