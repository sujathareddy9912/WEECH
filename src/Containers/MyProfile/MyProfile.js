import {
  Image,
  View,
  Text,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';
import {useDispatch} from 'react-redux';
import Toggle from 'react-native-toggle-element';
import ImageView from 'react-native-image-viewing';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  profleSetupAction,
  getUserStatsAction,
  getUserProfileAction,
  getRechargeAgency,
} from '../../Redux/Action';
import {styles} from './styles';
import {COLORS} from '../../Utils/colors';
import {SvgIcon} from '../../Component/icons';
import Header from '../../Component/header/Header';
import {IMAGE_URL} from '../../Services/Api/Common';
import ReferIcon from '../../Assets/Icons/Refer.svg';
import CrownIcon from '../../Assets/Icons/crown.svg';
import MoneyBag from '../../Assets/Icons/money_bag.svg';
import {formatNumber, imagePicker, openCamera, SCREEN_WIDTH} from '../../Utils/helper';
import RechargeIcon from '../../Assets/Icons/Recharge.svg';
import SettingsIcon from '../../Assets/Icons/Settings.svg';
import WeechaIcon from '../../Assets/Icons/WeechaIcon.svg';
import Separator from '../../Component/separator/Separator';
import MessageIcon from '../../Assets/Icons/MessageMini.svg';
import FreeCardsIcon from '../../Assets/Icons/FreeCards.svg';
import DiamondIcon from '../../Assets/Icons/DiamondIcon.svg';
import BriefcaseIcon from '../../Assets/Icons/briefcase.svg';
import ChevronIcon from '../../Assets/Icons/chevron-right.svg';
import AristocracyIcon from '../../Assets/Icons/Aristocracy.svg';
import {MyText, Touchable} from '../../Component/commomComponent';
import SelectImageDialog from '../../Component/SelectImageDialog';
import HostRegistrationIcon from '../../Assets/Icons/HostRegistration.svg';
import {isEdit} from '../../Actions/Profile/profile.actions';

const LINEARCOLOR = [COLORS.PINK, COLORS.BACKGROUND_COLOR_BLUE];
const LISTITEMS = [
  {title: 'Invite Friend', rightComponent: true, input: null},
  {title: 'Live Streaming Center', rightComponent: null, input: null},
  {
    title: 'Trade Account',
    rightComponent: true,
    tradeValue: 5145459,
    input: null,
  },
  {title: 'My Balance', rightComponent: true, myBalance: 898, input: null},
  {title: 'My Earnings', rightComponent: true, myEarning: 898, input: null},
  // {title: 'Recharge', rightComponent: null, input: null},
  // {title: 'Aristocracy', rightComponent: null, input: null},
  {
    title: 'My WeeCha Level',
    rightComponent: true,
    weechaLevel: 98,
    input: null,
  },
  {title: 'My Chat Price', rightComponent: null, input: null},
  {title: 'Free Cards', rightComponent: null, input: null},
  {title: 'Setting', rightComponent: null, input: null},
  {title: 'Location', rightComponent: true, input: true},
  {title: 'Language', rightComponent: true, input: true},
];

