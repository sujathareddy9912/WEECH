import React, {useEffect, useMemo, useState} from 'react';
import {Linking} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Containers/Splash';
import WelcomeScreen from '../Containers/WelcomeScreen';
import EditProfile from '../Containers/EditProfile';
import InterestScreen from '../Containers/Interest';
import SearchFriend from '../Containers/SearchFriend';
import ViewProfile from '../Containers/ViewProfile';
import Chat from '../Containers/Chat';
import TabNav from './TabNav';
import VideoCall from '../Containers/VideoCall';
import AudioCall from '../Containers/AudioCall';
import InAppCallReceivingContext from '../Contexts/InAppCallReceiving';
// import RtmAdapter from '../Component/InAppCallReceivingManager';
import NewRegistration from '../Containers/NewRegistration';
import Landing from '../Containers/Landing';
import ForgotPassword from '../Containers/ForgotPassword';
import LinkMail from '../Containers/MyProfile/LinkMail';
import ProfileSetup from '../Containers/ProfileSetup';
import {navigationRef, routeNameRef} from './navigationHelper';
import AuthStack from './authStack';
import {CALLING_STATUS, getData} from '../Utils/helper';
import {LOCAL_KEY} from '../Utils/localStorage';
import {serviceConst} from '../Services/Utils/HelperService';
import {
  getUserProfileAction,
  incomingCallDataAction,
  incomingCallPopupAction,
} from '../Redux/Action';
import Inbox from '../Containers/Inbox/Inbox';
import CallModal from '../Component/CallModal';
import LetsGoLive from '../Containers/LetsGoLive';
import {useDispatch, useSelector} from 'react-redux';
import {incomingCallQuery} from '../firebase/nodeQuery';
import {InboxNavigator} from '../Containers/Inbox/Inbox';
import Balance from '../Containers/MyProfile/Balance/Balance';
import PersonalChat from '../Containers/Inbox/chats/giftedChat/Chat';
import InviteFriend from '../Containers/MyProfile/InviteFriend/InviteFriend';
import TradeAccount from '../Containers/MyProfile/TradeAccount/TradeAccount';
import Transactions from '../Containers/MyProfile/TradeAccount/Transactions/Transactions';
import Settings from '../Containers/MyProfile/Settings/Settings';
import AccountSecurity from '../Containers/MyProfile/AccountSecurity/AccountSecurity';
import BlockList from '../Containers/MyProfile/BlockList/BlockList';
import HelpCenter from '../Containers/MyProfile/HelpCenter/HelpCenter';
import FreeCard from '../Containers/MyProfile/FreeCard/FreeCard';
import ChatPrice from '../Containers/MyProfile/ChatPrice/ChatPrice';
import MyEarning from '../Containers/MyProfile/MyEarnings/MyEarnings';
import LiveEnded from '../Containers/MyProfile/LiveEnded/LiveEnded';
import AgencyList from '../Containers/MyProfile/Balance/AgencyList/AgencyList';
import ChatSupport from '../Containers/MyProfile/Balance/ChatSupport/ChatSupport';
import WeechaLevel from '../Containers/MyProfile/weechaLevel/WeechaLevel';
import UserProfile from '../Containers/UserProfile';
import EarningDetails from '../Containers/MyProfile/EarningDetails/EarningDetails';
import Settlement from '../Containers/MyProfile/SettlementDetails/Settlement';
import CustomerCare from '../Containers/MyProfile/CustomerCare/CustomerCare';
import Description from '../Containers/MyProfile/HelpCenter/description/Description';
import FollowerList from '../Containers/MyProfile/FollowerList/FollowerList';
import FollowingList from '../Containers/MyProfile/FollowingList/FollowingList';
import ChangeMail from '../Containers/MyProfile/ChangeMail';
import {
  GroupType,
  GroupInfo,
  GroupChat,
  GroupDetails,
  GroupCreation,
  GroupInvite,
} from '../Containers/MyProfile/Groups';
import FriendsList from '../Containers/MyProfile/FriendsList/FriendsList';
import LiveStreamCenter from '../Containers/MyProfile/LiveStreamCenter/LiveStreamCenter';
import FreeChatInvites from '../Containers/MyProfile/ChatPrice/SelectFriend/SelectFriends';
import AddBankDetailPage from '../Containers/MyProfile/LiveStreamCenter/AddBankDetails';
import ShareWeechaFriends from '../Containers/SelectFriend/SelectFriends';
import AboutWeecha from '../Containers/MyProfile/Settings/AboutWeecha/AboutWeecha';
import PrivacyPolicy from '../Containers/MyProfile/Settings/PrivacyPolicy/PrivacyPolicy';
import UserAgreement from '../Containers/MyProfile/Settings/UserAgreement/UserAgreement';
import SearchStream from '../Containers/SearchStream/SearchStream';
import ChoosePaymentType from '../Containers/MyProfile/LiveStreamCenter/ChoosePaymentType';
import PaymentMethodDetail from '../Containers/MyProfile/LiveStreamCenter/PaymentMethodDetail';
import StartFaceVerification from '../Containers/MyProfile/LiveStreamCenter/StartFaceVerification';
import VerificationStatus from '../Containers/MyProfile/LiveStreamCenter/VerificationStatus';
import BankDetails from '../Containers/MyProfile/BankDetails/BankDetails';
import TabViewExample from '../Containers/ProfileSetup/ProfileTab';
import FavouriteImages from '../Containers/ProfileSetup/favouriteImages';
import FavouriteVideos from '../Containers/ProfileSetup/favouriteVideos';
import MyGiftHistory from '../Containers/Gift/MyGiftHistory';
import SelectWeeChaGroup from '../Containers/SelectWeeChaGroup/SelectWeeChaGroup';
import HostTermsAndConditions from '../Containers/MyProfile/Settings/HostTermsAndConditions/HostTermsAndConditions';
import WeeChaGuideLine from '../Containers/MyProfile/Settings/WeeChaGuideLine/WeeChaGuideLine';

