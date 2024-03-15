import {
  View,
  Image,
  Platform,
  BackHandler,
  ImageBackground,
} from 'react-native';

import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import VideoPlayer from 'react-native-media-console';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createThumbnail} from 'react-native-create-thumbnail';
import {TouchableOpacity} from 'react-native-gesture-handler';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  openCamera,
  imagePicker,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  capitalizeFirstAlpha,
} from '../../Utils/helper';

import {
  profleSetupAction,
  uploadVideoAction,
  uploadImageAction,
  getGalleryListAction,
  deleteImgVideoAction,
} from '../../Redux/Action';

import {
  Button,
  MyText,
  FilePick,
  Touchable,
  GradientBackground,
  KeyboardAwareScroll,
} from '../../Component/commomComponent';

import styles from './styles';
import {COLORS} from '../../Utils/colors';
import {SvgIcon} from '../../Component/icons';
import {strings} from '../../localization/config';
import {dynamicSize} from '../../Utils/responsive';
import {MyDropDown} from '../../Component/dropDown';
import {IMAGE_URL} from '../../Services/Api/Common';
import {InputWithLabel} from '../../Component/Input';
import {defaultCountry} from '../../Utils/countryCode';
import {reset} from '../../Navigator/navigationHelper';
import commonStyle from '../../Component/commonStyles';
import DateTimePicker from '../../Component/datePicker';
import CountryCodePicker from '../../Component/countryCodePicker';
import SelectImageDialog from '../../Component/SelectImageDialog';
import {FONT_FAMILY} from '../../Utils/fontFamily';
import {validateUserName} from '../../Utils/validation';

const INPUT_TYPES = {NAME: 'name', ABOUT: 'about'};
const MEDIA_TYPE = {IMAGE: 'photo', VIDEO: 'video'};
const MIN_DOB_YEAR = 14;

