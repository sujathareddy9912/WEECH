import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import VerificationModal from './VerificationModal';
import {dynamicSize} from '../../../Utils/responsive';
import {Button} from '../../../Component/commomComponent';
import {userApiClient} from '../../../Services/Api/Common';
import {serviceConst} from '../../../Services/Utils/HelperService';

const StartFaceVerification = ({navigation}) => {
  const [loading, updateLoaderState] = useState(false);
  const [verificationModal, updateVerificationModal] = useState(false);

  const {
    params: {paymentType, countryData, paymentDetails, agencyId},
  } = useRoute();

  const startVerification = () => {
    handleCamera();
    updateVerificationModal(true);
  };

  const handleCamera = async imageData => {
    updateVerificationModal(false);

    updateLoaderState(true);
    const detail = {
      agency_id: agencyId,
      agencyJoined: true,
      face_verification: true,
      bankDetails: {
        bankCountry: countryData.name,
        bankType: paymentType,
        ...paymentDetails,
      },
      file: `data:image/png;base64,${imageData[0]?.base64}`,
    };

    try {
      const data = await userApiClient.post('users/face_verification', detail, {
        headers: {
          Authorization: serviceConst.token,
        },
      });

      if (data.data.status) {
        navigation.navigate('VerificationStatus', {isVerified: true});
      } else {
        navigation.navigate('VerificationStatus', {isVerified: false});
      }
    } catch (error) {
      console.log('Error value', error);
    } finally {
      updateLoaderState(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
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

        <Text style={styles.headerTitle}>Face Verification</Text>
      </View>

      <View style={styles.subContainer}>
        {/* Replace this component with a image component */}
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../Assets/Images/FaceVerification.png')}
          />
        </View>

        <Button
          indicator={loading}
          width={'90%'}
          label={'Start Scan'}
          labelStyle={styles.btntext}
          onPress={startVerification}
          buttonStyle={styles.buttonStyle}
        />
      </View>

      {verificationModal && (
        <Modal
          visible={verificationModal}
          onRequestClose={() => updateVerificationModal(false)}>
          <VerificationModal
            callback={handleCamera}
            handleClose={() => updateVerificationModal(false)}
          />
        </Modal>
      )}
    </View>
  );
};

export default StartFaceVerification;

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
  },

  headerTitle: {
    fontSize: 20,
    width: '100%',
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.WHITE,
    textAlignVertical: 'center',
    color: COLORS.LIGHT_BABY_PINK,
  },

  buttonStyle: {
    alignSelf: 'center',
    marginTop: dynamicSize(20),
    borderRadius: dynamicSize(10),
    marginBottom: dynamicSize(30),
    paddingVertical: dynamicSize(16),
    backgroundColor: COLORS.LIGHT_MAGENTA,
  },

  btntext: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS.WHITE,
  },

  imageContainer: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dynamicSize(50),
  },

  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
