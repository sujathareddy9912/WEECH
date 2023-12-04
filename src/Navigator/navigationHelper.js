import {createRef} from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = createRef();
export const routeNameRef = createRef();

export const navigateToScreen = (name, param) => {
  navigationRef?.current?.dispatch(
    CommonActions.navigate({
      name,
      params: param,
    }),
  );
};

export const reset = (name, params) => {
  navigationRef?.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: name, params}],
    }),
  );
};
