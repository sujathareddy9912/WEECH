import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/colors';
import {countryCode, defaultCountry} from '../Utils/countryCode';
import {dynamicSize} from '../Utils/responsive';
import {
  CustomModal,
  MyText,
  Touchable,
  TouchableIcon,
  MyList,
  MyImage,
} from './commomComponent';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';
import Icons from './icons';
import {strings} from '../localization/config';
import Input from './Input';
import {FONT_SIZE} from '../Utils/fontFamily';
import Icon from './Icons/Icon';

const CountryCodePicker = props => {
  const {
    isVisible,
    getCountry,
    showDialCode,
    closeCountryModal,
    setDefaultValue = true,
  } = props;

  const [searchText, setSearch] = useState('');
  const [countryList, setCountryList] = useState(countryCode);

  useEffect(() => {
    const foundCountry = countryCode.find(item => {
      if (item['dialCode'] == props?.['countryCode']) return item;
    });
    if (foundCountry?.['dialCode']) getCountry(foundCountry);
    else if (setDefaultValue) getCountry(defaultCountry);
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <Touchable onPress={_setCountry(item)} style={styles['countryListView']}>
        <MyImage source={item.icon} style={styles['countryImage']} />
        {showDialCode && (
          <View style={{width: dynamicSize(50)}}>
            <MyText style={styles['callingCode']}>{item.dialCode}</MyText>
          </View>
        )}
        <MyText>{item.name}</MyText>
      </Touchable>
    );
  };

  const _seperator = () => <View style={styles['seperator']} />;

  const _setCountry = item => () => {
    getCountry(item);
    setCountryList(countryCode);
    setSearch('');
  };

  const _onChangeText = text => {
    setSearch(text);
    if (text.trim().length) {
      const filteredList = countryCode.filter(item => {
        if (item['name'].includes(text)) return item;
      });

      setCountryList(filteredList);
    } else setCountryList(countryCode);
  };

  const _closeCountryModal = () => {
    setCountryList(countryCode);
    setSearch('');
    closeCountryModal();
  };

  return (
    <CustomModal
      {...props}
      isVisible={isVisible}
      animationType="slide"
      style={[
        {
          paddingTop: useSafeAreaInsets().top,
          paddingBottom: useSafeAreaInsets().bottom,
        },
        styles['mainContainer'],
      ]}>
      <TouchableOpacity style={styles.closeBtn} onPress={_closeCountryModal}>
        <Icon origin="AntDesign" name="close" color="#000" size={24} />
      </TouchableOpacity>

      <Input
        mainContainer={styles.searchInputContainer}
        textInputStyle={styles.searchInput}
        placeholder={strings('common.search')}
        onChangeText={_onChangeText}
        style={styles['searchTextInput']}
        value={searchText}
      />
      <MyList
        key="countryList"
        data={countryList}
        renderItem={_renderItem}
        ItemSeparatorComponent={_seperator}
      />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: null,
    alignItems: null,
    backgroundColor: COLORS.WHITE,
  },
  seperator: {
    height: dynamicSize(3),
    borderTopWidth: 0.5,
  },
  countryListView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingHorizontal: dynamicSize(15),
    paddingVertical: dynamicSize(5),
  },
  countryImage: {
    height: dynamicSize(28),
    width: dynamicSize(25),
    marginRight: dynamicSize(8),
  },
  callingCode: {
    marginRight: dynamicSize(5),
  },
  searchTextInput: {
    marginTop: null,
    width: SCREEN_WIDTH,
    paddingHorizontal: dynamicSize(15),
    paddingVertical: dynamicSize(10),
    marginBottom: dynamicSize(2),
  },
  crossIcon: {
    marginRight: dynamicSize(15),
    width: dynamicSize(30),
    height: dynamicSize(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  searchInputContainer: {
    borderWidth: 1,
  },
  searchInput: {
    fontSize: FONT_SIZE.MEDIUM,
    paddingVertical: SCREEN_HEIGHT * 0.01,
  },
  closeBtn: {
    padding: 4,
    alignSelf: 'flex-end',
    height: 32,
    width: 32,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CountryCodePicker;
