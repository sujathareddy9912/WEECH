import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {COLORS} from '../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';
import {dynamicSize} from '../Utils/responsive';
import {SvgIcon} from './icons';

export const MyDropDown = props => {
  const {
    topOffset,
    errorMessage,
    data,
    label,
    value,
    error,
    onChangeText,
    style,
    placeholder,
    icon,
    containerStyle,
    width,
    mainContainerStyle,
    labelfontSize,
    labelStyle,
  } = props;

  const containerWidth = width || '45%';

  const _renderIcon = () => {
    return <SvgIcon.downTriangle />;
  };

  return (
    <View style={[{justifyContent: 'center'}, mainContainerStyle]}>
      {/* <MyText style={styles['inputLabelStyle']}>{label}</MyText> */}
      <Dropdown
        {...props}
        placeholderTextColor={COLORS.BLACK}
        value={value}
        labelTextStyle={[
          {
            fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
            color: COLORS.BLACK,
            fontSize: FONT_SIZE.REGULAR_MEDIUM,
          },
          labelStyle,
        ]}
        itemTextStyle={{
          fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
          color: COLORS.BLACK,
          fontSize: FONT_SIZE.REGULAR_MEDIUM,
        }}
        containerStyle={[styles.dropDownContainer, style]}
        fontSize={FONT_SIZE.MEDIUM}
        error={error}
        label={label}
        labelFontSize={labelfontSize ? labelfontSize : FONT_SIZE.REGULAR_MEDIUM}
        dropdownOffset={{top: dynamicSize(20), left: dynamicSize(14)}}
        fontFamily={FONT_FAMILY.POPPINS_REGULAR}
        baseColor={COLORS.BLACK}
        itemColor={COLORS.BLACK}
        textColor={COLORS.BLACK}
        data={data}
        selectedItemColor={COLORS.BLACK}
        inputContainerStyle={[styles.inputContainerStyle, containerStyle]}
        renderAccessory={_renderIcon}
        placeholder={placeholder || ' '}
        onChangeText={onChangeText}
        errorColor={COLORS.LIGHT_MAGENTA}
        pickerStyle={[styles.dowpdownPickerStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabelStyle: {
    marginBottom: dynamicSize(5),
    color: COLORS.BLACK,
  },
  dropDownContainer: {
    paddingTop: dynamicSize(5),
    height: dynamicSize(60),
    width: '100%',
    paddingHorizontal: SCREEN_HEIGHT * 0.005,
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.WHITE,
  },
  dowpdownPickerStyle: {
    alignSelf: 'center',
    width: SCREEN_WIDTH - dynamicSize(50),
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.WHITE,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
});
