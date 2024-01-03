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
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../Component/Icons/Icon';
import {COLORS} from '../../Utils/colors';
import {imagePicker, openCamera} from '../../Utils/helper';
import SelectImageDialog from '../../Component/SelectImageDialog';
import {SvgIcon} from '../../Component/icons';
import {createThumbnail} from 'react-native-create-thumbnail';
import {strings} from '../../localization/config';
import {showMessage} from 'react-native-flash-message';
import {reset} from '../../Navigator/navigationHelper';
import GradientBackground from '../../Component/GardientBackground/GardientBackGround';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../Component/commomComponent';
import {useSelector, useDispatch} from 'react-redux';
import {
  GET_PROFILE_VIDEO_REQUEST,
  UPDATE_PROFILE_VIDEO_RESET,
  UPDATE_PROFILE_VIDEO_REQUEST,
  DELETE_PROFILE_IMAGE_VIDEO_RESET
} from '../../ActionConstant/profile.constant';
import RBSheet from 'react-native-raw-bottom-sheet';
import Video from 'react-native-video';
import {dynamicSize} from '../../Utils/responsive';
import {
  //isEdit as actionEdit,
  isDone as actionDone,
} from '../../Actions/Profile/profile.actions';
import {handleError} from '../../Utils/handlErrors';
import LodingIndicator from '../../Component/LoadingIndicator/LoadingIndicator';

const {height, width} = Dimensions.get('window');

