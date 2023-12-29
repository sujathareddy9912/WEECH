import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground, StatusBar, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import Geolocation from 'react-native-geolocation-service';

import styles from './styles';
import { COLORS } from '../../Utils/colors';
import Input from '../../Component/Input';
import { SvgIcon } from '../../Component/icons';
import { strings } from '../../localization/config';
import { dynamicSize } from '../../Utils/responsive';
import { STREAM_TYPE } from '../../Utils/agoraConfig';
import { IMAGE_URL } from '../../Services/Api/Common';
import SelectImageDialog from '../../Component/SelectImageDialog';

import {
  MyImage,
  Button,
  MyList,
  MyText,
  Touchable,
  CustomModal,
  TouchableIcon,
  MyLinearGradient,
  KeyboardAwareScroll,
} from '../../Component/commomComponent';

import {
  hostDetailAction,
  getUserProfileAction,
  goLiveStreamingAction,
  getHostExtraDetailAction,
  profleSetupAction,
  isLiveActiveAction,
} from '../../Redux/Action';

import requestCameraAndAudioPermission, {
  openCamera,
  imagePicker,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  getCountryDetailWithKey,
} from '../../Utils/helper';
import { requestLocationPermission } from '../../Utils/permissionLocation';

const sheetCustomStyles = {
  wrapper: {
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
  },
};

const options = [
  strings('letsGoLive.maleLive'),
  strings('letsGoLive.femaleLive'),
  strings('letsGoLive.multiRoomLive'),
  strings('letsGoLive.pkbattle'),
];

