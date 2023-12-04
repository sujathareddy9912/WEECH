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
import { linkPhoneAction, profleSetupAction, updatePhoneAction } from '../../../Redux/Action';
import { HelperService } from '../../../Services/Utils/HelperService';
const INPUT_TYPES = {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    BANK_CODE: "bankCode",
    IFSC: "ifscCode",
    BANK_ACCOUNT: "bankAccount",
    ADDRESS: "address",
    MAIL: 'mail',
    NUM: 'phone'
};


const BankDetails = ({ navigation, route }) => {
    const { country } = route?.params
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
        firstName: userLoginList?.user?.bankDetails?.bankHolderFirstName,
        lastName: userLoginList?.user?.bankDetails?.bankHolderLastName,
        bankCode: userLoginList?.user?.bankDetails?.bankCode,
        ifscCode: userLoginList?.user?.bankDetails?.ifscCode,
        bankAccount: userLoginList?.user?.bankDetails?.accountNumber,
        address: userLoginList?.user?.bankDetails?.address,
        email: userLoginList?.user?.bankDetails?.email,
        phone: userLoginList?.user?.bankDetails?.phone,
    };

    const initialError = {
        firstNameError: "",
        lastNameError: "",
        bankCodeError: "",
        ifscCodeError: "",
        bankAccountError: "",
        addressError: "",
        emailError: "",
        phoneError: "",
    };

    const [
        {
            firstName,
            lastName,
            bankCode,
            ifscCode,
            bankAccount,
            address,
            email,
            phone,
        },
        setState,
    ] = useState(initialState);
    const [
        { firstNameError, lastNameError, bankCodeError, oldNumberError, numberError },
        setError,
    ] = useState(initialError);


    // const _getCountry = data => {
    //     setState(prevState => ({ ...prevState, dialCode: data.dialCode }));
    //     _closeCountryModal();
    // };

    const _onChangeText = type => text => {
        if (type == INPUT_TYPES.MAIL) {
            setState(prevState => ({ ...prevState, email: text }));
            setError(preverror => ({ ...preverror, emailError: '' }));
        }
        else if (type == INPUT_TYPES.NUM) {
            setState(prevState => ({ ...prevState, phone: text }));
            setError(preverror => ({ ...preverror, phoneError: '' }));
        }
        else if (type == INPUT_TYPES.FIRST_NAME) {
            setState(prevState => ({ ...prevState, firstName: text }));
            setError(preverror => ({ ...preverror, firstNameError: '' }));
        }
        else if (type == INPUT_TYPES.LAST_NAME) {
            setState(prevState => ({ ...prevState, lastName: text }));
            setError(preverror => ({ ...preverror, lastNameError: '' }));
        }
        else if (type == INPUT_TYPES.BANK_ACCOUNT) {
            setState(prevState => ({ ...prevState, bankAccount: text }));
            setError(preverror => ({ ...preverror, bankAccountError: '' }));
        }
        else if (type == INPUT_TYPES.BANK_CODE) {
            setState(prevState => ({ ...prevState, bankCode: text }));
            setError(preverror => ({ ...preverror, bankCodeError: '' }));
        }
        else if (type == INPUT_TYPES.IFSC) {
            setState(prevState => ({ ...prevState, ifscCode: text }));
            setError(preverror => ({ ...preverror, ifscCodeError: '' }));
        }
        else if (type == INPUT_TYPES.ADDRESS) {
            setState(prevState => ({ ...prevState, address: text }));
            setError(preverror => ({ ...preverror, addressError: '' }));
        }
    };

    const _validateMailOrOtp = () => {
        let isValid = true;
        if (!validateMail(email).status) {
            isValid = false;
            if (validateMail(email).error == validateStatus.required) {
                setError(preverror => ({
                    ...preverror,
                    emailError: 'email required',
                }));
            }
            else if (validateMail(email).error == validateStatus.validateRegEx)
                setError(preverror => ({
                    ...preverror,
                    emailError: 'email invalid',
                }));
        } else setError(preverror => ({ ...preverror, emailError: '' }));

        if (isValid) _validatePhone();
    };

    const _validatePhone = () => {
        let isValid = true;
        if (!validateMobileNo(phone).status) {
            isValid = false;
            if (validateMobileNo(phone).error == validateStatus.required) {
                setError(preverror => ({
                    ...preverror,
                    phoneError: 'number required',
                }));
            }
            else if (validateMobileNo(phone).error == validateStatus.validateRegEx)
                setError(preverror => ({
                    ...preverror,
                    phoneError: 'number invalid',
                }));
        } else setError(preverror => ({ ...preverror, phoneError: '' }));

        if (isValid) _saveProfile();
    };

    const _saveProfile = () => {
        setLoader(true)
        const param = {
            bankDetails: {
                bankCountry: country,
                bankType: "Bank Account",
                bankName: "SBI",
                bankHolderFirstName: firstName,
                banHolderLastName: lastName,
                accountNumber: bankAccount,
                ifscCode: ifscCode,
                bankCode: bankCode,
                address: address,
                email: email,
                phone: phone,
            },
        };

        dispatch(
            profleSetupAction(param, () => {
                setLoader(false)
                navigation.goBack()
            }),
        );
    };

    const leftHeaderComponent = (
        <TouchableOpacity
            style={styles.backContainer}
            onPress={() => navigation?.goBack()}>
            <FontAwesome5Icon
                name={'chevron-left'}
                color={COLORS.WHITE}
                size={wp(4)}
                style={{
                    marginRight: wp(1)
                }}
            />
        </TouchableOpacity>
    );

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <View style={styles.innerContainer}>
                    <Header
                        title={"Bank Details"}
                        leftComponent={leftHeaderComponent}
                        containerStyle={styles.header}
                        titleStyle={styles.title}
                    />
                    <View style={{
                        marginBottom: hp(2),
                    }}>
                        <Text style={styles.desc}>Please fill in the correct account information, or your payments will be affected.</Text>
                    </View>
                    <FloatingInput
                        placeholder={"Input Text"}
                        lableColor={{ color: COLORS.RED_COLOR }}
                        value={firstName}
                        label={"Beneficiary Name"}
                        onChangeText={_onChangeText(INPUT_TYPES.FIRST_NAME)}
                    />
                    <FloatingInput
                        placeholder={"Input Text"}
                        value={lastName}
                        label={"Beneficiary Last Name"}
                        lableColor={{ color: COLORS.RED_COLOR }}
                        onChangeText={_onChangeText(INPUT_TYPES.LAST_NAME)}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: wp(90)
                    }}>
                        <FloatingInput
                            placeholder={"Input Text"}
                            lableColor={{ color: COLORS.RED_COLOR }}
                            containerStyle={{ width: wp(43) }}
                            value={bankCode}
                            label={"Bank Code"}
                            onChangeText={_onChangeText(INPUT_TYPES.BANK_CODE)}
                        />
                        <FloatingInput
                            placeholder={"Input Text"}
                            lableColor={{ color: COLORS.RED_COLOR }}
                            containerStyle={{ width: wp(43) }}
                            value={ifscCode}
                            label={"IFSC Code"}
                            onChangeText={_onChangeText(INPUT_TYPES.IFSC)}
                        />
                    </View>
                    <FloatingInput
                        placeholder={"Input Text"}
                        value={bankAccount}
                        label={"Bank Account"}
                        lableColor={{ color: COLORS.RED_COLOR }}
                        onChangeText={_onChangeText(INPUT_TYPES.BANK_ACCOUNT)}
                    />
                    <FloatingInput
                        placeholder={"Input Text"}
                        value={address}
                        label={"Address"}
                        lableColor={{ color: COLORS.RED_COLOR }}
                        onChangeText={_onChangeText(INPUT_TYPES.ADDRESS)}
                    />
                    <FloatingInput
                        placeholder={"Input Text"}
                        value={email}
                        label={"Email"}
                        lableColor={{ color: COLORS.RED_COLOR }}
                        onChangeText={_onChangeText(INPUT_TYPES.MAIL)}
                    />
                    <FloatingInput
                        placeholder={"Input Text"}
                        value={phone}
                        label={"Phone Number"}
                        lableColor={{ color: COLORS.RED_COLOR }}
                        onChangeText={_onChangeText(INPUT_TYPES.NUM)}
                    />
                </View>
                <Button
                    indicator={loader}
                    // disabled={!isVerified}
                    buttonStyle={styles.buttonStyle}
                    isDark
                    label={"SAVE"}
                    width={'90%'}
                    onPress={_saveProfile}
                />
            </View>
            {/* <CountryCodePicker
                showDialCode
                countryCode={dialCode}
                isVisible={isShowCountryModal}
                getCountry={_getCountry}
                closeCountryModal={_closeCountryModal}
            /> */}
        </>
    );
};

export default BankDetails;
