import React, {useState, useReducer, useEffect, useRef} from 'react';
import TextInput from '../../Component/TextInput/TextInput';
import GradientBackground from '../../Component/GardientBackground/GardientBackGround';
import {
  StatusBar,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import Icon from '../../Component/Icons/Icon';
import Dropdown from '../../Component/DropDown/DropDown';
import DateTimePicker from '../../Component/DateTimePicker/DateTimePicker';
import CountryCodePicker from '../../Component/countryCodePicker';
import {COLORS} from '../../Utils/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {strings} from '../../localization/config';
import {Button} from '../../Component/commomComponent';
import ProfileImage from './profileImage';
import FavouriteImages from './favouriteImages';
import FavouriteVideos from './favouriteVideos';
import {initialState, Actions, Reducer} from './profileState';
import {isEmpty, validateUserName} from '../../Utils/validation';
import {GET_PROFILE_REQUEST} from '../../ActionConstant/profile.constant';

const {height, width} = Dimensions.get('window');

const genderData = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

function Profile() {
  const appdispatch = useDispatch();

  const reducer = useSelector((state)=>state.profile);

  console.log(reducer);

  const [state, dispatch] = useReducer(Reducer, initialState);
  const scrollRef = useRef();
  const profilePicRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const dobRef = useRef();
  const aboutRef = useRef();
  const userImagesRef = useRef();
  const userVideosRef = useRef();

  const [profilePic, setProfilePic] = useState(null);
  const [countryPicker, setCountryPicker] = useState(false);
  const [userImages, setUserImages] = useState([{}]);
  const [userVideos, setUserVideos] = useState([{}]);

  const [profilePicError, setProfilePicError] = useState(null);
  const [userImagesError, setUserImagesError] = useState(null);
  const [userVidoesError, setUserVideosError] = useState(null);

  const _openCountryPicker = () => setCountryPicker(true);
  const _closeCountryPicker = () => setCountryPicker(false);

  useEffect(() => {
    if (state.gender === 'female') {
      dispatch({
        type: Actions.ABOUTERROR,
        payload: isEmpty(state.about, strings('validation.aboutError')),
      });
      setUserImagesError(
        favouriteInfoError(
          3,
          userImages,
          strings('validation.imapeUploadError'),
        ),
      );
      setUserVideosError(
        favouriteInfoError(
          3,
          userVideos,
          strings('validation.videoUploadError'),
        ),
      );
    } else {
      dispatch({
        type: Actions.ABOUTERROR,
        payload: null,
      });
      setUserImagesError(null);
      setUserVideosError(null);
    }
  }, [state.gender]);

  const imageValidation = imagesArray => {
    setUserImagesError(
      favouriteInfoError(
        3,
        imagesArray,
        strings('validation.imapeUploadError'),
      ),
    );
  };

  const videoValidation = videoArray => {
    setUserVideosError(
      favouriteInfoError(3, videoArray, strings('validation.videoUploadError')),
    );
  };

  const handleOnChange = (field, value) => {
    switch (field) {
      case 'name':
        dispatch({type: Actions.NAME, payload: value});
        dispatch({
          type: Actions.NAMEERROR,
          payload: validateUserName(
            value,
            strings('validation.validName'),
            strings('validation.requiredName'),
          ),
        });
        break;

      case 'gender':
        dispatch({type: Actions.GENDER, payload: value});
        dispatch({
          type: Actions.GENDERERROR,
          payload: isEmpty(value, strings('validation.requiredGender')),
        });
        break;
      case 'dob':
        dispatch({type: Actions.DOB, payload: value});
        dispatch({
          type: Actions.DOBERROR,
          payload: isEmpty(value, strings('validation.dobError')),
        });
        break;
      case 'country':
        dispatch({type: Actions.COUNTRY, payload: value});
        break;

      case 'about':
        dispatch({type: Actions.ABOUT, payload: value});
        dispatch({
          type: Actions.ABOUTERROR,
          payload: isEmpty(value, strings('validation.aboutError')),
        });
        break;
      default:
        break;
    }
  };

  const _getCountry = data => {
    handleOnChange('country', data.name);
    _closeCountryPicker();
  };

  const favouriteInfoError = (requiredLength, favouriteItem, errorMessage) => {
    return favouriteItem && favouriteItem.length > requiredLength
      ? null
      : errorMessage;
  };

  const onClickSave = () => {


    appdispatch({type:GET_PROFILE_REQUEST});

    let aError, piError, pvError;
    const pError = isEmpty(profilePic, strings('validation.uploadProfilePic'));
    const nError = validateUserName(
      state.name,
      strings('validation.validName'),
      strings('validation.requiredName'),
    );
    const dError = isEmpty(state.dob, strings('validation.dobError'));
    const gError = isEmpty(state.gender, strings('validation.requiredGender'));
    if (state.gender === 'female') {
      aError = isEmpty(state.about, strings('validation.aboutError'));
      piError = favouriteInfoError(
        3,
        userImages,
        strings('validation.imapeUploadError'),
      );
      pvError = favouriteInfoError(
        3,
        userVideos,
        strings('validation.videoUploadError'),
      );
    }

    if (
      !pError?.status ||
      !nError?.status ||
      !gError.status ||
      !dError?.status ||
      (aError && !aError?.status) ||
      piError ||
      pvError
    ) {
      setProfilePicError(pError.error);
      dispatch({type: Actions.NAMEERROR, payload: nError});
      dispatch({type: Actions.GENDERERROR, payload: gError});
      dispatch({type: Actions.DOBERROR, payload: dError});
      dispatch({type: Actions.ABOUTERROR, payload: aError});
      setUserImagesError(piError);
      setUserVideosError(pvError);

      const scrollInPutRef = !pError.status
        ? profilePicRef
        : !nError.status
        ? nameRef
        : !gError.status
        ? genderRef
        : !dError.status
        ? dobRef
        : !aError.status
        ? aboutRef
        : piError
        ? userImagesRef
        : userVideosRef;

      handleScrollToInput(scrollInPutRef);
      return;
    }
  };

  const handleScrollToInput = inputRef => {
    if (scrollRef.current && inputRef) {
      inputRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current.scrollTo({y: y + pageY, animated: true});
      });
    }
  };

  return (
    <GradientBackground>
      <ScrollView ref={scrollRef}>
        <StatusBar barStyle="light-content" />
        {profilePic && profilePic.uri && (
          <ImageBackground
            source={{uri: profilePic.uri}}
            style={styles.blurImage}
            blurRadius={5}
          />
        )}
        <ProfileImage
          ref={profilePicRef}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          profileImageError={profilePicError}
        />

        <View style={styles.infoContainer}>
          <View style={styles.seperator}>
            <TextInput
              ref={nameRef}
              label={strings(`common.name`)}
              isRequired={true}
              value={state.name}
              placeholder={strings(`placeholder.name`)}
              placeHolderStyle={styles.placeholder}
              placeholderTextColor={COLORS.TEXT_GRAY}
              onChangeText={text => handleOnChange('name', text)}
            />
            {state.nameError && !state.nameError?.status && (
              <Text style={styles.error}>{state.nameError?.error}</Text>
            )}
          </View>

          <View
            style={[
              styles.datePickerContainerStyle,
              styles.seperator,
              {height: 60},
            ]}>
            <Dropdown
              ref={genderRef}
              label={strings(`editProfile.gender`)}
              isRequired={true}
              value={state.gender}
              placeholder={strings(`placeholder.gender`)}
              placeholderStyle={styles.placeholder}
              data={genderData}
              onChange={item => handleOnChange('gender', item.value)}
            />
          </View>
          {state.genderError && !state.genderError?.status && (
            <Text style={styles.error}>{state.genderError?.error}</Text>
          )}
          <View style={[styles.datePickerContainerStyle, styles.seperator]}>
            <DateTimePicker
              ref={dobRef}
              labelStyle={styles.label}
              isRequired={true}
              placeHolderStyle={styles.placeholder}
              date={state.dob}
              inputStyle={styles.inputDate}
              label={strings(`editProfile.dateOfBirth`)}
              placeholder={strings(`placeholder.dob`)}
              type="date"
              onChange={value => handleOnChange('dob', new Date(value))}
            />
            {state.dobError && !state.dobError?.status && (
              <Text style={styles.error}>{state.dobError?.error}</Text>
            )}
          </View>

          <View style={[styles.datePickerContainerStyle, styles.seperator]}>
            <TouchableOpacity
              // ref={(ref) => setInputRef('country', ref)}
              style={styles.countryTextInputBtn}
              onPress={_openCountryPicker}>
              <View style={{width: '95%'}}>
                <Text style={styles.label}>
                  {strings(`editProfile.country`)}
                </Text>
                <Text
                  style={[
                    state.country ? styles.inputDate : styles.placeholder,
                  ]}>
                  {state.country
                    ? state.country
                    : strings(`placeholder.country`)}
                </Text>
              </View>
              <Icon
                origin="AntDesign"
                name="down"
                size={14}
                color={COLORS.LIGHT_GREY}
              />
            </TouchableOpacity>
            <CountryCodePicker
              isVisible={countryPicker}
              getCountry={_getCountry}
              closeCountryModal={_closeCountryPicker}
            />
            {/* {state.genderError && !state.genderError?.status && (
              <Text style={styles.error}>{state.genderError?.error}</Text>
            )} */}
          </View>

          <View style={[styles.datePickerContainerStyle, styles.seperator]}>
            <TextInput
              ref={aboutRef}
              label={strings(`editProfile.about`)}
              placeholder={strings(`placeholder.about`)}
              isRequired={state.gender === 'female'}
              value={state.about}
              placeHolderStyle={[styles.placeholder]}
              placeholderTextColor={COLORS.TEXT_GRAY}
              style={{height: 100, textAlignVertical: 'top'}}
              multiline
              onChangeText={text => handleOnChange('about', text)}
            />
            {state.aboutError && !state.aboutError?.status && (
              <Text style={styles.error}>{state.aboutError?.error}</Text>
            )}
          </View>

          <FavouriteImages
            ref={userImagesRef}
            userImages={userImages}
            setUserImages={setUserImages}
            favouriteImagesError={userImagesError}
            isRequired={state.gender === 'female'}
            validation={imageValidation}
          />
          <FavouriteVideos
            ref={userVideosRef}
            userVideos={userVideos}
            setUserVideos={setUserVideos}
            favouriteVidoesError={userVidoesError}
            isRequired={state.gender === 'female'}
            validation={videoValidation}
          />
        </View>
        <Button
          // indicator={updoadingDetails}
          onPress={onClickSave}
          buttonStyle={styles.buttonStyle}
          isDark
          label={strings('editProfile.save')}
          width={'75%'}
        />
      </ScrollView>
    </GradientBackground>
  );
}

export default Profile;

const styles = StyleSheet.create({
  blurImage: {
    height: height * 0.4,
    width: width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    marginTop: height * 0.03,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: width * 0.03,
    marginVertical: 32,
  },
  countryTextInputBtn: {
    backgroundColor: COLORS.WHITE,
    height: 60,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    marginVertical: 4,
    color: COLORS.TEXT_GRAY,
  },
  datePickerContainerStyle: {
    marginTop: 8,
  },
  inputDate: {
    fontSize: 16,
    marginVertical: 4,
    color: COLORS.BLACK,
  },
  label: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonStyle: {
    alignSelf: 'center',
    marginVertical: height * 0.05,
  },
  error: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.DARK_RED,
    marginVertical: 2,
  },
});
