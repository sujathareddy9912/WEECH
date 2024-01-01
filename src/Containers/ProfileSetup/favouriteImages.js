import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LodingIndicator from '../../Component/LoadingIndicator/LoadingIndicator';
import Icon from '../../Component/Icons/Icon';
import {COLORS} from '../../Utils/colors';
import {imagePicker, openCamera} from '../../Utils/helper';
import SelectImageDialog from '../../Component/SelectImageDialog';
import {SvgIcon} from '../../Component/icons';
import {strings} from '../../localization/config';
import {Button} from '../../Component/commomComponent';
import {reset} from '../../Navigator/navigationHelper';
import {showMessage} from 'react-native-flash-message';
import {
  UPDATE_PROFILE_IMAGE_REQUEST,
  GET_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_RESET,
  GET_PROFILE_IMAGE_RESET
} from '../../ActionConstant/profile.constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  isEdit as actionEdit,
  isDone as actionDone,
} from '../../Actions/Profile/profile.actions';
import {handleError} from '../../Utils/handlErrors';

const {height, width} = Dimensions.get('window');

function FavouriteImages(props) {
  const favouriteImageRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reducer = useSelector(state => state.profile);

  const {
    appgender,
    updateProfileImageLoading,
    updateProfileImageSuccess,
    updateProfileImageError,
    getProfileImageLoading,
    getProfileImageSuccess,
    getProfileImageError,
    getProfileSuccess,
    isEdit,
    isDone,
  } = reducer;

  const [userImages, setUserImages] = useState([{}]);
  const [userImagesError, setUserImagesError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSkip, setSkip] = useState(false);

  useEffect(() => {
    if (getProfileSuccess) {
      dispatch({
        type: GET_PROFILE_IMAGE_REQUEST,
        payload: getProfileSuccess.user._id,
      });
    }
  }, [getProfileSuccess]);

  useEffect(() => {
    setLoading(updateProfileImageLoading || getProfileImageLoading);
  }, [updateProfileImageLoading, getProfileImageLoading]);

  useEffect(() => {
    if (getProfileImageSuccess) {
      let images = getProfileImageSuccess.user.map(item => ({
        uri: `https://api.weecha.uk/v1/uploads/${item.file}`,
      }));
      images = [...images, userImages];
      setUserImages(images);
    }
  }, [getProfileImageSuccess]);

  useEffect(() => {
    if (getProfileImageError) {
      handleError(getProfileImageError.error.message);
    }
  }, [getProfileImageError]);

  useEffect(() => {
    if (updateProfileImageSuccess) {
      if (isEdit) {
        showMessage({
          description: updateProfileImageSuccess.message,
          message: 'Upload Image',
          type: 'success',
          icon: 'success',
        });
        dispatch({
          type: GET_PROFILE_IMAGE_REQUEST,
          payload: getProfileSuccess?.user._id,
        });
      } else {
        isSkip ? saveAndSkip() : jumpToNext();
      }
    }

    return () => {
      setUserImages([{}])
     // dispatch({type: GET_PROFILE_IMAGE_RESET});
      dispatch({type: UPDATE_PROFILE_IMAGE_RESET});
    };
  }, [updateProfileImageSuccess]);

  useEffect(() => {
    if (updateProfileImageError) {
      handleError(updateProfileImageError.error.message);
    }
  }, [updateProfileImageError]);

  const saveAndSkip = () => {
    if (isDone?.includes('profile')) {
      reset('MainTabNavigation');
    } else {
      showMessage({
        duration: 6000,
        description: 'Complete Profile',
        message: 'Please fill the "Profile Details"',
        type: 'info',
        icon: 'info',
      });
    }
  };

  const jumpToNext = () => {
    dispatch(actionDone('favouriteImages'));
    props.jumpTo('favouriteVideos');
  };

  function _openImagePicker() {
    favouriteImageRef.current.open();
  }

  const _closeImagePicker = () => {
    favouriteImageRef.current.close();
  };

  const favouriteInfoError = (requiredLength, favouriteItem, errorMessage) => {
    return favouriteItem && favouriteItem.length > requiredLength
      ? null
      : errorMessage;
  };

  const favouriteMedia = media => {
    let item = new FormData();
    for (let mediaItem of media) {
      if (mediaItem.base64) {
        const image = {
          type: mediaItem.type,
          name: mediaItem.name,
          uri: mediaItem.uri,
        };
        item.append('image', image);
      }
    }
    
    return item;
  };

  const imageValidation = imagesArray => {
    const count = appgender === 'female' ? 3 : 1;
    setUserImagesError(
      favouriteInfoError(
        count,
        imagesArray,
        strings(
          appgender === 'female'
            ? 'validation.imageUploadError '
            : 'validation.videoMaleUploadError',
        ),
      ),
    );
  };

  const addImages = file => {
    let images = [...userImages];
    images.unshift(file);
    imageValidation(images);
    setUserImages(images);
    _closeImagePicker();
  };

  function removeImages(index) {
    let images = [...userImages];
    images.splice(index, 1);
    imageValidation(images);
    setUserImages(images);
    _closeImagePicker();
  }

  const _takePhoto = async () => {
    try {
      const file = await openCamera('photo', true, true);
      addImages(file);
    } catch (error) {
      _closeImagePicker();
    }
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker('photo', true, true);
      addImages(file);
    } catch (error) {
      _closeImagePicker();
    }
  };

  // const onPressBack = () => {
  //   dispatch(actionEdit(false));
  //   navigation.goBack();
  // };

  const onClickSave = () => {
    const count = appgender === 'female' ? 3 : 1;
    const piError = favouriteInfoError(
      count,
      userImages,
      strings(
        appgender === 'female'
          ? 'validation.imageUploadError'
          : 'validation.videoMaleUploadError',
      ),
    );

    if (piError) {
      setUserImagesError(piError);
      return;
    }

   
    // alert(userfavoriteImages)
    // const iError = favouriteInfoError(
    //   count,
    //   userfavoriteImages,
    //   strings(
    //     appgender === 'female'
    //       ? 'validation.imageUploadError'
    //       : 'validation.imageMaleUploadError',
    //   ),
    // );

    // if (iError) {
    //   setUserImagesError(iError);
    //   return;
    // }

    setUserImagesError(null);
    let userfavoriteImages = favouriteMedia(userImages);

    dispatch({
      type: UPDATE_PROFILE_IMAGE_REQUEST,
      payload: userfavoriteImages,
    });
  };

  const _renderImages = ({item, index}) => {
    if (item && item?.uri) {
      return (
        <ImageBackground
          source={{uri: item?.uri}}
          style={styles.profilePhotos(index)}
          imageStyle={styles.profilePhotosStyle}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              removeImages(index);
            }}>
            <Icon
              origin="AntDesign"
              name="close"
              size={12}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
        </ImageBackground>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.profilePhotos(index), styles.addBtn]}
          onPress={_openImagePicker}>
          <SvgIcon.ProfilePlus />
        </TouchableOpacity>
      );
    }
  };
  return (
    <>
      {/* <GradientBackground>
       
        <TouchableOpacity
          style={[styles.backBtn, {top: useSafeAreaInsets().top}]}
          onPress={onPressBack}>
          <Icon
            origin="AntDesign"
            name="arrowleft"
            size={24}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Favourite Images</Text> */}
      <LodingIndicator visible={loading} />
      <ScrollView>
        <View style={styles.seperator}>
          {/* <Text style={styles.title}>
            {strings('editProfile.photos')}
            {gender === 'female' && <Text style={styles.asterick}>*</Text>}
          </Text> */}
          <Text style={styles.subtitle}>
            {strings('editProfile.upload_pic_description')}
          </Text>

          {userImagesError && (
            <Text style={styles.error}>{userImagesError}</Text>
          )}
          {userImages && userImages.length > 0 && (
            <FlatList
              data={userImages}
              keyExtractor={(item, index) => `${item}_${index}`}
              renderItem={_renderImages}
              numColumns={3}
              scrollEnabled={false}
            />
          )}
          <SelectImageDialog
            key="imageRef"
            isVideo={false}
            ref={favouriteImageRef}
            onPressTakePhoto={_takePhoto}
            onPressChooseFromLibrary={_chooseFromLib}
            onPressCancel={_closeImagePicker}
          />
        </View>
        <Button
          // indicator={updoadingDetails}
          onPress={() => {
            setSkip(false);
            onClickSave();
          }}
          buttonStyle={styles.buttonStyle}
          isDark
          label={isEdit ? 'Save' : 'Continue'}
          width={'75%'}
        />

        {appgender !== 'female' && !isEdit && (
          <Button
            onPress={() => {
              setSkip(true);
              onClickSave();
            }}
            buttonStyle={styles.buttonStyle}
            isDark
            label={'Save and Skip'}
            width={'75%'}
          />
        )}
      </ScrollView>
      {/* </GradientBackground> */}
    </>
  );
}

export default FavouriteImages;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.WHITE,
    alignSelf: 'center',
    marginBottom: 16,
  },
  backBtn: {
    position: 'absolute',
    left: width * 0.03,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  seperator: {
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.03,
  },
  profilePhotos: index => ({
    height: width * 0.3,
    width: width * 0.3,
    marginRight: (index + 1) % 3 === 0 ? 0 : width * 0.02,
    marginTop: width * 0.02,
  }),
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.TRANSPARENT_LIGHT_BLACK,
    borderRadius: 16,
  },
  profilePhotosStyle: {
    height: width * 0.3,
    width: width * 0.3,
    borderRadius: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: -4,
    right: 0,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: COLORS.DARK_RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.VIOLET,
    fontSize: 14,
  },
  error: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.DARK_RED,
    marginVertical: 2,
  },
  asterick: {
    color: COLORS.DARK_RED,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: height * 0.05,
  },
});
