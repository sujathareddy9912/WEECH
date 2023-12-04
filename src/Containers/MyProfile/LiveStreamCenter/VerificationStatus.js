import React from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import {dynamicSize} from '../../../Utils/responsive';
import {Button} from '../../../Component/commomComponent';

export default VerificationStatus = ({navigation}) => {
  const {
    params: {isVerified},
  } = useRoute();

  const verificationStatus = isVerified ? 'Verified' : 'Verification Failed';
  const verificationMessage = isVerified
    ? 'Congratulations!\nFace Verification was successful.'
    : 'There was a problem in verifying your face. Try Again!';

  const buttonText = isVerified ? 'Continue' : 'Retry';

  const onButtonPress = () => {
    if (isVerified) {
      navigation?.navigate('Profile', {});
    } else {
      navigation?.goBack();
    }
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isVerified
            ? COLORS.VERIFIED_GREEN
            : COLORS.FAILED_RED,
        },
      ]}>
      <SafeAreaView />
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => navigation?.navigate('LiveStreamCenter', {})}>
            <FontAwesome5Icon
              name={'chevron-left'}
              color={COLORS.WHITE}
              size={20}
              style={{
                marginRight: 4,
              }}
            />
          </TouchableOpacity>
          {!isVerified && (
            <Text style={styles.headingText}>
              Back to Live Streaming Center
            </Text>
          )}
        </View>
        <View style={styles.centerView}>
          {isVerified ? (
            <SvgIcon.VerifiedIcon />
          ) : (
            <SvgIcon.VerificationFailedIcon />
          )}
          <Text style={styles.titleText}>{verificationStatus}</Text>

          <Text style={styles.descriptionText}>{verificationMessage}</Text>
        </View>

        <Button
          width={wp(80)}
          label={buttonText}
          onPress={onButtonPress}
          buttonStyle={styles.buttonStyle}
          labelStyle={[
            styles.btntext,
            {color: isVerified ? COLORS.BLACK : COLORS.FAILED_RED},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headingText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: COLORS.WHITE,
    marginLeft: dynamicSize(5),
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
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: COLORS.WHITE,
    marginTop: dynamicSize(10),
  },

  descriptionText: {
    fontSize: 18,
    lineHeight: 28,
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
  },
});
