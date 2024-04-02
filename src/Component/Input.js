import React, {forwardRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {strings} from '../localization/config';
import {COLORS} from '../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {isIOS, SCREEN_HEIGHT} from '../Utils/helper';
import {dynamicSize} from '../Utils/responsive';
import {
  Button,
  MyImage,
  MyText,
  MyTextInput,
  Touchable,
  TouchableIcon,
} from './commomComponent';
import Icons, {SvgIcon} from './icons';

const Input = forwardRef((props, ref) => {
  const {
    style,
    source,
    mainContainer,
    tintColor,
    onPhonePress,
    error,
    rightButton,
    width,
    onPress,
    textInputStyle,
    indicator,
    svgSource,
    phone,
    buttonLabel,
    eyeIcon,
    isOpen,
    onEyePress,
  } = props;

  const INPUT_WIDTH = width ? width : '100%';

  return (
    <View style={style}>
      <View
        style={[
          styles.textFieldContainer,
          {width: INPUT_WIDTH, paddingRight: rightButton ? 0 : undefined},
          mainContainer,
        ]}>
        {source ? (
          <MyImage
            source={source}
            resizeMode="contain"
            style={{tintColor: tintColor ? tintColor : null}}
          />
        ) : null}
        {svgSource ? svgSource : null}
        {phone ? (
          <Touchable onPress={onPhonePress} style={styles.phoneNumberContainer}>
            <MyText style={styles.phoneNumber}>{phone || ''}</MyText>
            <SvgIcon.downTriangle />
          </Touchable>
        ) : null}
        <MyTextInput
          {...props}
          ref={ref}
          style={[
            styles.textInput,
            {paddingRight: rightButton ? dynamicSize(10) : 0},
            textInputStyle,
          ]}
        />
        {eyeIcon ? (
          <TouchableIcon
            onPress={onEyePress}
            source={isOpen ? Icons.OpenEyeIcon : Icons.CloseEyeIcon}
          />
        ) : null}
        {rightButton ? (
          <Button
            indicator={indicator}
            isDark
            onPress={onPress}
            label={buttonLabel || strings('common.sendUpperCase')}
            buttonStyle={{borderWidth: 0, paddingHorizontal: dynamicSize(20)}}
            labelStyle={{fontFamily: FONT_FAMILY.POPPINS_REGULAR}}
          />
        ) : null}
      </View>
      {error ? <MyText style={[styles.errorMessage]}>{error}</MyText> : null}
    </View>
  );
});

const InputWithLabel = forwardRef((props, ref) => {
  const {label, isRequired, style, textInputStyle, error, labelStyle} = props;

  return (
    <View style={style}>
      <View style={styles.mainContainer}>
        <View style={styles.labelContainer}>
          <MyText style={[styles.label, labelStyle]}>{label}</MyText>
          {isRequired ? <MyText style={styles.asterisk}>{'*'}</MyText> : null}
        </View>
        <MyTextInput
          {...props}
          ref={ref}
          style={[styles.textInputOne, textInputStyle]}
        />
      </View>
      {error ? <MyText style={[styles.errorMessage]}>{error}</MyText> : null}
    </View>
  );
});

export {InputWithLabel};
export default Input;

const styles = StyleSheet.create({
  textFieldContainer: {
    paddingHorizontal: SCREEN_HEIGHT * 0.02,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: dynamicSize(50),
  },
  textInput: {
    flex: 1,
    marginLeft: SCREEN_HEIGHT * 0.01,
    paddingVertical: isIOS ? SCREEN_HEIGHT * 0.015 : SCREEN_HEIGHT * 0.01,
    color: COLORS.TEXT_INPUT,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.SEMI,
  },
  errorMessage: {
    paddingVertical: dynamicSize(2),
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.RED_OFFSET,
    fontSize: FONT_SIZE.REGULAR,
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
  mainContainer: {
    paddingTop: dynamicSize(5),
    paddingHorizontal: SCREEN_HEIGHT * 0.005,
    backgroundColor: COLORS.WHITE,
    borderRadius: dynamicSize(5),
  },
  labelContainer: {
    flexDirection: 'row',
  },
  label: {
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  asterisk: {
    color: COLORS.LIGHT_MAGENTA,
    marginLeft: dynamicSize(5),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  textInputOne: {
    flex: 1,
    paddingVertical: SCREEN_HEIGHT * 0.01,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
  },
});
