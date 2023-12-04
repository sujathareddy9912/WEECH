import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {COLORS} from '../Utils/colors';
import {FONT_SIZE} from '../Utils/fontFamily';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';
import {navigationRef} from '../Navigator/navigationHelper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';
import {CustomModal, MyText, Touchable} from './commomComponent';

const NotEnoughDiamondModal = props => {
  const {goBack, onRecharge, isVisible} = props;

  return (
    <CustomModal
      isVisible={isVisible}
      style={{backgroundColor: COLORS.TRANSPARENT}}>
      <BlurView style={[styles.absolute]} blurType="light" blurAmount={10} />
      <View style={styles.alertContainer}>
        <View style={styles.upperContainer}>
          <MyText style={styles.title}>
            {strings('profile.notEnoughDiamonds')}
          </MyText>
          <MyText style={styles.description}>
            {strings('profile.notDiamondsdescription')}
          </MyText>
        </View>
        <View style={styles.footer}>
          <Touchable
            onPress={goBack}
            style={[styles.button, {borderRightWidth: 1}]}>
            <MyText style={styles.buttonText}>
              {strings('profile.goBack')}
            </MyText>
          </Touchable>
          <Touchable onPress={onRecharge} style={styles.button}>
            <MyText style={styles.buttonText}>
              {strings('profile.recharge')}
            </MyText>
          </Touchable>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  alertContainer: {
    width: SCREEN_WIDTH - dynamicSize(30),
    alignItems: 'center',
    borderRadius: dynamicSize(20),
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
  },

  upperContainer: {
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.04,
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: FONT_SIZE.SEMI,
  },

  description: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    marginTop: SCREEN_HEIGHT * 0.03,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
  },

  button: {
    flex: 1,
    paddingVertical: SCREEN_HEIGHT * 0.033,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontWeight: '600',
    fontSize: FONT_SIZE.SEMI,
    color: COLORS.MEHRUN_COLOR,
  },
});

export default NotEnoughDiamondModal;