const ProfileSetup = ({route, navigation}) => {
  const {
    params: {isEdit},
  } = route;

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const genderData = [
    {value: strings('editProfile.male'), id: 1},
    {value: strings('editProfile.female'), id: 2},
  ];

  const initialState = {
    name: '',
    gender: '',
    genderId: genderData[0].id,
    dob: null,
    country: defaultCountry.name,
    about: '',
    photos: [{}],
    videos: [{}],
    profilePic: {uri: ''},
    isProfilePicPress: false,
    maxDate: moment(
      moment().subtract(MIN_DOB_YEAR, 'Y').format('YYYY-MM-DD'),
    ).toDate(),
    updoadingDetails: false,
  };

  const initialError = {
    nameError: '',
    dobError: '',
    aboutError: '',
    photosError: '',
    videosError: '',
    countryError: '',
    profilePicError: '',
  };

  const [
    {
      name,
      gender,
      genderId,
      dob,
      profilePic,
      country,
      about,
      photos,
      videos,
      maxDate,
      updoadingDetails,
    },
    setState,
  ] = useState(initialState);

  const [
    {
      profilePicError,
      nameError,
      dobError,
      aboutError,
      photosError,
      countryError,
      videosError,
    },
    setError,
  ] = useState(initialError);

  const [refresh, setRefresh] = useState(false);

  const refRBSheet = useRef();

  const refImageDialog = useRef();
  const profilePicDialog = useRef();
  const isProfilePicPress = useRef();
  const cropViewRef = useRef();
  const scrollRef = useRef(null);
  const [galeryData, setGalleryData] = useState([]);
  const [countryPicker, setCountryPicker] = useState(false);
  const [mediaType, setMediaType] = useState();
  const [openEditor, setOpenEditor] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [showVideo, setShowVideo] = useState({});

  useFocusEffect(
    useCallback(() => {
      // dispatch(getUserProfileAction(() => {}));
    }, []),
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  const getGalleryData = userId => {
    dispatch(
      getGalleryListAction(
        {
          userId: userId,
        },
        x => {
          let tempPhoto = [];
          let tempVideo = [];
          x?.user.map(media => {
            if (media?.type == 'image') {
              tempPhoto.push({
                uri: IMAGE_URL + media?.file,
                id: media?._id,
                isUploaded: true,
              });
            } else {
              tempVideo.push({
                uri: IMAGE_URL + media?.file,
                id: media?._id,
                isUploaded: true,
              });
            }
          });

          setUploadedPhotos([...tempPhoto]);
          setUploadedVideos([...tempVideo]);
        },
      ),
    );
  };

  useEffect(() => {
    if (userLoginList?.user) {
      const {user} = userLoginList;
      getGalleryData(user?._id);
      setState(prevState => ({
        ...prevState,
        name: user?.name || '',
        gender: capitalizeFirstAlpha(user?.gender) || genderData[0].value,
        genderId: user?.gender
          ? user?.gender?.toLowerCase() == genderData?.[0]?.value?.toLowerCase()
            ? 1
            : 2
          : 1,
        country: user?.country || '',
        about: user?.bio || '',
        profilePic: {uri: IMAGE_URL + user?.profile},
        dob: moment(user?.DateOfBirth).format('YYYY-MM-DD'),
      }));
    }
  }, [userLoginList?.user]);

  const _onChangeText = type => text => {
    if (type == INPUT_TYPES.NAME) {
      setState(prevState => ({...prevState, name: text}));
      setError(preverror => ({...preverror, nameError: ''}));
    } else if (type == INPUT_TYPES.ABOUT) {
      setState(prevState => ({...prevState, about: text}));
      setError(preverror => ({...preverror, aboutError: ''}));
    }
  };

  const _onChangeDropdown = (value, index, data) => {
    setState(prevState => ({
      ...prevState,
      gender: value,
      genderId: data[index].id,
    }));
  };

  const _selectedDate = data => {
    setState(prevState => ({
      ...prevState,
      dob: moment(data).format('YYYY-MM-DD'),
    }));
    setError(preverror => ({...preverror, dobError: ''}));
  };

  const _openImagePicker = mediaType => () => {
    isProfilePicPress.current = false;
    setMediaType(mediaType);
    refImageDialog.current.open();
  };

  const _closeImagePicker = () => {
    isProfilePicPress.current = false;
    refImageDialog.current.close();
  };

  const _openProfilePicker = () => {
    isProfilePicPress.current = true;
    setMediaType(MEDIA_TYPE.IMAGE);
    profilePicDialog.current.open();
  };

  const _closeProfilePicker = () => {
    isProfilePicPress.current = false;
    profilePicDialog.current.close();
  };

  const _openCountryPicker = () => setCountryPicker(true);

  const _closeCountryPicker = () => setCountryPicker(false);

  const _getCountry = data => {
    setState(prevState => ({...prevState, country: data.name}));
    _closeCountryPicker();
  };

  const _takePhoto = async () => {
    try {
      const file = await openCamera(mediaType, true, true);
      if (isProfilePicPress.current) {
        setState(prevState => ({...prevState, profilePic: file}));
        setError(prevError => ({...prevError, profilePicError: ''}));
        openOverlay();
      } else {
        mediaType == MEDIA_TYPE.IMAGE
          ? photos.unshift(file)
          : videos.unshift(file);
        setRefresh(!refresh);
      }
      isProfilePicPress.current ? _closeImagePicker() : _closeProfilePicker();
      setError(prevError => ({...prevError, photosError: ''}));
    } catch (error) {
      _closeImagePicker();
      _closeProfilePicker();
    }
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker(mediaType, true, true);
      if (isProfilePicPress.current) {
        setState(prevState => ({...prevState, profilePic: file}));
        setError(prevError => ({...prevError, profilePicError: ''}));
        // openOverlay();
      } else {
        if (file.type.includes('video')) {
          const thumbnail = await createThumbnail({
            url: file?.uri,
            timeStamp: 10000,
          });
          file.thumbnail = thumbnail;
        }
        mediaType == MEDIA_TYPE.IMAGE
          ? photos.unshift(file)
          : videos.unshift(file);
        setRefresh(!refresh);
        isProfilePicPress.current ? _closeImagePicker() : _closeProfilePicker();
        setError(prevError => ({...prevError, photosError: ''}));
        // if (mediaType != MEDIA_TYPE.IMAGE) {
        //   const formData = new FormData();
        //   formData.append('video', {
        //     uri: file.uri,
        //     type: file.type,
        //     name: file.name,
        //   });
        //   dispatch(uploadVideoAction(formData, () => { }));
        // }
      }
      _closeImagePicker();
      _closeProfilePicker();
    } catch (error) {
      _closeImagePicker();
      _closeProfilePicker();
    }
  };

  const _validate = () => {
    let isValid = true;

    if (!profilePic.base64) {
      isValid = false;
      setError(preverror => ({
        ...preverror,
        profilePicError: strings('validation.uploadProfilePic'),
      }));
      return scrollRef.current.scrollToPosition(0, 0);
    } else setError(preverror => ({...preverror, profilePicError: ''}));
    if (
      !validateUserName(
        name,
        strings('validation.validName') ,strings('validation.requiredName'),
      ).status
    ) {
      isValid = false;
      setError(preverror => ({
        ...preverror,
        nameError: validateUserName(
          name,
          strings('validation.validName') ,strings('validation.requiredName'),
        ).error,
      }));
      return;
    }
    if (!dob) {
      alert('rrrrrr');
      isValid = false;
      setError(preverror => ({
        ...preverror,
        dobError: strings('validation.dobError'),
      }));
      return scrollRef.current.scrollToPosition(0, 0);
    }

    if (!country.trim().length) {
      isValid = false;
      setError(preverror => ({
        ...preverror,
        countryError: strings('validation.countryError'),
      }));
      return scrollRef.current.scrollToPosition(0, SCREEN_HEIGHT / 2);
    }

    if (genderId == 2) {
      if (!about) {
        isValid = false;
        setError(preverror => ({
          ...preverror,
          aboutError: strings('validation.aboutError'),
        }));
        return scrollRef.current.scrollToEnd();
      } else if (photos?.length < 3) {
        isValid = false;
        setError(preverror => ({
          ...preverror,
          photosError: strings('validation.imageUploadError'),
        }));
        return scrollRef.current.scrollToEnd();
      }
      // else if (videos?.length < 3) {
      //   isValid = false;
      //   setError(preverror => ({
      //     ...preverror,
      //     photosError: strings('validation.videoUploadError'),
      //   }));
      // }
    }


   if (isValid) _saveProfile();
  };

  const _saveProfile = () => {
    setState(prevState => ({...prevState, updoadingDetails: true}));

    const videoArray = [];
    videos?.map(item => {
      if (!!item?.uri) {
        const realPath =
          Platform.OS === 'ios' ? item.uri.replace('file://', '') : item?.uri;

        const data = {
          data: realPath,
          type: item.type,
          filename: item.name,
          name: 'video',
        };

        videoArray.push(data);
      }
    });

    if (videoArray.length) {
      videoArray.map((videoItem, index) => {
        dispatch(
          uploadVideoAction(videoItem, res => {
            if (videoArray.length - 1 === index) {
              navigateMainScreen();
            }
          }),
        );
      });
    } else {
      navigateMainScreen();
    }
  };

  const navigateMainScreen = () => {
    const photoMediaFile = photos
      ?.filter(each => each.base64)
      ?.map(item => item.base64);

    const param = {
      name,
      gender: gender.toLowerCase(),
      DateOfBirth: dob,
      country,
      file: profilePic.base64,
      multifile: photoMediaFile,
      bio: about,
    };

    dispatch(
      profleSetupAction(param, () => {
        setState(prevState => ({...prevState, updoadingDetails: false}));
        reset('MainTabNavigation');
      }),
    );
  };

  const deleteImgVideo = (type, index, id) => {
    dispatch(
      deleteImgVideoAction(id, res => {
        if (res) {
          const {user} = userLoginList;
          getGalleryData(user?._id);
        }
      }),
    );
  };

  const _updateProfileValidate = () => {
    let isValid = true;
    // if (!validateName(name).status) {
    //   isValid = false;
    //   if (validateName(name).error == validateStatus.required)
    //     setError(preverror => ({
    //       ...preverror,
    //       nameError: strings('validation.requireName'),
    //     }));
    //   else if (validateName(name).error == validateStatus.validateRegEx)
    //     setError(preverror => ({
    //       ...preverror,
    //       nameError: strings('validation.validName'),
    //     }));
    //   return scrollRef.current.scrollToPosition(0, 0);
    // } else setError(preverror => ({...preverror, nameError: ''}));

    if (genderId == 2) {
      if (!about) {
        isValid = false;
        setError(preverror => ({
          ...preverror,
          aboutError: strings('validation.aboutError'),
        }));
        return scrollRef.current.scrollToEnd();
      }
    }
    if (isValid) upDateProfile();
  };

  const upDateProfile = async () => {
    setState(prevState => ({...prevState, updoadingDetails: true}));

    const videoArray = [];
    videos?.map(item => {
      if (!!item?.uri) {
        const realPath =
          Platform.OS === 'ios' ? item.uri.replace('file://', '') : item?.uri;

        const data = {
          data: realPath,
          type: item.type,
          filename: item.name,
          name: 'video',
        };

        videoArray.push(data);
      }
    });

    if (videoArray.length) {
      videoArray.map((videoItem, index) => {
        dispatch(
          uploadVideoAction(videoItem, res => {
            if (videoArray.length - 1 === index) {
              updateApiCall();
            }
          }),
        );
      });
    } else {
      updateApiCall();
    }
  };

  const updateApiCall = () => {
    photos.map(item => {
      if (item?.base64) {
        dispatch(uploadImageAction(item?.base64, res => {}));
      }
    });

    const param = {
      name,
      country,
      bio: about,
    };
    if (profilePic.base64) {
      param['file'] = profilePic.base64;
    }

    dispatch(
      profleSetupAction(param, res => {
        setState(prevState => ({...prevState, updoadingDetails: false}));
        navigation.goBack();
      }),
    );
  };

  const _removeFile = (type, index) => {
    if (type == MEDIA_TYPE.IMAGE) {
      photos.splice(index, 1);
      setRefresh(!refresh);
    } else {
      videos.splice(index, 1);
      setRefresh(!refresh);
    }
  };

  const _renderImages = ({item, index}) => {
    return item?.uri ? (
      <ImageBackground
        source={{uri: item.uri}}
        imageStyle={styles.image}
        style={[
          styles.image,
          {marginHorizontal: index % 3 == 1 ? SCREEN_WIDTH * 0.025 : 0},
        ]}>
        <TouchableOpacity
          onPress={() => {
            setRefresh(true);
            item?.isUploaded
              ? deleteImgVideo(MEDIA_TYPE.IMAGE, index, item?.id)
              : _removeFile(
                  MEDIA_TYPE.IMAGE,
                  isEdit ? index - uploadedVideos.length : index,
                );
          }}
          // style={styles.cross}
          style={{
            alignSelf: 'flex-end',
            top: dynamicSize(-10),
          }}>
          <SvgIcon.CrossPink />
        </TouchableOpacity>
        {/* <Image source={} style={styles.image} /> */}
      </ImageBackground>
    ) : (
      <TouchableOpacity
        onPress={_openImagePicker(MEDIA_TYPE.IMAGE)}
        style={[
          commonStyle.plusFooter,
          {marginHorizontal: index % 3 == 1 ? SCREEN_WIDTH * 0.025 : 0},
        ]}>
        <SvgIcon.ProfilePlus />
      </TouchableOpacity>
    );
  };

  const _renderVideo = ({item, index}) => {
    return item?.uri ? (
      <>
        <View
          style={[
            commonStyle.plusFooter,
            {marginHorizontal: index % 3 == 1 ? SCREEN_WIDTH * 0.025 : 0},
          ]}>
          <Image
            key={index}
            source={{uri: item?.thumbnail?.path}}
            style={commonStyle.plusFooter}
          />
          <View
            style={{
              position: 'absolute',
              top: -10,
              right: 0,
              zIndex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setRefresh(true);
                item?.isUploaded
                  ? deleteImgVideo(MEDIA_TYPE.VIDEO, index, item?.id)
                  : _removeFile(
                      MEDIA_TYPE.VIDEO,
                      isEdit ? index - uploadedVideos.length : index,
                    );
              }}
              // style={styles.cross}
            >
              <SvgIcon.CrossPink />
            </TouchableOpacity>
          </View>
          <View style={commonStyle.playIcon}>
            <Touchable
              onPress={() => {
                setShowVideo(item);
                refRBSheet.current.open();
              }}>
              <AntDesign name={'play'} size={30} color={COLORS.WHITE} />
            </Touchable>
          </View>
          <View style={commonStyle.overlay} />
        </View>
      </>
    ) : (
      <TouchableOpacity
        onPress={_openImagePicker(MEDIA_TYPE.VIDEO)}
        style={[
          commonStyle.plusFooter,
          {marginHorizontal: index % 3 == 1 ? SCREEN_WIDTH * 0.025 : 0},
        ]}>
        <SvgIcon.ProfilePlus />
      </TouchableOpacity>
    );
  };

  function checkURL(url) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  return (
    <>
      <GradientBackground>
        <KeyboardAwareScroll scrollInnerRef={scrollRef}>
          <View style={styles.mainContainer}>
            <View style={styles.topImageContainer}>
              {!profilePic?.uri ? (
                <>
                  <Touchable
                    onPress={() => navigation.goBack()}
                    style={{
                      alignSelf: 'flex-start',
                      marginHorizontal: dynamicSize(20),
                    }}>
                    {isEdit ? <SvgIcon.BackArrowIcon /> : null}
                  </Touchable>
                  <View style={{width: SCREEN_WIDTH, alignItems: 'center'}}>
                    <MyText style={styles.title}>
                      {strings('editProfile.profileSetupUpperCase')}
                    </MyText>
                    <View style={[styles.imageContainer]}>
                      <SvgIcon.profilePlaceholder />
                      <Touchable
                        onPress={_openProfilePicker}
                        style={styles.absoluteCamera}>
                        <SvgIcon.cameraIcon />
                        <MyText style={styles.asterisk}>{'*'}</MyText>
                      </Touchable>
                    </View>
                  </View>
                </>
              ) : (
                <View
                  style={{
                    width: SCREEN_WIDTH,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{
                      uri: checkURL(userLoginList?.user?.coverImage)
                        ? IMAGE_URL + userLoginList?.user?.coverImage
                        : userLoginList?.user?.coverImage,
                    }}
                    style={[styles.overlayPic]}
                  />
                  {isEdit ? (
                    <Touchable
                      onPress={() => navigation.goBack()}
                      style={{
                        alignSelf: 'flex-start',
                        top: SCREEN_HEIGHT * 0.02,
                        marginHorizontal: dynamicSize(20),
                        position: 'absolute',
                        backgroundColor: 'grey',
                        padding: dynamicSize(10),
                        borderRadius: dynamicSize(20),
                      }}>
                      <SvgIcon.BackArrowIcon />
                    </Touchable>
                  ) : null}
                  <MyText style={styles.title}>
                    {isEdit ? '' : strings('editProfile.profileSetupUpperCase')}
                  </MyText>
                  <View style={[styles.imageContainer]}>
                    <Image
                      source={{uri: profilePic?.uri}}
                      style={styles.imagePic}
                    />
                    <Touchable
                      onPress={_openProfilePicker}
                      style={styles.absoluteCamera}>
                      <SvgIcon.cameraIcon />
                      <MyText style={styles.asterisk}>{'*'}</MyText>
                    </Touchable>
                  </View>
                  {/* <BlurView
                    style={[
                      styles.absolute,
                      {
                        height:
                          SCREEN_WIDTH / 2 +
                          SCREEN_HEIGHT * 0.1 +
                          useSafeAreaInsets().top,
                        zIndex: -10,
                      },
                    ]}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                  /> */}
                </View>
              )}
            </View>
            {profilePicError ? (
              <MyText
                style={[
                  styles.errorMessage,
                  {marginTop: SCREEN_HEIGHT * 0.02},
                ]}>
                {profilePicError}
              </MyText>
            ) : null}
            <View style={styles.lowerContainer}>
              <InputWithLabel
                label={strings('common.name')}
                isRequired
                error={nameError}
                value={name}
                labelStyle={{fontFamily: FONT_FAMILY.POPPINS_MEDIUM}}
                onChangeText={_onChangeText(INPUT_TYPES.NAME)}
              />
              {isEdit ? (
                <InputWithLabel
                  editable={false}
                  label={`${strings('editProfile.gender')}`}
                  isRequired
                  value={gender}
                  labelStyle={{fontFamily: FONT_FAMILY.POPPINS_MEDIUM}}
                  style={{
                    marginTop: dynamicSize(15),
                  }}
                />
              ) : (
                <MyDropDown
                  label={`${strings('editProfile.gender')}`}
                  data={genderData}
                  mainContainerStyle={styles.marginTop}
                  onChangeText={_onChangeDropdown}
                  placeholder={'Select Gender'}
                />
              )}
              {isEdit ? (
                <InputWithLabel
                  editable={false}
                  labelStyle={{fontFamily: FONT_FAMILY.POPPINS_MEDIUM}}
                  label={strings('editProfile.dateOfBirth')}
                  isRequired
                  value={dob}
                  style={{
                    marginTop: dynamicSize(15),
                  }}
                />
              ) : (
                <DateTimePicker
                  isRequired
                  label={strings('editProfile.dateOfBirth')}
                  value={dob}
                  selectedDate={_selectedDate}
                  mainContainerStyle={styles.marginTop}
                  maxDate={maxDate}
                />
              )}
              {dobError ? (
                <MyText style={[styles.errorMessage]}>{dobError}</MyText>
              ) : null}
              <Touchable
                disabled={isEdit}
                onPress={_openCountryPicker}
                style={styles.countryPicker}>
                <View style={styles.countryContainer}>
                  <MyText style={styles.label}>
                    {strings('editProfile.country')}
                  </MyText>
                  <MyText style={styles.countryName}>{country}</MyText>
                </View>
                <SvgIcon.downTriangle />
              </Touchable>
              <InputWithLabel
                label={strings('editProfile.about')}
                isRequired={genderId == 2}
                error={aboutError}
                value={about}
                multiline
                textInputStyle={styles.about}
                style={styles.marginTop}
                labelStyle={{fontFamily: FONT_FAMILY.POPPINS_MEDIUM}}
                onChangeText={_onChangeText(INPUT_TYPES.ABOUT)}
              />
              <FilePick
                onPress={_openImagePicker(MEDIA_TYPE.IMAGE)}
                isRequired={genderId == 2}
                style={styles.fileContainer}
                title={strings('editProfile.photos')}
                subtitle={strings('editProfile.upload_pic_description')}
                data={isEdit ? [...uploadedPhotos, ...photos] : photos}
                renderItem={_renderImages}
              />
              {photosError ? (
                <MyText style={[styles.errorMessage]}>{photosError}</MyText>
              ) : null}
              <FilePick
                onPress={_openImagePicker(MEDIA_TYPE.VIDEO)}
                //isRequired={genderId == 2}
                style={styles.fileContainer}
                title={strings('editProfile.videos')}
                subtitle={strings('editProfile.upload_video_description')}
                data={isEdit ? [...uploadedVideos, ...videos] : videos}
                renderItem={_renderVideo}
              />
              {videosError ? (
                <MyText style={[styles.errorMessage]}>{videosError}</MyText>
              ) : null}
              <Button
                indicator={updoadingDetails}
                onPress={isEdit ? _updateProfileValidate : _validate}
                buttonStyle={styles.buttonStyle}
                isDark
                label={strings('editProfile.save')}
                width={'75%'}
              />
            </View>
            <CountryCodePicker
              isVisible={countryPicker}
              getCountry={_getCountry}
              closeCountryModal={_closeCountryPicker}
            />
            <SelectImageDialog
              key="imageRef"
              isVideo={mediaType == 'video'}
              ref={refImageDialog}
              onPressTakePhoto={_takePhoto}
              onPressChooseFromLibrary={_chooseFromLib}
              onPressCancel={_closeImagePicker}
            />
            <SelectImageDialog
              key="fileRef"
              isVideo={mediaType == 'video'}
              ref={profilePicDialog}
              onPressTakePhoto={_takePhoto}
              onPressChooseFromLibrary={_chooseFromLib}
              onPressCancel={_closeImagePicker}
            />
          </View>
        </KeyboardAwareScroll>
      </GradientBackground>
      <RBSheet
        ref={refRBSheet}
        openDuration={250}
        height={SCREEN_HEIGHT * 0.4}
        customStyles={sheetCustomStyles}>
        <VideoPlayer
          disableBack={true}
          disableFullscreen={true}
          source={{uri: showVideo?.uri}}
        />
      </RBSheet>
    </>
  );
};

export default ProfileSetup;

const sheetCustomStyles = {
  wrapper: {
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.TRANSPARENT,
  },
};
