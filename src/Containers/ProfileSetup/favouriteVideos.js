import React, {useRef,forwardRef} from 'react';
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
import { createThumbnail } from 'react-native-create-thumbnail';
import {strings} from '../../localization/config';

const {height, width} = Dimensions.get('window');

function FavouriteVideos({userVideos, setUserVideos, favouriteVidoesError,isRequired,validation},ref) {
  const favouriteVideoRef = useRef();

  async function CreateThumbnail(file) {
    if (file && file.uri) {
      try {
        const response = await createThumbnail({
          url: file.uri,
          timeStamp: 100,
          format: 'png'
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

  const addImages = file => {
    let videos = [...userVideos];
    videos.unshift(file);
    validation(videos);
    setUserVideos(videos);
    _closeImagePicker();
  };

  function removeImages(index) {
    let videos = [...userVideos];
    videos.splice(index, 1);
    validation(videos);
    setUserVideos(videos);
    _closeImagePicker();
  }

  const _takePhoto = async () => {
    try {
      const file = await openCamera('video', true, true);
      const thumbnail = await CreateThumbnail(file);
      addImages({...file,thumbnail:thumbnail.path});
    } catch (error) {
      _closeImagePicker();
    }
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker('video', true, true);
      const thumbnail = await CreateThumbnail(file);
      addImages({...file,thumbnail:thumbnail.path});
    } catch (error) {
      _closeImagePicker();
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
    <View style={styles.seperator} ref={ref}>
      <Text style={styles.title}>
        {strings('editProfile.videos')}{' '}
        {isRequired && <Text style={styles.asterick}>*</Text>}
      </Text>
      <Text style={styles.subtitle}>
        {strings(`editProfile.upload_video_description`)}
      </Text>
      {favouriteVidoesError && (
        <Text style={styles.error}>{favouriteVidoesError}</Text>
      )}
      {userVideos && userVideos.length > 0 && (
        <FlatList
          data={userVideos}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={_renderVideos}
          numColumns={3}
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
  );
}

export default forwardRef(FavouriteVideos);

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