const MyProfile = props => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const refImageDialog = useRef();

  const [toggle, setToggle] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [userStats, setUserStats] = useState({});

  const [fileUpdateStatus, setFileUpdateStatus] = useState(false);
  const [fileBase64, setFileBase64] = useState('');
  const [coverPic, setCoverPic] = useState(profileData?.coverImage || '');
  const [visible, setIsVisible] = useState(false);

  const [showTrade, setShowTrade] = useState(false);

  const SOCIALDATA = [
    {title: 'Friends', value: userStats?.friends},
    {title: 'Following', value: userStats?.following},
    {title: 'Followers', value: userStats?.follower},
    {title: 'Group', value: userStats?.group},
    {title: 'Gift', value: userStats?.gifts},
  ];

  const getListIcon = type => {
    switch (type) {
      case 'Invite Friend':
        return <ReferIcon width={wp(6)} />;
      case 'Live Streaming Center':
        return <HostRegistrationIcon width={wp(6)} />;
      case 'Recharge':
        return <RechargeIcon width={wp(6)} />;
      case 'Aristocracy':
        return <AristocracyIcon width={wp(6)} />;
      case 'My WeeCha Level':
        return <WeechaIcon width={wp(6)} />;
      case 'My Chat Price':
        return <MessageIcon width={wp(6)} />;
      case 'Free Cards':
        return <FreeCardsIcon width={wp(6)} />;
      case 'My Balance':
        return <DiamondIcon width={wp(6)} />;
      case 'My Earnings':
        return <MoneyBag width={wp(6)} />;
      case 'Trade Account':
        return <BriefcaseIcon width={wp(6)} />;
      case 'Setting':
        return <SettingsIcon width={wp(6)} />;
      default:
        return null;
    }
  };

  const getRightComponent = (type, items) => {
    switch (type) {
      case 'Invite Friend':
        return (
          <View style={styles.rightComponent}>
            <SvgIcon.inviteFrnd width={wp(4)} />
          </View>
        );
      case 'Trade Account':
        return (
          <View style={styles.rightComponent}>
            <DiamondIcon width={wp(4)} />
            <MyText style={{marginLeft: wp(1)}}>
              {profileData?.tradeBalance}
            </MyText>
          </View>
        );
      case 'My Balance':
        return (
          <View style={styles.rightComponent}>
            <DiamondIcon width={wp(4)} />
            <MyText style={{marginLeft: wp(1)}}>
              {profileData?.myBalance}
            </MyText>
          </View>
        );
      case 'My Earnings':
        return (
          <View style={styles.rightComponent}>
            <MoneyBag width={wp(5)} />
            <MyText style={{marginLeft: wp(1)}}>
              {profileData?.myEarning}
            </MyText>
          </View>
        );
      case 'My WeeCha Level':
        return (
          <View style={[styles.weechaLevel]}>
            <CrownIcon width={wp(4)} />
            <MyText style={styles.chipsText}>
              {profileData?.level ? profileData?.level : 0}
            </MyText>
          </View>
        );
      default:
        return null;
    }
  };

  const getInputListComponent = (type, items) => {
    switch (type) {
      case 'Location':
        return (
          <View style={styles.locationContainer}>
            <View style={styles.locationInputHeader}>
              <Text style={styles.locationText}>Location</Text>
              <Text style={styles.currLocation}>My Current Location</Text>
            </View>
            <View style={styles.locationInput}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.location}>India</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Toggle
                  value={toggle}
                  onToggle={newState => setToggle(newState)}
                  trackBar={{
                    activeBackgroundColor: COLORS.SWITCH_ORANGE,
                    inActiveBackgroundColor: 'gray',
                    borderActiveColor: '#86c3d7',
                    borderInActiveColor: '#1c1c1c',
                    borderWidth: 0,
                    width: 40,
                    height: 10,
                    radius: 25,
                  }}
                  thumbStyle={styles.thumbStyle}
                  thumbButton={{
                    width: 20,
                    height: 20,
                    radius: 30,
                  }}
                  thumbActiveComponent={<View style={styles.thumbActive} />}
                  thumbInActiveComponent={<View style={styles.thumbInActive} />}
                />
              </View>
            </View>
          </View>
        );
      case 'Language':
        return (
          <View style={[styles.languageContainer, {marginBottom: wp(3)}]}>
            <View style={styles.locationInputHeader}>
              <Text style={styles.locationText}>Language</Text>
            </View>
            <View style={styles.locationInput}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.location}>English</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <ChevronIcon />
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const leftHeaderComponent = (
    <Touchable onPress={() => props.navigation?.goBack()}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesome5Icon
          name={'chevron-left'}
          color={COLORS.BLACK}
          size={wp(5)}
        />
        <Text style={[styles.edit, {marginLeft: 5}]}>Back</Text>
      </View>
    </Touchable>
  );

  const rightHeaderComponent = (
    <Touchable
      style={styles.rightHeaderComponent}
      onPress={() => {
        dispatch(isEdit(true));
        navigation.navigate('ProfileSetup');
      }}>
      <Entypo name={'pencil'} color={COLORS.BLACK} size={wp(5)} />
      <MyText style={styles.edit}>Edit</MyText>
    </Touchable>
  );
  const Invite = async () => {
    const url = await dynamicLinks().buildLink({
      link: 'https://google.com',
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://weecha.page.link/1gGs',
      // social: {
      //   title: 'Social Application',
      //   descriptionText: 'A Social Application',
      //   imageUrl
      // }
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      // analytics: {
      //   campaign: 'banner',
      // },
    });
    const options = Platform.select({
      default: {
        title: 'TITLE',
        subject: 'title',
        message: `${'message'} ${url}`,
      },
    });
    Share.open(options)
      .then(res => {})
      .catch(err => {});
  };

  const handleRedirection = (title, items) => {
    switch (title) {
      case 'Invite Friend':
        return Invite();
      case 'Trade Account':
        return navigation.navigate('TradeAccount', {
          inventoryAmt: profileData?.tradeBalance,
          _id: profileData?._id,
        });
      case 'My Balance':
        return navigation.navigate('Balance', {user: profileData});
      case 'My Earnings':
        return navigation.navigate('MyEarning', {
          weechaId: profileData?.userId,
        });
      case 'Setting':
        return navigation.navigate('Settings');
      case 'Free Cards':
        return navigation.navigate('FreeCard');
      case 'My Chat Price':
        return navigation.navigate('ChatPrice');
      case 'My WeeCha Level':
        return navigation.navigate('WeechaLevel', {profileData});
      case 'Live Streaming Center':
        return navigation.navigate('LiveStreamCenter', {
          agencyJoined: profileData?.agencyJoined,
        });
      default:
        break;
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserProfileAction(profile => setProfileData(profile)));
    }, []),
  );

  useEffect(() => {
    Object.keys(profileData).length && getUserStats();
  }, [profileData, userStats]);

  useEffect(() => {
    dispatch(
      getRechargeAgency(res => {
        const found = res?.user?.data?.some(el => el?._id === profileData?._id);
        setShowTrade(found);
      }),
    );
  }, []);

  const getUserStats = () => {
    dispatch(
      getUserStatsAction(
        {
          userId: profileData?._id,
        },
        result => {
          const formattedValue = formatNumber(result?.gifts);
          userStats['gifts'] = formattedValue;
          setUserStats({...result, gifts: formattedValue});
        },
      ),
    );
  };

  const getSocialMediaPress = key => {
    switch (key) {
      case 'Followers':
        return navigation.navigate('FollowerList');
      case 'Following':
        return navigation.navigate('FollowingList');
      case 'Group':
        return navigation.navigate('GroupCreation');
      case 'Friends':
        return navigation.navigate('FriendsList');
      case 'Gift':
        return navigation.navigate('MyGiftHistory');
      default:
        break;
    }
  };

  const _takePhoto = async () => {
    try {
      const file = await openCamera('photo', true);
      refImageDialog.current.close();
      setCoverPic(file.uri);
      setFileBase64(file.base64);
      setFileUpdateStatus(true);
      _uploadCoverPic(file.base64);
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
      _uploadCoverPic(file.base64);
    } catch (error) {
      setFileUpdateStatus(false);
    }
  };

  const _uploadCoverPic = file => {
    // setUploadCoverPicStatus(true);
    const param = {
      coverImage: file,
    };
    dispatch(
      profleSetupAction(param, data => {
        // setUploadCoverPicStatus(false);
        // if (data?.status) {
        //   dispatch(getUserProfileAction(profile => setProfileData(profile)));
        // }
      }),
    );
  };

  const _closeImagePicker = () => {
    refImageDialog.current.close();
  };

  const source = () => {
    if (coverPic) {
      if (fileUpdateStatus) return {uri: coverPic};
      else return {uri: `${IMAGE_URL}${coverPic}`};
    } else return '';
  };

  function checkURL(url) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView style={styles.container}>
        <Header
          title={null}
          // leftComponent={leftHeaderComponent}
          containerStyle={styles.headerContainer}
          rightComponent={rightHeaderComponent}
        />
        {/* <Touchable
          activeOpacity={0.9}
          onPress={() =>
            setIsVisible([
              {
                uri: checkURL(profileData?.coverImage)
                  ? IMAGE_URL + profileData?.coverImage
                  : profileData?.coverImage,
              },
            ])
          }> */}
        <LinearGradient colors={LINEARCOLOR} style={styles.coverImage}>
          {(!!coverPic || !!profileData?.coverImage) && (
            <ImageBackground
              source={{
                uri: !!coverPic
                  ? coverPic
                  : IMAGE_URL + profileData?.coverImage,
              }}
              resizeMode={'cover'}
              style={styles.coverImage}
            />
          )}
        </LinearGradient>

        {/* </Touchable> */}
        <View style={styles.profileInfoContainer}>
          <Touchable
            onPress={() => {
              refImageDialog.current.open();
            }}
            style={styles.cameraCon}>
            <FontAwesome5Icon
              name={'camera'}
              color={COLORS.WHITE}
              size={wp(5)}
            />
          </Touchable>
          <LinearGradient colors={LINEARCOLOR} style={styles.avatarContainer}>
            <Image
              source={{
                uri: IMAGE_URL + profileData?.profile,
              }}
              style={styles.avatarImage}
            />
          </LinearGradient>
          <MyText style={styles.name}>{profileData?.name}</MyText>
          <MyText style={styles.weechaId}>
            Weecha Id : {profileData?.userId}
          </MyText>
          <View style={styles.socialInfoContainer}>
            {SOCIALDATA.map(({title, value}) => (
              <Touchable
                onPress={() => getSocialMediaPress(title)}
                style={styles.socialInfo}>
                <MyText style={styles.infoNumeric}>{value}</MyText>
                <MyText style={styles.socialTitle}>{title}</MyText>
              </Touchable>
            ))}
          </View>
        </View>
        <Separator style={{marginBottom: wp(1)}} />
        <View style={styles.list}>
          {LISTITEMS.map(({title, rightComponent, ...items}) => (
            <>
              {!items?.input ? (
                title === 'Free Cards' ? (
                  profileData?.gender === 'male' &&
                  !profileData?.agencyJoined && (
                    <Touchable
                      onPress={() => handleRedirection(title, items)}
                      style={styles.listItem}>
                      <View style={styles.iconLabelContainer}>
                        {getListIcon(title)}
                        <MyText style={styles.listLabel}>{title}</MyText>
                      </View>
                      {!rightComponent ? (
                        <ChevronIcon />
                      ) : (
                        getRightComponent(title, items)
                      )}
                    </Touchable>
                  )
                ) : title === 'Trade Account' ? (
                  profileData?.tradeAccountOn && (
                    <Touchable
                      onPress={() => handleRedirection(title, items)}
                      style={styles.listItem}>
                      <View style={styles.iconLabelContainer}>
                        {getListIcon(title)}
                        <MyText style={styles.listLabel}>{title}</MyText>
                      </View>
                      {!rightComponent ? (
                        <ChevronIcon />
                      ) : (
                        getRightComponent(title, items)
                      )}
                    </Touchable>
                  )
                ) : (
                  <Touchable
                    onPress={() => handleRedirection(title, items)}
                    style={styles.listItem}>
                    <View style={styles.iconLabelContainer}>
                      {getListIcon(title)}
                      <MyText style={styles.listLabel}>{title}</MyText>
                    </View>
                    {!rightComponent ? (
                      <ChevronIcon />
                    ) : (
                      getRightComponent(title, items)
                    )}
                  </Touchable>
                )
              ) : (
                getInputListComponent(title, items)
              )}
            </>
          ))}
        </View>
        <SelectImageDialog
          key="imageRef"
          ref={refImageDialog}
          onPressTakePhoto={_takePhoto}
          onPressChooseFromLibrary={_chooseFromLib}
          onPressCancel={_closeImagePicker}
        />
      </ScrollView>
      <ImageView
        images={visible}
        imageIndex={0}
        visible={visible.length ? true : false}
        onRequestClose={() => setIsVisible([])}
      />
    </>
  );
};

export default MyProfile;

// Useable things
