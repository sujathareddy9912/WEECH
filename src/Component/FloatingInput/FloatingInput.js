import {
  Text,
  View,
  Easing,
  Platform,
  Animated,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../Utils/colors';
import { dynamicSize, getFontSize } from '../../Utils/responsive';
import { FONT_FAMILY, FONT_SIZE } from '../../Utils/fontFamily';
import { Button, MyText, Touchable } from '../commomComponent';
import { strings } from '../../localization/config';
import { SvgIcon } from '../icons';

const TOP = Platform.OS === 'ios' ? hp(-1.5) : hp(-1.6);

const FloatingInput = props => {
  const {
    errors,
    inputStyle,
    onChangeText,
    containerStyle,
    rightButton = false,
    label = 'input',
    buttonLabel,
    onPress,
    indicator,
    onPhonePress,
    phone,
    lableColor,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const onBlur = () => setIsFocused(false);

  let color = COLORS.BLACK;
  if (errors) {
    color = COLORS.RED_COLOR;
  }

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderColor: errors ? COLORS.RED_COLOR : '#A3A8B460' },
      ]}>
      <View style={styles.labelContainer}>
        <Text
          style={[
            styles.label,
            {
              color,
            },
            lableColor
          ]}>
          {label}
        </Text>
      </View>
      {phone ? (
        <Touchable onPress={onPhonePress} style={styles.phoneNumberContainer}>
          <MyText style={styles.phoneNumber}>{phone || ''}</MyText>
          <SvgIcon.downTriangle />
        </Touchable>
      ) : null}
      <TextInput
        onBlur={onBlur}
        style={[
          styles.input,
          inputStyle,
          { color: errors ? COLORS.RED_COLOR : '#979797' },
        ]}
        onFocus={setIsFocused}
        onChangeText={onChangeText}
        selectionColor={COLORS.BABY_PINK}
        {...restOfProps}
      />
      {rightButton ? (
        <Button
          indicator={indicator}
          isDark
          onPress={onPress}
          label={buttonLabel || strings('common.sendUpperCase')}
          buttonStyle={styles.btn}
          labelStyle={{ fontFamily: FONT_FAMILY.POPPINS_REGULAR }}
        />
      ) : null}
    </View>
  );
};

export default FloatingInput;

const styles = StyleSheet.create({
  container: {
    height: hp(6.5),
    borderWidth: 2,
    borderRadius: wp(2),
    paddingLeft: wp(4),
    marginVertical: wp(2),
    alignItems: 'center',
    flexDirection: 'row'
  },
  labelContainer: {
    position: 'absolute',
    top: TOP,
    left: wp(3),
    paddingHorizontal: wp(2),
    backgroundColor: COLORS.WHITE,
  },
  label: {
    fontSize: getFontSize(15),
    fontWeight: '500',
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  input: {
    height: hp(6.5),
    fontWeight: '600',
    flexGrow: 1
  },
  btn: {
    borderRadius: 5,
    borderWidth: 0,
    paddingHorizontal: dynamicSize(20)
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 2,
    paddingHorizontal: dynamicSize(10),
    borderRightColor: COLORS.TEXT_INPUT,
  },
  phoneNumber: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.SEMI,
    marginRight: dynamicSize(5),
  },
});
