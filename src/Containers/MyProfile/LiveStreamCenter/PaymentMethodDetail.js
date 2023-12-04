import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {PaymentMethod} from './Constant';
import {COLORS} from '../../../Utils/colors';
import {dynamicSize} from '../../../Utils/responsive';
import {Button} from '../../../Component/commomComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const PaymentMethodDetail = ({navigation}) => {
  const {
    params: {paymentType, countryData, agencyId},
  } = useRoute();

  const [upiId, setUpiID] = useState();
  const [number, setNumber] = useState();
  const [emailId, setEmailId] = useState();
  const [payPalId, setPayPalId] = useState();
  const [bankCode, setBankCode] = useState();
  const [ifscCode, setIFSCcode] = useState();
  const [bankAccount, setBankAccount] = useState();
  const [bankAddress, setBankAddress] = useState();
  const [beneficiaryName, setBeneficiaryName] = useState();
  const [beneficiaryLastName, setBeneficiaryLastName] = useState();

  const getHeaderText = () => {
    switch (paymentType) {
      case 'bankAccount':
        return 'Bank Details';

      case 'payneer':
        return 'Payneer Details';

      case 'payPal':
        return 'PayPal Details';

      case 'upiId':
        return 'UPI Details';

      case 'paytm':
        return 'Paytm Details';

      case 'gpay':
        return 'Google Pay Details';

      default:
        break;
    }
  };

  const getStatus = () => {
    switch (paymentType) {
      case 'bankAccount':
        return !!(
          beneficiaryName &&
          bankCode &&
          ifscCode &&
          bankAccount &&
          number
        );

      case 'payneer':
        return !!emailId;

      case 'payPal':
        return !!payPalId;

      case 'upiId':
        return !!upiId;

      case 'paytm':
      case 'gpay':
        return !!number;

      default:
        break;
    }
  };

  const getPaymentData = () => {
    switch (paymentType) {
      case 'bankAccount':
        return {
          phone: number,
          email: emailId,
          bankCode: bankCode,
          ifscCode: ifscCode,
          accountNumber: bankAccount,
          address: bankAddress,
          bankHolderFirstName: beneficiaryName,
          bankHolderLastName: beneficiaryLastName,
        };

      case 'payneer':
        return {payneerDetails: emailId};

      case 'payPal':
        return {payPalId: payPalId};

      case 'upiId':
        return {upiId: upiId};

      case 'paytm':
        return {paytmNumber: number};

      case 'gpay':
        return {googlePayDetails: number};

      default:
        break;
    }
  };

  const _isValidate = async () => {
    const isValidStatus = getStatus();

    if (!isValidStatus) alert('Please fill the field(s)');
    else {
      const paymentDetails = getPaymentData();
      navigation.navigate('StartFaceVerification', {
        agencyId,
        paymentType,
        countryData,
        paymentDetails,
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={{backgroundColor: COLORS.LIGHT_BABY_PINK}} />
      <View style={styles.headerContainer}>
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

        <Text style={styles.headerTitle}>{getHeaderText()}</Text>
      </View>

      <View style={styles.subContainer}>
        <View>
          <Text style={styles.description}>
            Please fill in the correct account information, or your payments
            will be affected.
          </Text>
          {paymentType == PaymentMethod.payneer && (
            <TextInput
              mode="outlined"
              value={emailId}
              placeholder="Input Text"
              label="Please add your E-mail"
              style={styles.textFieldStyle}
              onChangeText={text => setEmailId(text)}
              activeOutlineColor={COLORS.LIGHT_BABY_PINK}
            />
          )}

          {(paymentType == PaymentMethod.paytm ||
            paymentType == PaymentMethod.gpay) && (
            <TextInput
              mode="outlined"
              value={number}
              placeholder="Input Text"
              label="Please add your number"
              style={styles.textFieldStyle}
              onChangeText={text => setNumber(text)}
              activeOutlineColor={COLORS.LIGHT_BABY_PINK}
            />
          )}

          {paymentType == PaymentMethod.upiId && (
            <TextInput
              mode="outlined"
              value={upiId}
              placeholder="Input Text"
              label="Please add your UPI ID"
              style={styles.textFieldStyle}
              onChangeText={text => setUpiID(text)}
              activeOutlineColor={COLORS.LIGHT_BABY_PINK}
            />
          )}

          {paymentType == PaymentMethod.payPal && (
            <TextInput
              mode="outlined"
              value={payPalId}
              placeholder="Input Text"
              style={styles.textFieldStyle}
              label="Please add your PayPal ID"
              onChangeText={text => setPayPalId(text)}
              activeOutlineColor={COLORS.LIGHT_BABY_PINK}
            />
          )}

          {paymentType == PaymentMethod.bankAccount && (
            <View>
              <TextInput
                mode="outlined"
                value={beneficiaryName}
                placeholder="Input Text"
                label="Beneficiary Name"
                style={styles.textFieldStyle}
                activeOutlineColor={COLORS.LIGHT_BABY_PINK}
                onChangeText={text => setBeneficiaryName(text)}
              />

              <TextInput
                mode="outlined"
                placeholder="Input Text"
                value={beneficiaryLastName}
                label="Beneficiary Last Name"
                style={styles.textFieldStyle}
                activeOutlineColor={COLORS.LIGHT_BABY_PINK}
                onChangeText={text => setBeneficiaryLastName(text)}
              />
              <View style={styles.codeContainer}>
                <TextInput
                  mode="outlined"
                  value={bankCode}
                  label="Bank Code"
                  placeholder="Input Text"
                  style={styles.smallerTextFieldStyle}
                  onChangeText={text => setBankCode(text)}
                  activeOutlineColor={COLORS.LIGHT_BABY_PINK}
                />
                <TextInput
                  mode="outlined"
                  value={ifscCode}
                  label="IFSC Code"
                  placeholder="Input Text"
                  style={styles.smallerTextFieldStyle}
                  onChangeText={text => setIFSCcode(text)}
                  activeOutlineColor={COLORS.LIGHT_BABY_PINK}
                />
              </View>

              <TextInput
                mode="outlined"
                value={bankAccount}
                label="Bank Account"
                placeholder="Input Text"
                style={styles.textFieldStyle}
                onChangeText={text => setBankAccount(text)}
                activeOutlineColor={COLORS.LIGHT_BABY_PINK}
              />

              <TextInput
                mode="outlined"
                label="Address"
                value={bankAddress}
                placeholder="Input Text"
                style={styles.textFieldStyle}
                onChangeText={text => setBankAddress(text)}
                activeOutlineColor={COLORS.LIGHT_BABY_PINK}
              />

              <TextInput
                label="Email"
                mode="outlined"
                value={emailId}
                placeholder="Input Text"
                style={styles.textFieldStyle}
                onChangeText={text => setEmailId(text)}
                activeOutlineColor={COLORS.LIGHT_BABY_PINK}
              />

              <TextInput
                value={number}
                mode="outlined"
                label="Phone Number"
                placeholder="Input Text"
                style={styles.textFieldStyle}
                onChangeText={text => setNumber(text)}
                activeOutlineColor={COLORS.LIGHT_BABY_PINK}
              />
            </View>
          )}
        </View>
        <Button
          width={'100%'}
          label={'Save'}
          onPress={_isValidate}
          labelStyle={styles.btntext}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default PaymentMethodDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  backContainer: {
    zIndex: 1,
    position: 'absolute',
    marginLeft: dynamicSize(20),
  },

  headerContainer: {
    flexDirection: 'row',
    height: dynamicSize(40),
    backgroundColor: COLORS.LIGHT_BABY_PINK,
  },

  headerTitle: {
    fontSize: 20,
    width: '100%',
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.WHITE,
    textAlignVertical: 'center',
  },

  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: dynamicSize(16),
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    marginTop: dynamicSize(10),
  },

  textFieldStyle: {
    marginTop: dynamicSize(10),
    backgroundColor: COLORS.WHITE,
  },

  smallerTextFieldStyle: {
    width: '48%',
    marginTop: dynamicSize(10),
    backgroundColor: COLORS.WHITE,
  },

  buttonStyle: {
    alignSelf: 'center',
    borderRadius: dynamicSize(10),
    marginBottom: dynamicSize(30),
    backgroundColor: COLORS.VIOLET,
    paddingVertical: dynamicSize(16),
  },

  btntext: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.WHITE,
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
