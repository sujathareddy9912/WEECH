export const getLanguageError = data => ({type: 'GET_LANGUAGE_ERROR', data});
export const getLanguageSuccess = data => {
  return {type: 'GET_LANGUAGE_SUCCESS', data};
};
export const getLanguageLoader = () => ({type: 'GET_LANGUAGE_LOADER'});
