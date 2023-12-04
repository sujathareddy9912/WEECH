import React from 'react';
import {useRoute} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import {dynamicSize} from '../../../Utils/responsive';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChoosePaymentType = ({navigation}) => {
  const {
    params: {countryData, agencyId},
  } = useRoute();

  const PaymentOption = [
    {
      labelName: 'Add Bank Account',
      icon: <SvgIcon.CardIcon />,
      methodName: 'bankAccount',
    },
    {
      labelName: 'Payneer',
      icon: <SvgIcon.PayneerIcon />,
      methodName: 'payneer',
    },
    {
      labelName: 'PayPal',
      icon: <SvgIcon.PaypalIcon />,
      methodName: 'payPal',
    },
    {
      labelName: 'UPI ID',
      icon: <SvgIcon.UpiIdIcon />,
      methodName: 'upiId',
    },
    {
      labelName: 'Paytm',
      icon: <SvgIcon.PaytmIcon />,
      methodName: 'paytm',
    },
    {
      labelName: 'Gpay',
      icon: <SvgIcon.GooglePayIcon />,
      methodName: 'gpay',
    },
  ];

  const navigateToDetail = item => () => {
    navigation.navigate('PaymentMethodDetail', {
      countryData,
      agencyId,
      paymentType: item.methodName,
    });
  };

  const renderPaymentOption = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={navigateToDetail(item)}
        style={styles.rowContainer}>
        <View style={styles.paymentContainer}>
          <View style={styles.iconContainer}>{item.icon}</View>
          <Text style={styles.paymentOptionLabel}>{item.labelName}</Text>
        </View>

        <View style={styles.backContainer} onPress={() => navigation?.goBack()}>
          <FontAwesome5Icon
            name={'chevron-right'}
            color={COLORS.BLACK}
            size={20}
            style={{
              marginRight: 4,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation?.goBack()}>
        <FontAwesome5Icon
          name={'chevron-left'}
          color={COLORS.BLACK}
          size={20}
          style={{
            marginRight: 4,
          }}
        />
      </TouchableOpacity>

      <Text style={styles.titleText}>Choose a Payment Type</Text>
      <Text style={styles.descriptionText}>
        Choose a payment method for your payments.
      </Text>

      <FlatList
        data={PaymentOption}
        renderItem={renderPaymentOption}
        contentContainerStyle={styles.FlatListContainer}
      />
    </View>
  );
};

export default ChoosePaymentType;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  backContainer: {
    marginLeft: dynamicSize(20),
  },

  titleText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
    color: COLORS.NAVY_BLUE,
    marginTop: dynamicSize(20),
    marginLeft: dynamicSize(20),
  },

  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#787993',
    fontWeight: '400',
    marginTop: dynamicSize(6),
    marginLeft: dynamicSize(20),
  },

  FlatListContainer: {
    marginTop: dynamicSize(20),
  },

  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: dynamicSize(16),
    paddingHorizontal: dynamicSize(24),
    borderBottomColor: COLORS.TAB_BORDER,
  },

  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: wp(8),
    height: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentOptionLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    marginLeft: dynamicSize(10),
  },
});
