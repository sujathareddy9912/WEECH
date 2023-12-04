import I18n from 'react-native-i18n';
import en from './en.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
};

export const strings = (str, params) => {
  return I18n.translate(str, params);
};

export default I18n;
