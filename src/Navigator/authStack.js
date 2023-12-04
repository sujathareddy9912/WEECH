import React from 'react';
import {Stack} from '.';
import ForgotPassword from '../Containers/ForgotPassword';
import Landing from '../Containers/Landing';
import Login from '../Containers/Login';
import Signup from '../Containers/SignUp';

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
