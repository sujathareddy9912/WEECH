import React, {useState} from 'react';
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../Utils/colors';
import {styles} from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../Component/header/Header';
import {MyText, Touchable} from '../../../Component/commomComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import CountryCodePicker from '../../../Component/countryCodePicker';
const DATA = [
  {
    id: 0,
    title: 'Link Phone',
  },
  {
    id: 1,
    title: 'Link Mail',
  },
  {
    id: 2,
    title: 'Change Bank Account',
  },
];

const AccountSecurity = ({navigation}) => {
  const [countryPicker, setCountryPicker] = useState(false);
  const [country, setCountry] = useState('');

  const state = useSelector(state => {
    return state;
  });

  const _getCountry = data => {
    setCountry(data.name);
    _closeCountryPicker();
    navigation.navigate('BankDetails', {
      country: country,
    });
  };

  const _openCountryPicker = () => setCountryPicker(true);

  const _closeCountryPicker = () => setCountryPicker(false);

  const {userLoginList} = state.authReducer;

  const handlePress = id => {
    if (id == 1) {
      if (userLoginList?.user?.email) {
        navigation.navigate('ChangeMail', {
          isPhone: false,
        });
      } else {
        navigation.navigate('LinkMail');
      }
    } else if (id == 0) {
      navigation.navigate('ChangeMail', {
        isPhone: true,
      });
    } else {
      _openCountryPicker();
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <Touchable onPress={() => handlePress(item?.id)} style={styles.item}>
          <MyText style={styles.itemText}>{item.title}</MyText>
          <View
            style={[
              styles.item,
              {
                paddingVertical: 0,
              },
            ]}>
            {item?.id == 1 && (
              <MyText style={[styles.update]}>
                {userLoginList?.user?.email ? 'Linked' : 'Link'}
              </MyText>
            )}

            {item?.id == 0 && (
              <MyText style={[styles.update]}>
                {userLoginList?.user?.phone ? 'Linked' : 'Link'}
              </MyText>
            )}
            <FontAwesome
              name={'angle-right'}
              color={COLORS.MID_GREY}
              size={wp(7)}
              style={{
                paddingBottom: hp(0.5),
              }}
            />
          </View>
        </Touchable>
        {countryPicker && (
          <CountryCodePicker
            isVisible={countryPicker}
            getCountry={_getCountry}
            closeCountryModal={_closeCountryPicker}
          />
        )}
      </>
    );
  };

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.BLACK}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <Text>Back</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Header
          title={String('Account and Security')}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          titleStyle={styles.title}
        />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </>
  );
};

export default AccountSecurity;
