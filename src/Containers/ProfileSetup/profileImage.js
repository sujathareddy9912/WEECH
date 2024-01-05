import React, {useRef, forwardRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from '../../Component/Icons/Icon';
import {COLORS} from '../../Utils/colors';
import {imagePicker, openCamera} from '../../Utils/helper';
import SelectImageDialog from '../../Component/SelectImageDialog';

const {height, width} = Dimensions.get('window');

function ProfileImage({profilePic, setProfilePic, profileImageError}, ref) {
  const profileImageRef = useRef();
 // console.log(profilePic.uri);
  const _closeImagePicker = () => {
    profileImageRef.current.close();
  };

  const _takePhoto = async () => {
    try {
      const file = await openCamera('photo', true, true);
      setProfilePic(file);
      _closeImagePicker();
    } catch (error) {
      _closeImagePicker();
    }
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker('photo', true, true);
      setProfilePic(file);
      _closeImagePicker();
    } catch (error) {
      _closeImagePicker();
    }
  };

  return (
    <View
      ref={ref}
      style={[
        styles.profileImageContainer,
        {
          height: height * 0.4 - useSafeAreaInsets().top,
        },
      ]}>
      <ImageBackground
        source={
          profilePic && profilePic.uri
            ? {uri: profilePic.uri}
            : require('../../Assets/Images/avatar.png')
        }
        resizeMode="cover"
        style={styles.profileBgImage}
        imageStyle={styles.profileImage}>
        <TouchableOpacity
          style={styles.cameraIconBtn}
          onPress={() => {
            profileImageRef.current.open();
          }}>
          <Icon origin="Entypo" name="camera" size={32} color={COLORS.WHITE} />
          <Text style={styles.cameraAstrick}>*</Text>
        </TouchableOpacity>
      </ImageBackground>

      {profileImageError && (
        <Text style={styles.error}>{profileImageError}</Text>
      )}
      <SelectImageDialog
        key="imageRef"
        isVideo={false}
        ref={profileImageRef}
        onPressTakePhoto={_takePhoto}
        onPressChooseFromLibrary={_chooseFromLib}
        onPressCancel={_closeImagePicker}
      />
    </View>
  );
}

export default forwardRef(ProfileImage);

const styles = StyleSheet.create({
  profileImageContainer: {
    width: width,
  },
  profileBgImage: {
    alignSelf: 'center',
    marginTop: 24,
    height: height * 0.2,
    width: height * 0.2,
    borderRadius: height * 0.1,
  },
  profileImage: {
    height: height * 0.2,
    width: height * 0.2,
    borderRadius: height * 0.1,
  },
  cameraIconBtn: {
    position: 'absolute',
    bottom: -8,
    right: 8,
    flexDirection: 'row',
  },
  cameraAstrick: {
    fontSize: 32,
    color: COLORS.DARK_RED,
    marginLeft: 4,
    marginTop: -8,
  },
  error: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.DARK_RED,
    marginTop: 16,
    alignSelf: 'center',
  },
});
