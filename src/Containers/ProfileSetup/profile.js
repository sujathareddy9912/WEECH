import React, {useState, useReducer, useEffect, useRef} from 'react';
import TextInput from '../../Component/TextInput/TextInput';
import {
  StatusBar,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from '../../Component/Icons/Icon';
import Dropdown from '../../Component/DropDown/DropDown';
import DateTimePicker from '../../Component/DateTimePicker/DateTimePicker';
import CountryCodePicker from '../../Component/countryCodePicker';
import {COLORS} from '../../Utils/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {strings} from '../../localization/config';
import {Button} from '../../Component/commomComponent';
import ProfileImage from './profileImage';
import {initialState, Actions, Reducer} from './profileState';
import {isEmpty, validateUserName} from '../../Utils/validation';
import {
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
} from '../../ActionConstant/profile.constant';
import {reset} from '../../Navigator/navigationHelper';
import LodingIndicator from '../../Component/LoadingIndicator/LoadingIndicator';
import {getData, storeData} from '../../Utils/helper';
import {showMessage} from 'react-native-flash-message';
import {LOCAL_KEY} from '../../Utils/localStorage';
import {
  isDone,
  setGender,
  isEdit as actionEdit,
} from '../../Actions/Profile/profile.actions';
import cacheImage from '../../Utils/ImageCache';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

const genderData = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

function Profile(props) {
  const appdispatch = useDispatch();
  const navigation = useNavigation();

  const reducer = useSelector(state => state.profile);

  const {
    updateProfileError,
    updateProfileLoading,
    updateProfileSuccess,
    getProfileError,
    getProfileLoading,
    getProfileSuccess,
    appgender,
    isEdit,
  } = reducer;

  const [state, dispatch] = useReducer(Reducer, initialState);
  const scrollRef = useRef();
  const profilePicRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const dobRef = useRef();
  const aboutRef = useRef();

  const [profilePic, setProfilePic] = useState(null);
  const [countryPicker, setCountryPicker] = useState(false);
  const [isSkip, setSkip] = useState(false);
  const [profilePicError, setProfilePicError] = useState(null);

  const _openCountryPicker = () => setCountryPicker(true);
  const _closeCountryPicker = () => setCountryPicker(false);

  const jumpToNext = () => {
    appdispatch(isDone('profile'));
    props.jumpTo('favouriteImages');
  };

  useEffect(() => {
    if (isEdit) {
      appdispatch({type: GET_PROFILE_REQUEST});
    }
  }, [isEdit]);

  useEffect(() => {
    dispatch({
      type: Actions.LOADING,
      payload: getProfileLoading || updateProfileLoading,
    });
  }, [getProfileLoading, updateProfileLoading]);

  useEffect(() => {
    (async () => {
      if (updateProfileSuccess) {
        if (!isEdit) {
          isSkip ? reset('MainTabNavigation') : jumpToNext();
        } else {
          showMessage({
            description: updateProfileSuccess?.message,
            message: 'Profile',
            type: 'success',
            icon: 'success',
          });
        }
        storeData(LOCAL_KEY.PROFILE_SETUP_STATUS, 'false');
      }
    })();

    return () => {
      appdispatch({type: UPDATE_PROFILE_RESET});
    };
  }, [updateProfileSuccess]);

  useEffect(() => {
    (async () => {
      if (getProfileSuccess) {
        dispatch({type: Actions.NAME, payload: getProfileSuccess.user.name});
        dispatch({
          type: Actions.GENDER,
          payload: getProfileSuccess.user.gender,
        });
        appdispatch(setGender(getProfileSuccess.user.gender));
        dispatch({
          type: Actions.DOB,
          payload: new Date(getProfileSuccess.user.DateOfBirth),
        });
        dispatch({
          type: Actions.COUNTRY,
          payload: getProfileSuccess.user.country,
        });
        dispatch({type: Actions.ABOUT, payload: getProfileSuccess.user.bio});
        const serverImage = await cacheImage(
          `https://api.weecha.uk/v1/uploads/${getProfileSuccess.user.profile}`,
        );
        setProfilePic({
          uri: serverImage.uri,
        });
      }
    })();
  }, [getProfileSuccess]);

  useEffect(() => {
    if (profilePicError) {
      setProfilePicError(
        isEmpty(profilePic, strings('validation.uploadProfilePic')).error,
      );
    }
  }, [profilePic]);

  useEffect(() => {
    if (state.gender === 'female' && !isEdit) {
      dispatch({
        type: Actions.ABOUTERROR,
        payload: isEmpty(state.about, strings('validation.aboutError')),
      });
    } else {
      dispatch({
        type: Actions.ABOUTERROR,
        payload: null,
      });
    }
  }, [state.gender]);

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
        appdispatch(setGender(value));
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
        if (state.gender === 'female') {
          dispatch({
            type: Actions.ABOUTERROR,
            payload: isEmpty(value, strings('validation.aboutError')),
          });
        }
        break;
      default:
        break;
    }
  };

  const _getCountry = data => {
    handleOnChange('country', data.name);
    _closeCountryPicker();
  };

  const onClickSave = () => {
    let aError;
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
    }

    if (
      !pError?.status ||
      !nError?.status ||
      !gError.status ||
      !dError?.status ||
      (aError && !aError?.status)
    ) {
      setProfilePicError(pError.error);
      dispatch({type: Actions.NAMEERROR, payload: nError});
      dispatch({type: Actions.GENDERERROR, payload: gError});
      dispatch({type: Actions.DOBERROR, payload: dError});
      dispatch({type: Actions.ABOUTERROR, payload: aError});

      const scrollInPutRef = !pError.status
        ? profilePicRef
        : !nError.status
        ? nameRef
        : !gError.status
        ? genderRef
        : !dError.status
        ? dobRef
        : aboutRef;

      handleScrollToInput(scrollInPutRef);
      return;
    }

    const requestData = {
      name: state.name,
      gender: state.gender,
      DateOfBirth: state.dob,
      country: state.country,
      file: profilePic.base64,
      bio: state.about,
    };

    appdispatch({type: UPDATE_PROFILE_REQUEST, payload: requestData});
  };

  const handleScrollToInput = inputRef => {
    if (scrollRef.current && inputRef) {
      inputRef.current.measure((y, pageY) => {
        scrollRef.current.scrollTo({y: y + pageY, animated: true});
      });
    }
  };

  return (
    <>
      <LodingIndicator visible={state.loading} />
      <ScrollView ref={scrollRef}>
        <StatusBar barStyle="light-content" />
        {profilePic && profilePic.uri && isEdit && (
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
              // editable={!isEdit}
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
              disabled={isEdit}
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
              //disabled={isEdit}
              maximumDate={moment().subtract(18, 'years')}
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
        </View>
        <Button
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
    </>
  );
}

export default Profile;

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
    marginBottom: height * 0.05,
  },
  error: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.DARK_RED,
    marginVertical: 2,
  },
});
