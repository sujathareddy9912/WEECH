import {showMessage} from 'react-native-flash-message';

export const handleError = (title: string, message?: string) => {
  if (message) {
    showMessage({
      autoHide: false,
      description: message,
      message: title,
      type: 'danger',
      icon: 'danger',
    });
  } else {
    showMessage({
      description: '',
      message: title,
      type: 'danger',
      icon: 'danger',
    });
  }
};
