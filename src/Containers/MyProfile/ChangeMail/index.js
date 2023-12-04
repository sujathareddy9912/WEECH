import React, { useState } from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../Utils/colors';
import { styles } from './styles';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../Component/header/Header';
import { Button } from '../../../Component/commomComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FloatingInput from '../../../Component/FloatingInput/FloatingInput';
import {
    validateStatus,
    validateMail,
    validateMobileNo
} from '../../../Utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import CountryCodePicker from '../../../Component/countryCodePicker';
import { defaultCountry } from '../../../Utils/countryCode';
import { MyBalanceServices } from '../../../Services/Api/myBalanceServices';
import { linkMailAction, linkPhoneAction, updateMailAction, updatePhoneAction, profleSetupAction, getUserProfileAction } from '../../../Redux/Action';
import { HelperService } from '../../../Services/Utils/HelperService';
const INPUT_TYPES = {
    OLD_MAIL: 'oldmail',
    MAIL: 'mail',
    OTP: 'otp',
    OLD_NUM: 'oldNum',
    NUM: 'num'
};


const ChangeMail = ({ navigation, route }) => {
    const { isPhone } = route?.params
    const state = useSelector(state => {
        return state;
    });
    const { userLoginList } = state.authReducer;
    
    const dispatch = useDispatch();
    const [fetchingOtp, setFetcingOtp] = useState(false);
    const [isShowCountryModal, setCountryModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const _openCountryModal = () => setCountryModal(true);
    const _closeCountryModal = () => setCountryModal(false);
    const initialState = {
        dialCode: defaultCountry.dialCode,
        oldMail: '',
        mail: '',
        oldNumber: '',
        newNumber: '',
        otp: '',
        otpFromBackend: '',
        userId: '',
        isVerified: false,
    };

    const initialError = {
        mailError: '',
        otpError: '',
        oldMailError: '',
        oldNumberError: '',
        numberError: ''
    };

    const [
        {
            dialCode,
            oldMail,
            oldNumber,
            newNumber,
            mail,
            otp,
            otpFromBackend,
            isVerified,
        },
        setState,
    ] = useState(initialState);
    const [
        { oldMailError, mailError, otpError, oldNumberError, numberError },
        setError,
    ] = useState(initialError);


    const _getCountry = data => {
        setState(prevState => ({ ...prevState, dialCode: data.dialCode }));
        _closeCountryModal();
    };

    const _onChangeText = type => text => {
        if (type == INPUT_TYPES.OLD_MAIL) {
            setState(prevState => ({ ...prevState, oldMail: text }));
            setError(preverror => ({ ...preverror, oldMailError: '' }));
        }
        else if (type == INPUT_TYPES.MAIL) {
            setState(prevState => ({ ...prevState, mail: text }));
            setError(preverror => ({ ...preverror, mailError: '' }));
        }
        else if (type == INPUT_TYPES.OLD_NUM) {
            setState(prevState => ({ ...prevState, oldNumber: text }));
            setError(preverror => ({ ...preverror, oldNumberError: '' }));
        }
        else if (type == INPUT_TYPES.NUM) {
            setState(prevState => ({ ...prevState, newNumber: text }));
            setError(preverror => ({ ...preverror, numberError: '' }));
        }
        else if (type == INPUT_TYPES.OTP) {
            if (otpFromBackend) {
                setState(prevState => ({
                    ...prevState,
                    otp: text,
                    isVerified: otpFromBackend == text,
                }));
                if (otpFromBackend !== text) {
                    setError(prev => ({ ...prev, otpError: 'otp not matched' }))
                } else {
                    setError(preverror => ({ ...preverror, otpError: '' }));
                }
            } else {
                setState(prevState => ({ ...prevState, otp: text, isVerified: false }));
            }
        }
    };

    const _validateMailOrOtp = () => {
        let isValid = true;
        if (!validateMail(mail).status || oldMail !== userLoginList?.user?.email) {
            isValid = false;
            if (oldMail !== userLoginList?.user?.email) {
                setError(preverror => ({
                    ...preverror,
                    oldMailError: 'email not matched',
                }));
            }

            else if (validateMail(mail).error == validateStatus.required) {
                setError(preverror => ({
                    ...preverror,
                    mailError: 'email required',
                }));
            }
            else if (validateMail(mail).error == validateStatus.validateRegEx)
                setError(preverror => ({
                    ...preverror,
                    mailError: 'email invalid',
                }));
        } else setError(preverror => ({ ...preverror, mailError: '' }));

        if (isValid) _sendOtp();
    };

    const _validatePhone = () => {
        let isValid = true;
        if (!validateMobileNo(newNumber).status || oldNumber !== userLoginList?.user?.phone) {
            isValid = false;
            if (oldNumber !== userLoginList?.user?.phone) {
                setError(preverror => ({
                    ...preverror,
                    oldNumberError: 'number not matched',
                }));
            }
            else if (validateMobileNo(newNumber).error == validateStatus.required) {
                setError(preverror => ({
                    ...preverror,
                    numberError: 'number required',
                }));
            }
            else if (validateMobileNo(newNumber).error == validateStatus.validateRegEx)
                setError(preverror => ({
                    ...preverror,
                    numberError: 'number invalid',
                }));
        } else setError(preverror => ({ ...preverror, numberError: '' }));

        if (isValid) _sendOtp();
    };

    const leftHeaderComponent = (
        <TouchableOpacity
            style={styles.backContainer}
            onPress={() => navigation?.goBack()}>
            <FontAwesome5Icon
                name={'chevron-left'}
                color={COLORS.BLACK}
                size={wp(4)}
                style={{
                    marginRight: wp(1)
                }}
            />
            <Text>Back</Text>
        </TouchableOpacity>
    );
    const _sendOtp = () => {
        setFetcingOtp(true);
        if (!isPhone) {
            const param = {
                email: mail,
            };
            // dispatch(linkMailAction(param, (res) => {
            //     console.log(res, "OTPPP77");
            //     setFetcingOtp(false);
            //     setShowResendButton(false)
            //     setState((prevState) => ({ ...prevState, otpFromBackend: res?.otp }))
            // }));
            MyBalanceServices.linkMail(param).then(res => {
                console.log(res, "OTPPP77");
                setFetcingOtp(false);
                setShowResendButton(false)
                HelperService.showToast(res?.message);
                setState((prevState) => ({ ...prevState, otpFromBackend: res?.otp }))
            })
        } else {
            const param = {
                phone: dialCode + newNumber,
            };
            dispatch(linkPhoneAction(param, (res) => {
                setFetcingOtp(false);
                setShowResendButton(false)
                setState((prevState) => ({ ...prevState, otpFromBackend: res?.otp }))
            })
            );
        }
    };
    const _updateMail = () => {
        setLoader(true);
        const param = {
            email: mail,
            otp: otp
        };
        // dispatch(
        //     updateMailAction(param, (res) => {
        //         console.log(res, "MAILLL");
        //         setLoader(false);
        //         dispatch(
        //             profleSetupAction({}, () => {
        //             }),
        //         );
        //         props.navigation?.goBack()
        //     }));
        MyBalanceServices.updateMail(param).then(res => {
            setLoader(false);
            console.log(res, "MAILLL");
            HelperService.showToast(res?.message);
            navigation.goBack();
            // dispatch(getUserProfileAction(profile => {
            // }));
        })
    }

    const _updatePhone = () => {
        setLoader(true);
        const param = {
            phone: dialCode + newNumber,
            otp: otp
        };
        dispatch(
            updatePhoneAction(param, res => {
                setLoader(false);
                props.navigation?.goBack()
            })
        );
    }
    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <View style={styles.innerContainer}>
                    <Header
                        title={isPhone ? String("Change Number") : String('Change Mail')}
                        leftComponent={leftHeaderComponent}
                        containerStyle={styles.header}
                        titleStyle={styles.title}
                    />
                    {!isPhone ?
                        <FloatingInput
                            value={oldMail}
                            label={"Old mail"}
                            errors={oldMailError}
                            onChangeText={_onChangeText(INPUT_TYPES.OLD_MAIL)}
                        />
                        :
                        userLoginList?.user?.phone ? <FloatingInput
                            value={oldNumber}
                            label={"Old Number"}
                            errors={oldNumberError}
                            onChangeText={_onChangeText(INPUT_TYPES.OLD_NUM)}
                        />: null}
                    {!isPhone ?
                        <FloatingInput
                            value={mail}
                            label={"New mail"}
                            errors={mailError}
                            onChangeText={_onChangeText(INPUT_TYPES.MAIL)}
                        />
                        :
                        <FloatingInput
                            onPhonePress={_openCountryModal}
                            value={newNumber}
                            phone={dialCode}
                            label={"New Number"}
                            errors={numberError}
                            onChangeText={_onChangeText(INPUT_TYPES.NUM)}
                        />
                    }
                    <FloatingInput
                        label={"OTP"}
                        errors={otpError}
                        value={otp}
                        keyboardType={'number-pad'}
                        onChangeText={_onChangeText(INPUT_TYPES.OTP)}
                        rightButton
                        indicator={fetchingOtp}
                        onPress={isPhone ? _validatePhone : _validateMailOrOtp}
                    />
                </View>
                <Button
                    indicator={loader}
                    // disabled={!isVerified}
                    buttonStyle={styles.buttonStyle}
                    isDark
                    label={"Confirm"}
                    width={'90%'}
                    onPress={isPhone ? _updatePhone : _updateMail}
                />
            </View>
            <CountryCodePicker
                showDialCode
                countryCode={dialCode}
                isVisible={isShowCountryModal}
                getCountry={_getCountry}
                closeCountryModal={_closeCountryModal}
            />
        </>
    );
};

export default ChangeMail;
