import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import {dynamicSize} from '../../../Utils/responsive';
import {Button, MyText} from '../../../Component/commomComponent';
import CountryCodePicker from '../../../Component/countryCodePicker';
import {strings} from '../../../localization/config';
import {HelperService} from '../../../Services/Utils/HelperService';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
} from '../../../ActionConstant/profile.constant';
import {FONT_FAMILY} from '../../../Utils/fontFamily';

const AddBankDetailPage = ({navigation}) => {
  const dispatch = useDispatch();
  const [isShowCountryModal, updateCountryModal] = useState(false);
  const [tcAndGuideline, setTermsCondition] = useState(false);
  const [weeChaGuideLine, setWeeChaGuideLine] = useState(false);
  const reducer = useSelector(state => state.profile);
  const {updateProfileSuccess} = reducer;

  const {
    params: {agencyId},
  } = useRoute();

  const openCountryModal = () => {
    const requestData = {
      hostAgreement: tcAndGuideline,
      weechaGuideLine: weeChaGuideLine,
    };
    dispatch({type: UPDATE_PROFILE_REQUEST, payload: requestData});
  };

  useEffect(() => {
    (async () => {
      if (updateProfileSuccess) {
        updateCountryModal(true);
      }
    })();
    return () => {
      dispatch({type: UPDATE_PROFILE_RESET});
    };
  }, [updateProfileSuccess]);

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

        <View>
          <View style={styles.bottomTextContainer}>
            <TouchableOpacity
              onPress={() => setTermsCondition(!tcAndGuideline)}>
              <MaterialIcons
                name={tcAndGuideline ? 'check-box' : 'check-box-outline-blank'}
                color={COLORS.WHITE}
                size={25}
              />
            </TouchableOpacity>
            <MyText style={styles.bold}>
              {`${strings('agency.aggrementDescription')} `}
              <MyText
                onPress={() => navigation.navigate('HostTermsAndConditions')}
                style={styles.underline}>{`${strings(
                'agency.hostTermCondition',
              )} .`}</MyText>
            </MyText>
          </View>
          <View style={styles.bottomTextContainer}>
            <TouchableOpacity
              onPress={() => setWeeChaGuideLine(!weeChaGuideLine)}>
              <MaterialIcons
                name={weeChaGuideLine ? 'check-box' : 'check-box-outline-blank'}
                color={COLORS.WHITE}
                size={25}
              />
            </TouchableOpacity>
            <MyText style={styles.bold}>
              {`${strings('agency.aggrementDescription')} `}
              <MyText
                onPress={() => navigation.navigate('WeeChaGuideLine')}
                style={styles.underline}>
                {`${strings('agency.guideLine')} .`}
              </MyText>
            </MyText>
          </View>
          <Button
            width={wp(80)}
            label={'Continue'}
            onPress={() => {
              tcAndGuideline && weeChaGuideLine
                ? openCountryModal()
                : HelperService.showToast(
                    'Please Accept Conditions and Guidline',
                  );
            }}
            labelStyle={styles.btntext}
            buttonStyle={styles.buttonStyle}
          />
        </View>

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
  bottomTextContainer: {
    padding: dynamicSize(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btntext: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  bold: {
    marginLeft: 10,
    color: COLORS.WHITE,
  },
  underline: {
    textDecorationLine: 'underline',
    marginLeft: 10,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
});
