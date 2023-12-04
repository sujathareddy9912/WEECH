import {Dimensions, Keyboard, Platform, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import KeepAwake from 'react-native-keep-awake';
import {countryCode} from './countryCode';

const Screen = Dimensions.get('screen');

export const SCREEN_WIDTH = Screen.width;

export const SCREEN_HEIGHT = Screen.height;

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const dismissKeyboard = () => Keyboard.dismiss();

export const imagePicker = async (mediaType = 'photo', isBase64) => {
  return new Promise((resolve, reject) =>
    ImagePicker.openPicker({
      mediaType: mediaType,
      includeBase64: true,
      cropping: mediaType == 'video' ? false : true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        const date = new Date();
        const timeStamp = Math.floor(date.getTime() + date.getSeconds() / 2);
        const fileExtension = image.mime.split('/')?.[1];
        // const fileExtension = image.path.substr(
        //   image.path.lastIndexOf('.') + 1,
        // );
        resolve({
          uri: image.path,
          type: image.mime,
          width: image.width,
          height: image.height,
          name: `${timeStamp}.${fileExtension}`,
          base64:
            isBase64 && mediaType == 'photo'
              ? `data:image/png;base64,${image.data}`
              : '',
        });
      })
      .catch(err => {
        reject(err);
      }),
  );
};

export const openCamera = async (mediaType = 'photo', isBase64) => {
  return new Promise((resolve, reject) =>
    ImagePicker.openCamera({
      mediaType: mediaType,
      includeBase64: true,
      resizeMode: 1000,
      cropping: true,
    })
      .then(image => {
        const date = new Date();
        const timeStamp = Math.floor(date.getTime() + date.getSeconds() / 2);
        const fileExtension = image.mime.split('/')?.[1];
        // const fileExtension = image.path.substr(
        //   image.path.lastIndexOf('.') + 1,
        // );
        resolve({
          uri: image.path,
          type: image.mime,
          name: `${timeStamp}.${fileExtension}`,
          base64:
            isBase64 && mediaType == 'photo'
              ? `data:image/png;base64,${image.data}`
              : '',
        });
      })
      .catch(err => {
        reject(err);
      }),
  );
};

export const geterateArray = (data, image) => {
  if (data.length >= 1) {
    for (let i = 0; i < data.length; i++) {
      let count = 0;
      for (let j = 0; j < data[i].length; j++) {
        if (data[i].length < 3) {
          data[i].push(image);
          break;
        } else {
          if (i == data.length - 1) {
            count += 1;
          }
          break;
        }
      }
      if (count > 0) {
        data.push([image]);
        break;
      }
    }
  } else {
    data.push([image]);
  }
  return data;
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`Error in storing ${key} to localstotage.`);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(`${key}`);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(`Error in getting ${key} from localstotage.`);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (e) {
    console.log(`Error in removing ${key} from localstotage.`);
  }
};

export const multiRemoveData = async keys => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(`Error in removing ${keys.toString()} from localstotage.`);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(`Error in clearing localstotage.`);
  }
};

/**
 * @name requestCameraAndAudioPermission
 * @description Function to request permission for Audio and Camera
 */
export default async function requestCameraAndAudioPermission() {
  if (isAndroid) {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
}

/**
 * @name requestAudioPermission
 * @description Function to request permission for Audio and Camera
 */
export async function requestAudioPermission() {
  if (isAndroid) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
}

export const getAge = date => {
  if (date) {
    const dob = moment(date).format('YYYY-MM-DD');
    const age = moment().diff(moment(dob, 'YYYY-MM-DD'), 'years');
    return age;
  } else return '';
};

export const capitalizeFirstAlpha = text => {
  return text && text[0].toUpperCase() + text.slice(1);
};

export const secondsToTime = e => {
  let h = Math.floor(e / 3600)
      .toString()
      .padStart(2, '0'),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0');
  return `${m}:${s}`;
};

export const secondsToHourMinute = e => {
  let h = Math.floor(e / 3600)
      .toString()
      .padStart(2, '0'),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0');
  return h != '00' ? `${h} : ${m} : ${s}` : `${m} : ${s}`;
};

export const enableKeepAwake = () => KeepAwake.activate();

export const disableKeepAwake = () => KeepAwake.deactivate();

export const CALLING_STATUS = {
  CALLING: 'calling',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  NOT_RESPONDED: 'notResponded',
};

export const CALLING_TYPE = {
  AUDIO: 'audio',
  VIDEO: 'video',
};

export const getTimeFormat = time => {
  if (moment().isSame(time)) {
    return moment(time).format('HH:mm');
  } else {
    return moment(time).format('DD-MM-YYYY, HH:mm');
  }
};

export const uuid = () => {
  if (isIOS) {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  } else {
    return Math.floor(Math.random() * 100000) + 1;
  }
};

export const getCountryDetailWithKey = ({key, value}) => {
  return countryCode.filter(item => item[key] === value)[0] || '';
};