import messaging from '@react-native-firebase/messaging';
import Withdrawal from '../Containers/MyProfile/Withdrawal/Withdrawal';

// const rtmAdaptor = new RtmAdapter();
export const Stack = createStackNavigator();

function AppStack() {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;
  const {incomingCallPopup} = state.callReducer;

  const [isLoading, setLoading] = useState(true);
  const [loginToken, setToken] = useState(null);
  const [profileStatus, setProfileStatus] = useState(null);

  // LINKING

  const linking = {
    prefixes: ['weecha://'],
    config: {
      screens: {
        MainTabNavigation: 'MainTabNavigation',
        AuthStack: {
          screens: {
            Login: 'Login',
          },
        },
      },
    },
  };

  const notificationNavigation = async result => {
    const token = await getData(LOCAL_KEY.TOKEN);
    const {data} = result;

    if (data.type === 'moment' && token) {
      Linking.openURL('weecha://MainTabNavigation');
    } else {
      Linking.openURL('weecha://Login');
    }
  };

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'When the application is running, but in the background',
      remoteMessage,
    );
    if (remoteMessage) {
      notificationNavigation(remoteMessage);
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        notificationNavigation(remoteMessage);
      }
    });

  useEffect(() => {
    const _fetchLoginToken = async () => {
      const profileSetupStatus = await getData(LOCAL_KEY.PROFILE_SETUP_STATUS);
      const authToken = await getData(LOCAL_KEY.TOKEN);
      if (authToken) {
        profileSetupStatus == 'true'
          ? setProfileStatus(true)
          : setProfileStatus(false);
        serviceConst.token = authToken;
        dispatch(getUserProfileAction(() => {}));
        setToken(authToken);
        setLoading(false);
      } else setLoading(false);
    };

    _fetchLoginToken();
  }, [loginToken]);

  useEffect(() => {
    if (userLoginList?.user?._id) {
      incomingCallQuery(userLoginList?.user?._id).on('value', snapShot => {
        if (
          snapShot.val() &&
          snapShot?.val()?.status == CALLING_STATUS.CALLING
        ) {
          dispatch(incomingCallPopupAction(true));
          dispatch(incomingCallDataAction(snapShot.val()));
        }
      });
    }
  }, [userLoginList?.user?._id]);

  const initialRouteName = useMemo(() => {
    if (loginToken) {
      return profileStatus ? 'ProfileSetup' : 'MainTabNavigation';
    } else return 'AuthStack';
  }, [loginToken]);

  const _onReady = () => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  };

  const _onStateChange = async () => {
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    routeNameRef.current = currentRouteName;
  };

  // if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={_onReady}
      onStateChange={_onStateChange}>
      {incomingCallPopup ? <CallModal isVisible={incomingCallPopup} /> : null}
      {/* <InAppCallReceivingContext.Provider value={rtmAdaptor}> */}
      <Stack.Navigator
        // initialRouteName={initialRouteName}
        initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ProfileSetup"
          component={TabViewExample}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="MainTabNavigation"
          component={TabNav}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="ViewProfile"
          component={ViewProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AudioCall"
          component={AudioCall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Inbox"
          component={InboxNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalChat"
          component={PersonalChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InviteFriend"
          component={InviteFriend}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TradeAccount"
          component={TradeAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Balance"
          component={Balance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountSecurity"
          component={AccountSecurity}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlockList"
          component={BlockList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FreeCard"
          component={FreeCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatPrice"
          component={ChatPrice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyEarning"
          component={MyEarning}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LiveEnded"
          component={LiveEnded}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AgencyList"
          component={AgencyList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatSupport"
          component={ChatSupport}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WeechaLevel"
          component={WeechaLevel}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EarningDetails"
          component={EarningDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settlement"
          component={Settlement}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Withdrawal"
          component={Withdrawal}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CustomerCare"
          component={CustomerCare}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Description"
          component={Description}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FollowerList"
          component={FollowerList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FollowingList"
          component={FollowingList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FriendsList"
          component={FriendsList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupCreation"
          component={GroupCreation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupInfo"
          component={GroupInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupType"
          component={GroupType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupDetails"
          component={GroupDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupInvite"
          component={GroupInvite}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupChat"
          component={GroupChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LiveStreamCenter"
          component={LiveStreamCenter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddBankDetailPage"
          component={AddBankDetailPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerificationStatus"
          component={VerificationStatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChoosePaymentType"
          component={ChoosePaymentType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentMethodDetail"
          component={PaymentMethodDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StartFaceVerification"
          component={StartFaceVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FreeChatInvites"
          component={FreeChatInvites}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShareWeechaFriends"
          component={ShareWeechaFriends}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectWeeChaGroup"
          component={SelectWeeChaGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LinkMail"
          component={LinkMail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangeMail"
          component={ChangeMail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutWeecha"
          component={AboutWeecha}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserAgreement"
          component={UserAgreement}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WeeChaGuideLine"
          component={WeeChaGuideLine}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HostTermsAndConditions"
          component={HostTermsAndConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchStream"
          component={SearchStream}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BankDetails"
          component={BankDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FavouriteImages"
          component={FavouriteImages}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FavouriteVideos"
          component={FavouriteVideos}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyGiftHistory"
          component={MyGiftHistory}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {/* </InAppCallReceivingContext.Provider> */}
    </NavigationContainer>
  );
}

export default AppStack;
