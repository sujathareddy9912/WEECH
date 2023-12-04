import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';
import {dateTimeFormat, dobFormat, timeFormat} from '../Utils/momentHelper';
import {MyText, Touchable} from './commomComponent';
import commonStyle from './commonStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {strings} from '../localization/config';
import {SCREEN_HEIGHT} from '../Utils/helper';
import {dynamicSize} from '../Utils/responsive';
import {COLORS} from '../Utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';

const DateTimePicker = (props: any) => {
  const {
    isRequired,
    is24,
    selectedDate,
    children,
    style,
    placeholder,
    textStyle,
    mode,
    maxDate,
    minDate,
    label,
    value,
    mainContainerStyle,
  } = props;

  const [showPicker, setPicker] = useState(false);
  const [date, setDate] = useState('');
  const [choosenDate, setChoosenDate] = useState(moment().toDate());

  useEffect(() => {
    if (value) {
      setChoosenDate(moment(value).toDate());
    }
  }, [value]);

  const _showPicker = () => setPicker(true);

  const _closePicker = () => setPicker(false);

  const _onConfirm = (date: any) => {
    const resultDob = moment(date).toDate();
    setChoosenDate(resultDob);
    if (mode === 'time') {
      setDate(timeFormat(date));
      selectedDate(timeFormat(date));
    } else if (mode === 'datetime') {
      setDate(dateTimeFormat(resultDob));
      selectedDate(dateTimeFormat(resultDob));
    } else {
      setDate(dobFormat(resultDob));
      selectedDate(dobFormat(resultDob));
    }
    _closePicker();
  };

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <View style={styles.labelContainer}>
        <MyText style={styles.label}>{label}</MyText>
        {isRequired ? <MyText style={styles.asterisk}>{'*'}</MyText> : null}
      </View>
      <Touchable onPress={_showPicker} style={[styles.datePickerView, style]}>
        <MyText style={[styles.datePlaceholder, textStyle]}>
          {date
            ? date
            : placeholder
            ? placeholder
            : strings('editProfile.dd_mm_yyyy')}
        </MyText>
        {children}
      </Touchable>
      <DateTimePickerModal
        is24Hour={is24}
        minimumDate={minDate}
        maximumDate={maxDate}
        isVisible={showPicker}
        locale="en_GB"
        mode={mode || 'date'}
        date={choosenDate}
        // value={choosenDate}
        display={'spinner'}
        onConfirm={_onConfirm}
        onCancel={_closePicker}
      />
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  mainContainer: {
    paddingTop: dynamicSize(5),
    paddingBottom: dynamicSize(5),
    paddingHorizontal: SCREEN_HEIGHT * 0.005,
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.WHITE,
  },
  datePickerView: {
    borderRadius: dynamicSize(5),
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  datePlaceholder: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.MEDIUM,
  },
  asterisk: {
    color: COLORS.LIGHT_MAGENTA,
    marginLeft: dynamicSize(5),
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.EXTRA_LARGE,
  },
});