const LetsGoLive = ({ navigation }) => {
  const state = useSelector(state => {
    return state;
  });

  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { userLoginList } = state.authReducer;


  const [showLiveOptions, setShowLiveOptions] = useState(false);
  const [selectedLiveOption, setSelectedLiveOption] = useState('');
  const [creatingLiveStatus, setCreatingLiveStatus] = useState(false);
  const [uploadCoverPicStatus, setUploadCoverPicStatus] = useState(false);
  const [fileUpdateStatus, setFileUpdateStatus] = useState(false);
  const [coverPic, setCoverPic] = useState(
    userLoginList?.user?.coverImage || '',
  );

  const [fileBase64, setFileBase64] = useState('');
  const [currentLoc, setCurrentLoc] = useState();

  const refRBSheet = useRef();
  const refImageDialog = useRef();

  const _openLiveOptions = () => setShowLiveOptions(true);

  const _closeLiveOptions = () => setShowLiveOptions(false);

  const _selectLiveOption = item => () => {
    setSelectedLiveOption(item);
    _closeLiveOptions();
  };

  const _goBack = () => navigation.goBack();

  const locPermission = async () => {
    const hasLocationPermission = await requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          setCurrentLoc({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  };

  const _liveStream = async () => {
    locPermission();
    if (
      userLoginList?.user?.gender === 'male' &&
      userLoginList?.user?.level < 10
    ) {
      refRBSheet.current.open();
    } else {
      const permissionGranted = await requestCameraAndAudioPermission();
      if (permissionGranted) {
        setCreatingLiveStatus(true);
        // dispatch(profleSetupAction({interest: true}));
        dispatch(
          goLiveStreamingAction(
            {
              userId: userLoginList?.user?._id,
              file: fileBase64,
            },
            data => {
              setCreatingLiveStatus(false);
              if (data?.status) {
                dispatch(
                  hostDetailAction({
                    ...userLoginList?.user,
                  }),
                );
                dispatch(getHostExtraDetailAction(userLoginList?.user?._id));
                dispatch(isLiveActiveAction(true));
                navigation.navigate('liveStreaming', {
                  ...userLoginList?.user,
                  type: STREAM_TYPE.HOST,
                  channel: data?.data?.roomName,
                  token: data?.data?.token,
                });
              }
            },
          ),
        );
      }
    }
  };

  const _takePhoto = async () => {
    try {
      const file = await openCamera('photo', true);
      refImageDialog.current.close();
      setCoverPic(file.uri);
      setFileBase64(file.base64);
      setFileUpdateStatus(true);
      // _uploadCoverPic(file.base64);
    } catch (error) {
      setFileUpdateStatus(false);
    }
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker('photo', true);
      refImageDialog.current.close();
      setCoverPic(file.uri);
      setFileBase64(file.base64);
      setFileUpdateStatus(true);
      // _uploadCoverPic(file.base64);
    } catch (error) {
      setFileUpdateStatus(false);
    }
  };

  const _uploadCoverPic = file => {
    setUploadCoverPicStatus(true);
    const param = {
      userId: userLoginList?.user?._id,
      file,
    };
    dispatch(
      goLiveStreamingAction(param, data => {
        setUploadCoverPicStatus(false);
        if (data?.status) {
          dispatch(getUserProfileAction());
        }
      }),
    );
  };

  const _closeImagePicker = () => {
    refImageDialog.current.close();
  };

  const source = () => {
    if (coverPic) {
      if (fileUpdateStatus) return { uri: coverPic };
      else
        return { uri: checkURL(coverPic) ? `${IMAGE_URL}${coverPic}` : coverPic };
    } else return '';
  };

  const _renderVideoOptions = ({ item, index }) => {
    return (
      <Touchable onPress={_selectLiveOption(item)} style={styles.liveOptions}>
        <MyText style={styles.liveText}>{item}</MyText>
        <SvgIcon.RightArrowIcon />
      </Touchable>
    );
  };

  function checkURL(url) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  const _rendeSeperator = () => <View style={styles.seperator} />;

  useEffect(() => {
    const payload = {
      location: {
        type: 'Point',
        coordinates: [currentLoc?.longitude, currentLoc?.latitude],
      },
    };
    if (currentLoc?.latitude && currentLoc?.longitude) {
      dispatch(profleSetupAction(payload, res => console.log(res, '===')));
    }
  }, [currentLoc?.latitude, currentLoc?.longitude]);

  return (
    <KeyboardAwareScroll
      style={{ backgroundColor: COLORS.WHITE }}
      contentContainerStyle={{ alignItems: 'center' }}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <ImageBackground source={source()} style={styles.blurImage}>
        <View style={styles.overlay} />

        {!showLiveOptions && (
          <TouchableIcon
            customIcon={<SvgIcon.BackIcon />}
            style={[
              styles.backIcon,
              { top: useSafeAreaInsets().top + SCREEN_HEIGHT * 0.01 },
            ]}
            onPress={_goBack}
          />
        )}
        <MyLinearGradient
          colors={[COLORS.SKY_BLUE, COLORS.PINK, COLORS.NEON]}
          style={styles.gradient}
          useAngle={true}
          angle={135}>
          <View style={styles.imageContainer}>
            {userLoginList?.user?.profile ? (
              <MyImage
                source={{ uri: `${IMAGE_URL}${userLoginList?.user?.profile}` }}
                style={styles.image}
              />
            ) : (
              <SvgIcon.profilePlaceholder />
            )}
          </View>
        </MyLinearGradient>
        <View style={styles.rowname}>
          <MyImage
            source={
              getCountryDetailWithKey({
                key: 'name',
                value: userLoginList?.user?.country,
              }).icon
            }
            style={styles.flag}
          />
          <MyText style={styles.name}>{userLoginList?.user?.name || ''}</MyText>
        </View>
        <MyText style={styles.weechaId}>{`${strings('letsGoLive.weechaId')}: ${userLoginList?.user?.userId || ''
          }`}</MyText>
      </ImageBackground>
      <Touchable
        style={styles.touchContainer}
        onPress={() => {
          refImageDialog.current.open();
        }}>
        <MyText style={styles.dropDownText}>
          {strings('letsGoLive.addCoverPictuer')}
        </MyText>
        <SvgIcon.GalleryIcon />
      </Touchable>
      <Touchable onPress={_openLiveOptions} style={styles.touchContainer}>
        <MyText style={styles.dropDownText}>
          {selectedLiveOption
            ? selectedLiveOption
            : strings('letsGoLive.chooseLiveOption')}
        </MyText>
        <SvgIcon.DownTriangleThinIcon />
      </Touchable>
      <Input
        placeholder={`${strings('letsGoLive.tellMeSomething')}?`}
        multiline
        placeholderTextColor={COLORS.BLACK}
        style={styles.input}
        mainContainer={styles.inputContainer}
        textInputStyle={styles.textInput}
      />
      <Button
        indicator={creatingLiveStatus}
        width={SCREEN_WIDTH - dynamicSize(50)}
        buttonStyle={styles.buttonStyle}
        labelStyle={styles.buttonText}
        label={strings('letsGoLive.liveBtn')}
        onPress={_liveStream}
      />
      <SelectImageDialog
        key="imageRef"
        ref={refImageDialog}
        onPressTakePhoto={_takePhoto}
        onPressChooseFromLibrary={_chooseFromLib}
        onPressCancel={_closeImagePicker}
      />
      {showLiveOptions && (
        <CustomModal
          isVisible={showLiveOptions}
          style={{ backgroundColor: 'transparent' }}
          onRequestClose={_closeLiveOptions}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              shadowColor: COLORS.LIGHT_GREY,
              backgroundColor: COLORS.WHITE,
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 5,
              shadowOffset: { width: 5, height: 5 },
            }}>
            <View
              style={[
                styles.liveLogoContainer,
                userLoginList?.user?.gender === 'male' && {
                  backgroundColor: COLORS.BACKGROUND_COLOR_BLUE,
                },
              ]}>
              <SvgIcon.LiveLogo />
            </View>
            <MyList
              data={options}
              scrollEnabled={false}
              renderItem={_renderVideoOptions}
              ItemSeparatorComponent={_rendeSeperator}
              contentContainerStyle={{
                marginTop: dynamicSize(10),
                backgroundColor: COLORS.WHITE,
                paddingBottom: useSafeAreaInsets().bottom,
              }}
            />
          </View>
        </CustomModal>
      )}

      <RBSheet
        ref={refRBSheet}
        openDuration={250}
        height={dynamicSize(190)}
        customStyles={sheetCustomStyles}>
        <View
          style={{
            // top: hp(30),
            position: 'absolute',
            shadowColor: COLORS.LIGHT_GREY,
            borderRadius: wp(10),
            shadowOpacity: 1,
            shadowRadius: 1,
            // elevation: 5,
            shadowOffset: { width: 0, height: 0 },
          }}>
          <View style={[styles.levelUpAlert]}>
            <View style={{ flexDirection: 'row' }}>
              <MyText style={styles.level}>
                Your level is less than level 10
              </MyText>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  refRBSheet.current.close();
                }}>
                <SvgIcon.crossIconPink />
              </Pressable>
            </View>
            <MyText style={styles.desc}>
              you wanna be live room, make your level up to 10
            </MyText>
            <Touchable
              onPress={() => {
                refRBSheet.current.close();
                navigation.navigate('WeechaLevel');
              }}>
              <MyText style={styles.knowMore}>Know more</MyText>
            </Touchable>
          </View>
        </View>
      </RBSheet>
    </KeyboardAwareScroll>
  );
};

export default LetsGoLive;
