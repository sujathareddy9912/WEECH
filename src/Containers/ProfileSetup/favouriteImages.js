import React, {useRef, forwardRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from '../../Component/Icons/Icon';
import {COLORS} from '../../Utils/colors';
import {imagePicker, openCamera} from '../../Utils/helper';
import SelectImageDialog from '../../Component/SelectImageDialog';
import {SvgIcon} from '../../Component/icons';
import {strings} from '../../localization/config';

const {height, width} = Dimensions.get('window');

function FavouriteImages(
  {userImages, setUserImages, favouriteImagesError, isRequired, validation},
  ref,
) {
  const favouriteImageRef = useRef();

  function _openImagePicker() {
    favouriteImageRef.current.open();
  }

  const _closeImagePicker = () => {
    favouriteImageRef.current.close();
  };

  const addImages = file => {
    let images = [...userImages];
    images.unshift(file);
    validation(images);
    setUserImages(images);
    _closeImagePicker();
  };

  function removeImages(index) {
    let images = [...userImages];
    images.splice(index, 1);
    validation(images);
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
    <View style={styles.seperator} ref={ref}>
      <Text style={styles.title}>
        {strings('editProfile.photos')}
        {isRequired && <Text style={styles.asterick}>*</Text>}
      </Text>
      <Text style={styles.subtitle}>
        {strings('editProfile.upload_pic_description')}
      </Text>

      {favouriteImagesError && (
        <Text style={styles.error}>{favouriteImagesError}</Text>
      )}
      {userImages && userImages.length > 0 && (
        <FlatList
          data={userImages}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={_renderImages}
          numColumns={3}
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
  );
}

export default forwardRef(FavouriteImages);

const styles = StyleSheet.create({
  seperator: {
    marginTop: height * 0.03,
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
});
