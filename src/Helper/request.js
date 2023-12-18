import axios from 'axios';
// import Config from 'react-native-config';
// import KeychainServices from '../storage/keychain';
// import storageKey from '../../constants/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: 'https://dummyjson.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

client.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accesstoken')
    console.log('token to send', token);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error && error.response && error.response.status === 403) {
      if (error.response.data.message === 'Your request is not authorized') {
        // await AsyncStorage.removeItem('token');
        // navigationRef.dispatch(StackActions.replace(routeName.auth));
      } else {
        return Promise.reject(error);
      }
    }

    if (error.response.status !== 403) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

const request = async (options)=> {
  const onSuccess = (response) => {
    return response;
  };

  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;