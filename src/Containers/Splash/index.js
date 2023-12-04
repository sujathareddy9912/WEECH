import React, {useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Styles';
import {getData} from '../../Utils/helper';
import {LOCAL_KEY} from '../../Utils/localStorage';
import {serviceConst} from '../../Services/Utils/HelperService';
import {GradientBackground} from '../../Component/commomComponent';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      _sessionManage();
    }, 2000);
  }, []);

  const _sessionManage = async () => {
    const token = await getData(LOCAL_KEY.TOKEN);
    const profileSetupStatus = await getData(LOCAL_KEY.PROFILE_SETUP_STATUS);

    if (token) {
      serviceConst.token = token;
      profileSetupStatus == 'true'
        ? navigation.navigate('ProfileSetup', {isEdit: false})
        : navigation.reset({
            index: 0,
            routes: [{name: 'MainTabNavigation'}],
          });
    } else {
      navigation.navigate('AuthStack');
    }
  };

  return (
    // <LinearGradient
    //   start={{x: 0, y: 0}}
    //   end={{x: 1.4, y: 0}}
    //   colors={['#0A13E4', '#D833F3']}
    //   style={styles.Container}>
    <GradientBackground>
      <StatusBar translucent={true} backgroundColor="blue" />
      <View style={styles.image}>
        <Animatable.View animation="zoomIn" easing="ease-out" duration={1500}>
          <Image
            source={require('../../Assets/Images/Weecha-Logo.png')}
            style={[styles.logo, {resizeMode: 'cover'}]}
          />
        </Animatable.View>
      </View>
      {/* </LinearGradient> */}
    </GradientBackground>
  );
};
export default SplashScreen;
