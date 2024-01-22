import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TextStyle,
  StyleProp,
  ColorValue,
} from 'react-native';
import {Dropdown as DropDownElement} from 'react-native-element-dropdown';
import {COLORS} from '../../Utils/colors';

interface DropDownProps {
  data: {label: string; value: string}[];
  label?: string;
  labelTextColor?: ColorValue;
  isRequired?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  value?: string;
  disabled?: boolean;
  onChange?: (item: any) => void;
}

const DropDown: FC<DropDownProps> = ({
  data,
  label,
  labelTextColor,
  isRequired = false,
  labelStyle,
  placeholder,
  placeholderStyle,
  value,
  disabled,
  onChange,
  ...rest
}: any) => {
  const {BLACK} = COLORS;

  let labelColor = labelTextColor || BLACK;

  const renderItem = (item: {label: string; value: string}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View style={styles.cotainer}>
      {label && (
        <Text style={[styles.label, labelStyle, {color: labelColor}]}>
          {label}
          {isRequired && <Text style={styles.asterick}>*</Text>}
        </Text>
      )}
      <DropDownElement
        {...rest}
        data={data}
        mode="auto"
        autoScroll
        selectedTextProps={{numberOfLines: 1}}
        showsVerticalScrollIndicator
        placeholder={placeholder}
        placeholderStyle={[
          {color: 'lightgray'},
          styles.fontMedium,
          placeholderStyle,
        ]}
        searchPlaceholder="Search"
        selectedTextStyle={[styles.fontNormal, {color: BLACK}]}
        labelField="label"
        valueField="value"
        value={value}
        disable={disabled}
        onFocus={() => {
          Keyboard.dismiss();
        }}
        onChange={item => onChange && onChange(item)}
        renderItem={item => renderItem(item as any)}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    maxHeight: 60,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  asterick: {
    color: COLORS.DARK_RED,
    fontSize: 14,
    fontWeight: '600',
  },
  textItem: {
    flex: 1,
  },
  fontMedium: {
    fontSize: 10,
    fontWeight: '400',
  },
  fontNormal: {
    fontSize: 14,
    fontWeight: '400',
  },
  label: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
  },
});
