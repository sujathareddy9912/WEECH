import React, {useRef, useState} from 'react';
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
import Icon from '../../Component/Icons/Icon';
import {COLORS} from '../../Utils/colors';
import {imagePicker, openCamera} from '../../Utils/helper';
import SelectImageDialog from '../../Component/SelectImageDialog';
import {SvgIcon} from '../../Component/icons';
import {createThumbnail} from 'react-native-create-thumbnail';
import {strings} from '../../localization/config';
import GradientBackground from '../../Component/GardientBackground/GardientBackGround';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../Component/commomComponent';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

function FavouriteVideos() {
  const favouriteVideoRef = useRef();
  const navigation = useNavigation();

  const reducer = useSelector(state => state.profile);

  const {appgender, isEdit} = reducer;

  const [loading, setLoading] = useState(false);
  const [userVideos, setUserVideos] = useState([{}]);
  const [userVidoesError, setUserVideosError] = useState(null);

  async function CreateThumbnail(file) {
    if (file && file.uri) {
      try {
        const response = await createThumbnail({
          url: file.uri,
          timeStamp: 100,
          format: 'png',
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }

  function _openImagePicker() {
    favouriteVideoRef.current.open();
  }

  const _closeImagePicker = () => {
    favouriteVideoRef.current.close();
  };

  const favouriteInfoError = (requiredLength, favouriteItem, errorMessage) => {
    return favouriteItem && favouriteItem.length > requiredLength
      ? null
      : errorMessage;
  };

  const videoValidation = videoArray => {
    const count = appgender === 'female' ? 3 : 1;
    setUserVideosError(
      favouriteInfoError(
        count,
        videoArray,
        strings(
          appgender === 'female'
            ? 'validation.imageVideoError'
            : 'validation.imageMaleVideoError',
        ),
      ),
    );
  };

  const addImages = file => {
    let videos = [...userVideos];
    videos.unshift(file);
    videoValidation(videos);
    setUserVideos(videos);
    _closeImagePicker();
  };

  function removeImages(index) {
    let videos = [...userVideos];
    videos.splice(index, 1);
    videoValidation(videos);
    setUserVideos(videos);
    _closeImagePicker();
  }

  const _takePhoto = async () => {
    try {
      const file = await openCamera('video', true, true);
      const thumbnail = await CreateThumbnail(file);
      addImages({...file, thumbnail: thumbnail.path});
    } catch (error) {
      _closeImagePicker();
    }
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker('video', true, true);
      const thumbnail = await CreateThumbnail(file);
      addImages({...file, thumbnail: thumbnail.path});
    } catch (error) {
      _closeImagePicker();
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onClickSave = () => {
    const count = appgender === 'female' ? 3 : 1;
    const piError = favouriteInfoError(
      count,
      userImages,
      strings(
        appgender === 'female'
          ? 'validation.videoUploadError'
          : 'validation.videoMaleUploadError',
      ),
    );

    if (piError) {
      setUserVideosError(piError);
      return;
    }
  };

  const _renderVideos = ({item, index}) => {
    if (item && item?.uri) {
      return (
        <ImageBackground
          source={{uri: item.thumbnail}}
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
      {/* <GradientBackground> */}
      {/* <TouchableOpacity
          style={[styles.backBtn, {top: useSafeAreaInsets().top}]}
          onPress={onPressBack}>
          <Icon
            origin="AntDesign"
            name="arrowleft"
            size={24}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Favourite Videos</Text> */}
      <ScrollView>
        <View style={styles.seperator}>
          {/* <Text style={styles.title}>
            {strings('editProfile.videos')}{' '}
            {gender === 'female' && <Text style={styles.asterick}>*</Text>}
          </Text> */}
          <Text style={styles.subtitle}>
            {strings(`editProfile.upload_video_description`)}
          </Text>
          {userVidoesError && (
            <Text style={styles.error}>{userVidoesError}</Text>
          )}
          {userVideos && userVideos.length > 0 && (
            <FlatList
              data={userVideos}
              keyExtractor={(item, index) => `${item}_${index}`}
              renderItem={_renderVideos}
              numColumns={3}
              scrollEnabled={false}
            />
          )}
          <SelectImageDialog
            key="imageRef"
            isVideo={false}
            ref={favouriteVideoRef}
            onPressTakePhoto={_takePhoto}
            onPressChooseFromLibrary={_chooseFromLib}
            onPressCancel={_closeImagePicker}
          />
        </View>

        <Button
          // indicator={updoadingDetails}
          onPress={onClickSave}
          buttonStyle={styles.buttonStyle}
          isDark
          label={isEdit ? 'Save' : 'Continue'}
          width={'75%'}
        />
      </ScrollView>
      {/* </GradientBackground> */}
    </>
  );
}

export default FavouriteVideos;

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
