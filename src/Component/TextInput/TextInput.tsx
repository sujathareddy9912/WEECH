import React, {FC, forwardRef} from 'react';
import {
  View,
  TextInput as BaseTextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ColorValue,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../Utils/colors';

interface BaseTextInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  textColor?: ColorValue;
  labelTextColor?: ColorValue;
  isRequired?: boolean;
  placeholderTextColor?: ColorValue;
  onChangeText?: (text: string) => void;
  label?: string;
  placeholder?: string;
  labelStyle?: StyleProp<TextStyle>;
  isPassword?: boolean;
  value?: any;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactElement;
  leftIconStyle?: StyleProp<TextStyle>;
  rightIcon?: React.ReactElement;
  rightIconStyle?: StyleProp<TextStyle>;
}

const TextInput: FC<BaseTextInputProps> = (
  {
    style,
    textColor,
    labelTextColor,
    isRequired = false,
    placeholder,
    placeholderTextColor,
    onChangeText,
    label,
    labelStyle,
    isPassword,
    value,
    containerStyle,
    rightIcon,
    rightIconStyle,
    inputContainerStyle,
    leftIcon,
    leftIconStyle,
    ...rest
  },
  ref,
) => {
  let inputColor = textColor || COLORS.BLACK;
  let labelColor = labelTextColor || COLORS.BLACK;
  let placeholderColor = placeholderTextColor || COLORS.TEXT_GRAY;
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle, {color: labelColor}]}>
          {label}
          {isRequired && <Text style={styles.asterick}>*</Text>}
        </Text>
      )}
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {leftIcon ? (
          <View style={[styles.rightIconContainer, rightIconStyle]}>
            {leftIcon}
          </View>
        ) : null}

        <BaseTextInput
          ref={ref}
          style={[
            styles.textInput,
            {
              color: inputColor,
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          value={value}
          {...rest}
        />

        {rightIcon ? (
          <View style={[styles.rightIconContainer, rightIconStyle]}>
            {rightIcon}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default forwardRef(TextInput);

const styles = StyleSheet.create({
  label: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
  },
  asterick: {
    color: COLORS.DARK_RED,
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: COLORS.WHITE,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 32,
    fontSize: 16,
    flex: 1,
    paddingVertical: 0,
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});