function FavouriteVideos() {
  const favouriteVideoRef = useRef();

  const refRBSheet = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reducer = useSelector(state => state.profile);

  const {
    appgender,
    updateProfileVideoLoading,
    updateProfileVideoSuccess,
    updateProfileVideoError,
    getProfileVideoLoading,
    getProfileVideoSuccess,
    getProfileVideoError,
    deleteProfileImageVideoLoading,
    deleteProfileImageVideoSuccess,
    deleteProfileImageVideoError,
    getProfileSuccess,
    isEdit,
    isDone,
  } = reducer;

  const [loading, setLoading] = useState(false);
  const [userVideos, setUserVideos] = useState([{}]);
  const [userVidoesError, setUserVideosError] = useState(null);
  const [isSkip, setSkip] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (getProfileSuccess) {
      dispatch({
        type: GET_PROFILE_VIDEO_REQUEST,
        payload: getProfileSuccess.user._id,
      });
    }
  }, [getProfileSuccess]);

  useEffect(() => {
    setLoading(updateProfileVideoLoading || getProfileVideoLoading || deleteProfileImageVideoLoading);
  }, [updateProfileVideoLoading, getProfileVideoLoading,deleteProfileImageVideoLoading]);

  useEffect(() => {
    if (getProfileVideoSuccess) {
      let videos = getProfileVideoSuccess.user.map(item => ({
        uri: `https://api.weecha.uk/v1/uploads/${item.file}`,
        id: item._id,
      }));
      videos = [...videos, userVideos];
      setUserVideos(videos);
    }
  }, [getProfileVideoSuccess]);

  useEffect(() => {
    if (getProfileVideoError) {
      handleError(getProfileVideoError.error.message);
    }
  }, [getProfileVideoError]);

  useEffect(() => {
    if (updateProfileVideoSuccess) {
      if (isEdit) {
        showMessage({
          description: updateProfileVideoSuccess.message,
          message: 'Upload Image',
          type: 'success',
          icon: 'success',
        });
        dispatch({
          type: GET_PROFILE_VIDEO_REQUEST,
          payload: getProfileSuccess?.user._id,
        });
      } else {
        isSkip ? saveAndSkip() : jumpToNext();
      }
    }

    return () => {
      setUserVideos([{}])
     // dispatch({type: GET_PROFILE_VIDEO_RESET});
      dispatch({type: UPDATE_PROFILE_VIDEO_RESET});
    };
  }, [updateProfileVideoSuccess]);

  useEffect(() => {
    if (updateProfileVideoError) {
      handleError(updateProfileVideoError.error.message);
    }
  }, [updateProfileVideoError]);

  useEffect(() => {
    if (deleteProfileImageVideoSuccess) {
      showMessage({
        description: deleteProfileImageVideoSuccess.message,
        message: 'Delete Image',
        type: 'success',
        icon: 'success',
      });
      dispatch({
        type: GET_PROFILE_VIDEO_REQUEST,
        payload: getProfileSuccess?.user._id,
      });
    }

    return () => {
      dispatch({type: DELETE_PROFILE_IMAGE_VIDEO_RESET});
    };
  }, [deleteProfileImageVideoSuccess]);

  useEffect(() => {
    if (deleteProfileImageVideoError) {
      handleError(deleteProfileImageVideoError.error.message);
    }
  }, [deleteProfileImageVideoError]);

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

  const jumpToNext = () => {
    dispatch({type:DELETE_PROFILE_IMAGE_VIDEO_RESET})
    dispatch(actionDone('favouriteVideos'));
    reset('MainTabNavigation');
    
  };

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
            ? 'validation.videoUploadError'
            : 'validation.videoMaleUploadError',
        ),
      ),
    );
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
        item.append('video', image);
      }
    }

    return item;
  };

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

  // const onPressBack = () => {
  //   navigation.goBack();
  // };

  const onClickSave = () => {
    const count = appgender === 'female' ? 3 : 1;
    const piError = favouriteInfoError(
      count,
      userVideos,
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
    setUserVideosError(null);
    let userfavoriteVideos = favouriteMedia(userVideos);

    // const vError = favouriteInfoError(
    //   count,
    //   userfavoriteVideos,
    //   strings(
    //     appgender === 'female'
    //       ? 'validation.videoUploadError'
    //       : 'validation.videoMaleUploadError',
    //   ),
    // );

    // if (vError) {
    //   setUserVideosError(vError);
    //   return;
    // }

    dispatch({
      type: UPDATE_PROFILE_VIDEO_REQUEST,
      payload: userfavoriteVideos,
    });
  };

  const deleteImages = id => {
    if (id) {
      const requestData = {
        id: id,
      };
      dispatch({
        type: DELETE_PROFILE_IMAGE_VIDEO_REQUEST,
        payload: requestData,
      });
    }
  };

  const onLoadStart = () => {
    setOpacity(1);
  };

  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = ({isBuffering}) => {
    setOpacity(isBuffering ? 1 : 0);
  };

  const _renderVideos = ({item, index}) => {
    if (item && item?.uri) {
      return (
        <>
          {item.thumbnail ? (
            <ImageBackground
              source={{uri: item.thumbnail}}
              style={styles.profilePhotos(index)}
              imageStyle={styles.profilePhotosStyle}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  deleteImages(item.id)
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
          ) : (
            <View style={styles.profilePhotos(index)}>
              <TouchableOpacity
                style={styles.playIcon}
                onPress={() => {
                  setVideoUri(item.uri);
                  refRBSheet.current.open();
                }}>
                <Icon
                  origin="AntDesign"
                  name={'play'}
                  size={30}
                  color={COLORS.WHITE}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
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
      <LodingIndicator visible={loading} />
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
      <RBSheet
        ref={refRBSheet}
        openDuration={250}
        height={height}
        customStyles={sheetCustomStyles}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={[
              styles.videoContainer,
              {paddingBottom: useSafeAreaInsets().bottom},
            ]}>
            <TouchableOpacity
              style={styles.videoCloseBtn}
              onPress={() => {
                refRBSheet.current.close();
              }}>
              <Icon
                origin="AntDesign"
                name="close"
                size={16}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
              <Video
                source={{uri: videoUri}}
                style={styles.video}
                repeat={false}
                // paused={paused}
                onBuffer={onBuffer}
                onLoadStart={onLoadStart}
                onLoad={onLoad}
                bufferConfig={{
                  minBufferMs: 10000,
                  maxBufferMs: 30000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                }}
              />
            </TouchableWithoutFeedback>
            <ActivityIndicator
              animating
              size="large"
              color={COLORS.PINK}
              style={[styles.activityIndicator, {opacity: opacity}]}
            />
          </View>
        </View>
      </RBSheet>
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
  overlay: {
    position: 'absolute',
    backgroundColor: COLORS.BLACK + '70',
    width: width / 4,
    height: width / 4,
    borderRadius: dynamicSize(10),
  },
  playIcon: {
    flex: 1,
    backgroundColor: COLORS.GALLERY_PLACEHOLDER_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  videoCloseBtn: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 8,
    marginVertical: 4,
  },
  video: {
    width: width * 0.8,
    height: width * 0.55,
    backgroundColor: COLORS.BLACK,
    alignSelf: 'center',
  },
  videoContainer: {
    width: width * 0.8,
    height: width * 0.7,
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
  },
  activityIndicator: {
    position: 'absolute',
    left: (width * 0.7) / 2,
    top: (width * 0.65) / 2,
  },
});

const sheetCustomStyles = {
  wrapper: {
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    width: width,
    backgroundColor: COLORS.TRANSPARENT,
  },
};
