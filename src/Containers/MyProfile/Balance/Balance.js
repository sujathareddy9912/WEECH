import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Alert,
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import {SvgIcon} from '../../../Component/icons';
import Header from '../../../Component/header/Header';
import {IMAGE_URL, URL, userApiClient} from '../../../Services/Api/Common';
import DiamondGold from '../../../Assets/Icons/DiamondGold.svg';
import BackArrowIcon from '../../../Assets/Icons/WhiteBackIcon.svg';
import {
  HelperService,
  serviceConst,
} from '../../../Services/Utils/HelperService';
import {MyImage, MyText, Touchable} from '../../../Component/commomComponent';
import {
  getDiamondList,
  getUserProfileAction,
  rechargeUserBalanceAction,
} from '../../../Redux/Action';
import {dynamicSize} from '../../../Utils/responsive';
import {ActivityIndicator} from 'react-native-paper';

const Balance = ({
  navigation,
  route: {
    params: {user},
  },
}) => {
  const [diamond, setDiamond] = useState([]);
  const [topUpOpt, setTopUpOpt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const dispatch = useDispatch();

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.BLACK}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <Text>Back</Text>
    </TouchableOpacity>
  );

  const fetchPaymentSheetParams = async amount => {
    const endPoint = 'income/make_payment';
    const param = {
      amount: amount * 100,
    };

    try {
      const response = await userApiClient.post(endPoint, param, {
        headers: {
          Authorization: serviceConst.token,
        },
      });
      const {paymentIntent, ephemeralKey, customer} = await response.data.data;

      return {
        customer,
        ephemeralKey,
        paymentIntent,
      };
    } catch (error) {
      console.log('test error', error);
    }
  };

  const handlePay = async (price, diamond) => {
    setLoading(true);

    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams(price);

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Weecha, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: false, // use test environment
      },
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: profileData?.name,
      },
    });

    if (!error) {
      openPaymentSheet(customer, diamond);
    }

    // var options = {
    //   description: 'Weecha Official Balance',
    //   image: `${IMAGE_URL}${profileData?.user?.profile}`,
    //   currency: 'INR',
    //   key: 'rzp_test_QPwCAxquDBdNV0', // Your api key
    //   amount: price * 100,
    //   name: profileData?.user?.name,
    //   prefill: {
    //     email: 'void@razorpay.com',
    //     contact: '9191919191',
    //     name: 'Razorpay Software',
    //   },
    //   theme: {color: '#2B2C63'},
    // };
    // RazorpayCheckout.open(options)
    //   .then(data => {
    //     // handle success
    //     const recData = {
    //       userId: profileData?._id,
    //       amount: price * 1000,
    //       type: 'ONLINE',
    //       txnNumber: data.razorpay_payment_id,
    //     };
    //     dispatch(
    //       rechargeUserBalanceAction(recData, res => {
    //         console.log(res);
    //       }),
    //     );
    //     HelperService.showToast(`Success: ${data.razorpay_payment_id}`);
    //   })
    //   .catch(error => {
    //     // handle failure
    //     HelperService.showToast(`Error: ${error.code} | ${error.description}`);
    //   });
  };

  const openPaymentSheet = async (customerID, diamond) => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`${error.code}`, error.message);
      setLoading(false);
    } else {
      const recData = {
        userId: profileData?._id,
        amount: +diamond,
        type: 'ONLINE',
        txnNumber: customerID,
      };

      dispatch(
        rechargeUserBalanceAction(recData, res => {
          Alert.alert('Success', 'Your order is confirmed!');
        }),
      );

      dispatch(
        getUserProfileAction(profile => {
          setProfileData(profile);
          setLoading(false);
        }),
      );
    }
  };

  const renderItem = ({item}) => {
    return (
      <Touchable
        onPress={() => handlePay(item?.price, item?.diamond)}
        activeOpacity={0.5}
        style={styles.card}>
        <View style={styles.circle}>
          <MyImage
            resizeMode={'contain'}
            style={styles.diamondIcon}
            source={require('../../../Assets/Images/doubleDiamond.png')}
          />
        </View>
        <View style={styles.diamondInfo}>
          <MyText style={styles.offerDiamond}>{item?.offeredDiamond}</MyText>
          <MyText style={styles.diamond}>{item?.diamond}</MyText>
          <View style={styles.diamondPriceContainer}>
            <MyText style={styles.diamondText}>
              <MyText style={styles.diamondText}>$ </MyText>
              {item?.price}
            </MyText>
          </View>
        </View>
      </Touchable>
    );
  };

  const handleAgreement = () => {};

  useEffect(() => {
    dispatch(
      getDiamondList(list => {
        setDiamond(list?.data);
      }),
    );
  }, []);

  useEffect(() => {
    if (profileData?.myRecharge / 1000 >= 300) {
      setTopUpOpt(true);
    }
  }, []);

  return (
    <>
      <StripeProvider publishableKey="pk_live_51O4zLFHznJW0pWXyRUwiC0dwg0r9uALKA855cn3jauWV3QvYB1jXFkiYvCKMR1KQLCnde71sUBFLJQwsbSJfLirG00EPDURDNq">
        <LinearGradient
          style={styles.container}
          colors={['#753FC1', '#0D1177']}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          {loading && (
            <View
              style={{
                zIndex: 1,
                width: '100%',
                height: '100%',
                position: 'absolute',
                alignItems: 'center',
                opacity: 0.7,
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
            </View>
          )}

          <Header
            title={String('My Balance').toUpperCase()}
            leftComponent={leftHeaderComponent}
            containerStyle={styles.header}
            titleStyle={styles.title}
          />
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'space-between',
              paddingBottom: wp(10),
            }}>
            <View>
              <View style={styles.inventoryInfo}>
                <DiamondGold height={26} width={26} />
                <MyText style={styles.heading}>My Balance</MyText>
              </View>
              <MyText style={styles.amount}>{profileData?.myBalance}</MyText>
              <FlatList
                data={diamond}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.FlatList}
              />
            </View>
            <View style={styles.footer}>
              {topUpOpt && (
                <Touchable
                  onPress={() => navigation.navigate('AgencyList')}
                  style={styles.topUpAgencyOpt}>
                  <MyText style={[styles.agencyText]}>Top-Up Agency</MyText>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MyText
                      style={[
                        styles.agencyText,
                        {
                          color: '#9C9C9C',
                          alignItems: 'center',
                          marginRight: wp(1),
                        },
                      ]}>
                      For more discount
                    </MyText>
                    <SvgIcon.RightArrowIcon />
                  </View>
                </Touchable>
              )}

              <MyText style={styles.agreement}>
                Agree to{' '}
                <MyText
                  onPress={() => navigation.navigate('UserAgreement')}
                  style={[styles.agreement, {color: COLORS.GOLD}]}>
                  User Agreements{' '}
                </MyText>
                and{' '}
                <MyText
                  onPress={() => navigation.navigate('PrivacyPolicy')}
                  style={[styles.agreement, {color: COLORS.GOLD}]}>
                  Privacy Policy
                </MyText>
              </MyText>
            </View>
          </ScrollView>
        </LinearGradient>
      </StripeProvider>
    </>
  );
};

export default Balance;
