import React, {FC, useState, forwardRef} from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Text,
  ColorValue,
} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {COLORS} from '../../Utils/colors';
import moment from 'moment';

type CustomProps = {
  type?: 'datetime' | 'date' | 'time';
  date?: string;
  maximumDate?: Date | null;
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
  label?: string;
  placeholder?: string;
  lable?: string;
  labelTextColor?: ColorValue;
  isRequired?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeHolderStyle?: StyleProp<TextStyle>;
  rightIcon?: React.ReactElement;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

type DateTimePickerProps = CustomProps & DatePickerProps;

const DateTimePicker: FC<DateTimePickerProps> = (
  {
    type,
    date,
    maximumDate,
    label,
    labelTextColor,
    isRequired = false,
    labelStyle,
    minuteInterval,
    btnStyle,
    disabled,
    placeholder,
    placeHolderStyle,
    inputStyle,
    rightIcon,
    onChange,
    ...rest
  },
  ref,
) => {
  let labelColor = labelTextColor || COLORS.BLACK;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={styles.container} ref={ref}>
      {label && (
        <Text style={[styles.label, labelStyle, {color: labelColor}]}>
          {label}
          {isRequired && <Text style={styles.asterick}>*</Text>}
        </Text>
      )}
      <TouchableOpacity
        disabled={disabled}
        style={[btnStyle]}
        onPress={() => {
          setOpen(true);
        }}>
        <View style={[styles.flexRow]}>
          <View style={styles.flex4}>
            <Text
              style={[
                styles.placeholder,
                date ? inputStyle : placeHolderStyle,
              ]}>
              {date
                ? date?.toString()
                  ? type && type === 'date'
                    ? moment(new Date(date.toString())).format('DD/MM/YYYY') ||
                      null
                    : moment(new Date(date.toString())).format('hh:mm A')
                  : type && type === 'date'
                  ? moment(new Date()).format('DD/MM/YYYY')
                  : moment(new Date()).format('hh:mm A')
                : placeholder}
            </Text>
          </View>
          {!disabled && (
            <View style={[styles.flex1, styles.alignItemsFlexEnd]}>
              {rightIcon}
            </View>
          )}
        </View>
      </TouchableOpacity>
      <DatePicker
        {...rest}
        modal
        maximumDate={maximumDate}
        mode={type}
        open={open}
        date={date ? date : new Date()}
        onConfirm={value => {
          setOpen(false);
          onChange && onChange(value.toString());
        }}
        onCancel={() => {
          setOpen(false);
        }}
        textColor={COLORS.BLACK}
        minuteInterval={minuteInterval}
      />
    </View>
  );
};

export default forwardRef(DateTimePicker);

const styles = StyleSheet.create({
  label: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    backgroundColor: COLORS.WHITE,
    maxHeight: 60,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 20,
  },
  asterick: {
    color: COLORS.DARK_RED,
    fontSize: 14,
    fontWeight: '600',
  },
  flex4: {flex: 4},
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  alignItemsFlexEnd: {alignItems: 'flex-end', justifyContent: 'center'},
});
