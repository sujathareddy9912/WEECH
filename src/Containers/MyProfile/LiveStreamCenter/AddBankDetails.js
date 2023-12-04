import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import {dynamicSize} from '../../../Utils/responsive';
import {Button} from '../../../Component/commomComponent';
import CountryCodePicker from '../../../Component/countryCodePicker';

const AddBankDetailPage = ({navigation}) => {
  const [isShowCountryModal, updateCountryModal] = useState(false);

  const {
    params: {agencyId},
  } = useRoute();

  const openCountryModal = () => {
    updateCountryModal(true);
  };

  const closeCountryModal = () => {
    updateCountryModal(false);
  };

  const _getCountry = data => {
    closeCountryModal();
    navigation.navigate('ChoosePaymentType', {countryData: data, agencyId});
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation?.goBack()}>
          <FontAwesome5Icon
            name={'chevron-left'}
            color={COLORS.WHITE}
            size={20}
            style={{
              marginRight: 4,
            }}
          />
        </TouchableOpacity>
        <View style={styles.centerView}>
          <SvgIcon.BankIcon />
          <Text style={styles.titleText}>Add Bank Details</Text>
          <Text style={styles.descriptionText}>
            Please provide us with your Bank Details for easy & quick payments.
          </Text>
        </View>

        <Button
          width={wp(80)}
          label={'Continue'}
          onPress={openCountryModal}
          labelStyle={styles.btntext}
          buttonStyle={styles.buttonStyle}
        />

        {!!isShowCountryModal && (
          <CountryCodePicker
            // showDialCode
            setDefaultValue={false}
            isVisible={isShowCountryModal}
            getCountry={data => _getCountry(data)}
            closeCountryModal={closeCountryModal}
          />
        )}
      </View>
    </View>
  );
};

export default AddBankDetailPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.VIOLET,
  },

  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  backContainer: {
    marginLeft: dynamicSize(20),
  },

  centerView: {
    alignItems: 'center',
  },

  titleText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    color: COLORS.WHITE,
  },

  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: dynamicSize(30),
    paddingHorizontal: dynamicSize(24),
  },

  buttonStyle: {
    alignSelf: 'center',
    borderRadius: dynamicSize(10),
    paddingVertical: dynamicSize(16),
    marginBottom: dynamicSize(30),
  },

  btntext: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});
