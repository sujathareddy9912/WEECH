import React, {useEffect} from 'react';
import {View, BackHandler} from 'react-native';

import styles from './styles';
import {SvgIcon} from '../../Component/icons';
import {strings} from '../../localization/config';

import {
  MyText,
  Button,
  GradientBackground,
} from '../../Component/commomComponent';

import * as Animatable from 'react-native-animatable';

const Landing = props => {
  const _navToSignIn = () => props.navigation.navigate('Login');

  const _navToSignup = () => props.navigation.navigate('Signup'); 
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <GradientBackground>
      <Animatable.View
        animation="fadeIn"
        easing="ease"
        duration={3000}
        style={styles.mainContainer}>
        <View style={styles.logo}>
          <SvgIcon.WeechaLogoIcon />
        </View>
        <View style={styles.titleContainer}>
          <MyText style={styles.welcome}>{strings('landing.welcome')}</MyText>
          <MyText style={styles.glad}>{strings('landing.gladToSeeYou')}</MyText>
        </View>
        <View style={styles.middleContainer}>
          <Button
            onPress={_navToSignIn}
            label={strings('landing.signIn')}
            buttonStyle={styles.buttonStyle}
          />
          <Button
            onPress={_navToSignup}
            label={strings('landing.signUp')}
            buttonStyle={styles.signupButtonStyle}
          />
        </View>
        {SvgIcon.landingBanner()}
      </Animatable.View>
    </GradientBackground>
  );
};

export default Landing;
