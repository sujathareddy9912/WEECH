import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PlusIcon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LiveIcon from '../Assets/Icons/icon_live_ftr.svg';
import HomeIcon from '../Assets/Icons/icon_home_ftr.svg';
import ProfileIcon from '../Assets/Icons/icon_profile_ftr.svg';
import UnionIcon from '../Assets/Icons/Union_18.svg';
import InboxIcon from '../Assets/Icons/InboxIcon.svg';
import NotificationsIcon from '../Assets/Icons/Notifications.svg';
import FilterIcon from '../Assets/Icons/filter.svg';
import EyeIcon from '../Assets/Icons/eye.svg';
import DummyPage from '../Containers/DummyPage';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import All from '../Containers/Discover/All';
import MyProfile from '../Containers/MyProfile/MyProfile';
import InAppCallReceiving from '../Contexts/InAppCallReceiving';
import LiveUserListing from '../Containers/LiveScreen/LiveUserListing';
import LetsGoLive from '../Containers/LetsGoLive';
import {Stack} from '.';
import LiveStreaming from '../Containers/LiveStreaming';
import LiveStreamingUserList from '../Containers/LiveStreamingUsersList';
import {useDispatch, useSelector} from 'react-redux';
import DiscoverScreen from '../Containers/Discover/DiscoverScreen';
import UserProfile from '../Containers/UserProfile';
import {InboxNavigator} from '../Containers/Inbox/Inbox';
import {navigationRef, routeNameRef} from './navigationHelper';
import {COLORS} from '../Utils/colors';
import {FONT_FAMILY} from '../Utils/fontFamily';
import {
  deleteRecentChatModalAction,
  followingListModalAction,
} from '../Redux/Action';
import {MyText, Touchable} from '../Component/commomComponent';
import {dynamicSize} from '../Utils/responsive';
import {strings} from '../localization/config';
import PersonalChat from '../Containers/Inbox/chats/giftedChat/Chat';

const Tab = createBottomTabNavigator();
const DiscoverTab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();

function BottomTabBar(props) {
  const focusedOptions =
    props.descriptors[props.state.routes[props.state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        width: wp('90%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: wp('8%'),
        position: 'absolute',
        bottom: hp('3%'),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        elevation: 4,
        shadowColor: 'grey',
        shadowOffset: {
          height: 2,
          width: 2,
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
      }}>
      {props.state.routes.map((item, index) => {
        const {options} = props.descriptors[item.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : item.name;

        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: item.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(item.name);
          }
        };

        return (
          <TouchableOpacity
            style={{
              width: '20%',
              paddingVertical: hp('2%'),
              borderRadius: wp('8%'),
            }}
            key={index}
            onPress={onPress}
            // onPress={() => {
            //   // Navigate using the `navigation` prop that you received
            //   // props.navigation.navigate(item.name);
            // }}
          >
            <View style={{alignItems: 'center'}}>
              {label === 'LiveSection' ? (
                <HomeIcon width={wp('6%')} height={wp('6%')} fill={'#A3A8B4'} />
              ) : label === 'Profile' ? (
                <ProfileIcon
                  width={wp('6%')}
                  height={wp('6%')}
                  fill={'#A3A8B4'}
                />
              ) : label === 'DiscoverScreen' ? (
                <LiveIcon width={wp('6%')} height={wp('6%')} />
              ) : label === 'Inbox' ? (
                <InboxIcon
                  width={wp('6%')}
                  height={wp('6%')}
                  fill={'#A3A8B4'}
                />
              ) : (
                <UnionIcon
                  width={wp('6%')}
                  height={wp('6%')}
                  fill={'#A3A8B4'}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
// function DiscoverTabBar(props) {
//   const [isVisible, setIsVisible] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState('India');
//   const [countries, setCountries] = useState([
//     {
//       name: 'Bangladesh',
//       selected: true,
//     },
//     {
//       name: 'England',
//       selected: false,
//     },
//     {
//       name: 'Australia',
//       selected: false,
//     },
//     {
//       name: 'USA',
//       selected: false,
//     },
//     {
//       name: 'India',
//       selected: false,
//     },
//     {
//       name: 'Pakistan',
//       selected: false,
//     },
//     {
//       name: 'Nepal',
//       selected: false,
//     },
//     {
//       name: 'Russia',
//       selected: false,
//     },
//   ]);
//   return (
//     <>
//       <LinearGradient
//         colors={['rgba(72, 101, 255, 1)', 'rgba(249, 70, 253, 1)']}
//         style={{
//           flexDirection: 'row',
//           width: wp('100%'),
//           backgroundColor: 'white',
//           alignSelf: 'center',
//           paddingTop: hp('8%'),
//           paddingBottom: hp('1.5%'),
//           alignItems: 'center',
//           elevation: 4,
//           flexDirection: 'row',
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             width: wp('80%'),
//             justifyContent: 'space-evenly',
//           }}>
//           {props.state.routes.map((item, index) => {
//             return (
//               <>
//                 {item.name === 'All' ? (
//                   <TouchableOpacity
//                     style={{alignSelf: 'baseline'}}
//                     onPress={() => {
//                       // Navigate using the `navigation` prop that you received
//                       props.navigation.navigate(item.name);
//                     }}>
//                     <Text
//                       style={[
//                         {
//                           alignSelf: 'center',
//                           paddingVertical: 2,
//                           paddingHorizontal: 10,
//                           borderRadius: wp('5%'),
//                           fontSize: 14,
//                           fontFamily: 'Gilroy-Regular',
//                         },
//                         props.state.index === 0
//                           ? {backgroundColor: 'white', color: '#000'}
//                           : {color: '#fff'},
//                       ]}>
//                       ALL
//                     </Text>
//                   </TouchableOpacity>
//                 ) : item.name === 'Nearby' ? (
//                   <TouchableOpacity
//                     style={{alignSelf: 'baseline'}}
//                     onPress={() => {
//                       // Navigate using the `navigation` prop that you received
//                       props.navigation.navigate(item.name);
//                     }}>
//                     <Text
//                       style={[
//                         {
//                           alignSelf: 'center',
//                           paddingVertical: 2,
//                           paddingHorizontal: 10,
//                           borderRadius: wp('5%'),
//                           fontSize: 14,
//                           fontFamily: 'Gilroy-Regular',
//                         },
//                         props.state.index === 1
//                           ? {backgroundColor: 'white', color: '#000'}
//                           : {color: '#fff'},
//                       ]}>
//                       Nearby
//                     </Text>
//                   </TouchableOpacity>
//                 ) : item.name === 'Popular' ? (
//                   <TouchableOpacity
//                     style={{alignSelf: 'baseline'}}
//                     onPress={() => {
//                       // Navigate using the `navigation` prop that you received
//                       props.navigation.navigate(item.name);
//                     }}>
//                     <Text
//                       style={[
//                         {
//                           alignSelf: 'center',
//                           paddingVertical: 2,
//                           paddingHorizontal: 10,
//                           borderRadius: wp('5%'),
//                           fontSize: 14,
//                           fontFamily: 'Gilroy-Regular',
//                         },
//                         props.state.index === 2
//                           ? {backgroundColor: 'white', color: '#000'}
//                           : {color: '#fff'},
//                       ]}>
//                       Popular
//                     </Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     style={{alignSelf: 'baseline'}}
//                     onPress={() => {
//                       // Navigate using the `navigation` prop that you received
//                       props.navigation.navigate(item.name);
//                     }}>
//                     <Text
//                       style={[
//                         {
//                           alignSelf: 'center',
//                           paddingVertical: 2,
//                           paddingHorizontal: 10,
//                           borderRadius: wp('5%'),
//                           fontSize: 14,
//                           fontFamily: 'Gilroy-Regular',
//                         },
//                         props.state.index === 3
//                           ? {backgroundColor: 'white', color: '#000'}
//                           : {color: '#fff'},
//                       ]}>
//                       PK
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </>
//             );
//           })}
//         </View>
//         <TouchableOpacity
//           style={{width: wp('10%')}}
//           onPress={() => {
//             // Navigate using the `navigation` prop that you received
//             //   props.navigation.navigate(item.name);
//             setIsVisible(!isVisible);
//           }}>
//           <FilterIcon width={wp('6%')} height={wp('6%')} fill="white" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{width: wp('10%')}}
//           onPress={() => {
//             // Navigate using the `navigation` prop that you received
//             //   props.navigation.navigate(item.name);
//             props.navigation.openDrawer();
//           }}>
//           <NotificationsIcon width={wp('6%')} height={wp('6%')} fill="white" />
//         </TouchableOpacity>
//       </LinearGradient>
//       <Modal
//         isVisible={isVisible}
//         style={{margin: 0, padding: 0, justifyContent: 'flex-end'}}>
//         <View
//           style={{
//             height: hp('45%'),
//             backgroundColor: 'white',
//             borderTopLeftRadius: hp('5%'),
//             borderTopRightRadius: hp('5%'),
//           }}>
//           <Text
//             style={{
//               fontSize: 20,
//               fontFamily: 'Gilroy-SemiBold',
//               marginTop: '5%',
//               marginLeft: 20,
//             }}>
//             Country/Region
//           </Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginHorizontal: 20,
//               flexWrap: 'wrap',
//               marginTop: 10,
//               height: '60%',
//             }}>
//             {countries.map((item, index) => {
//               return (
//                 <View style={{width: '33.33%', marginTop: 10}}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setSelectedCountry(item.name);
//                     }}
//                     style={[
//                       {
//                         borderWidth: 1,
//                         width: '95%',
//                         alignSelf: 'center',
//                         paddingVertical: 5,
//                         paddingHorizontal: 5,
//                         borderRadius: 100,
//                       },
//                       selectedCountry === item.name
//                         ? {borderColor: 'rgba(243, 41, 101, 1)'}
//                         : {borderColor: 'rgba(196, 196, 196, 1)'},
//                     ]}>
//                     <Text
//                       style={[
//                         {
//                           fontFamily: 'Gilroy-Regular',
//                           fontSize: 15,
//                           textAlign: 'center',
//                         },
//                         selectedCountry === item.name
//                           ? {color: 'rgba(243, 41, 101, 1)'}
//                           : {color: 'rgba(196, 196, 196, 1)'},
//                       ]}>
//                       {item.name}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               );
//             })}
//           </View>
//           <TouchableOpacity
//             onPress={() => {
//               setIsVisible(!isVisible);
//             }}>
//             <LinearGradient
//               colors={['rgba(251, 81, 96, 1)', 'rgba(237, 46, 76, 1)']}
//               style={{
//                 width: '90%',
//                 alignSelf: 'center',
//                 paddingVertical: hp('1.5%'),
//                 borderRadius: 100,
//               }}>
//               <Text
//                 style={{
//                   fontFamily: 'Gilroy-Regular',
//                   fontSize: 15,
//                   alignSelf: 'center',
//                   color: '#fff',
//                 }}>
//                 OK
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </>
//   );
// }

const LiveUserStack = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="LiveSection"
        component={LiveUserListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LetsGoLive"
        component={LetsGoLive}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="liveStreaming"
        component={LiveStreaming}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="liveStreamingUserList"
        component={LiveStreamingUserList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DummyPageStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Online" component={DummyPage} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="PersonalChat" component={PersonalChat} />
    </Stack.Navigator>
  );
};

const InboxStack = () => {
  const dispatch = useDispatch();

  const onPlusChatIcon = () => dispatch(followingListModalAction(true));

  const _getRightHeaderComponent = () => {
    const activeScreen = navigationRef.current.getCurrentRoute().name;
    if (activeScreen == 'Chat')
      return (
        <Touchable
          style={{
            padding: dynamicSize(5),
            marginRight: dynamicSize(10),
          }}
          onPress={onPlusChatIcon}>
          <PlusIcon name="add" size={wp(6)} color={COLORS.WHITE} />
        </Touchable>
      );
    else if (activeScreen == 'Recents')
      return (
        <Touchable
          style={{padding: dynamicSize(10)}}
          onPress={() => dispatch(deleteRecentChatModalAction(true))}>
          <MyText
            style={{
              fontSize: 15,
              color: COLORS.WHITE,
              fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
            }}>
            {strings('chat.deleteAll')}
          </MyText>
        </Touchable>
      );
  };

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Inbox"
        component={InboxNavigator}
        options={{
          headerTitleAlign: 'center',
          title: 'INBOX',
          headerTintColor: COLORS.WHITE,
          headerStyle: {
            backgroundColor: COLORS.LIGHT_BABY_PINK,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => null,
          headerRight: () => _getRightHeaderComponent(),
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={MyProfile} />
    </Stack.Navigator>
  );
};

const getTabBarVisible = route => {
  const routeName =
    getFocusedRouteNameFromRoute(route) ||
    'Inbox' ||
    'LiveSection' ||
    'Online' ||
    'DiscoverScreen' ||
    'PartyRooms' ||
    'Profile';

  const showOnScreens = [
    'Inbox',
    'LiveSection',
    'Online',
    'DiscoverScreen',
    'PartyRooms',
    'Profile',
  ];
  if (showOnScreens.indexOf(routeName) > -1) return true;
  else return false;
};

export default TabNav = () => {
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const isMale = useMemo(() => {
    return userLoginList?.user?.gender?.toLowerCase() == 'male';
  }, [userLoginList?.user?.gender]);

  return (
    <Tab.Navigator
      initialRouteName="LiveSection"
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name={'LiveSection'}
        component={LiveUserStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name={'Online'}
        component={DummyPageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      {isMale ? (
        <Tab.Screen
          name={'DiscoverScreen'}
          component={HomeStack}
          options={({route}) => ({
            tabBarVisible: getTabBarVisible(route),
          })}
        />
      ) : null}
      <Tab.Screen
        name={'Inbox'}
        component={InboxStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
    </Tab.Navigator>
  );
};

const DrawerContent = () => {
  const [tab, setTab] = useState(0);
  return (
    <SafeAreaView
      style={{
        width: '100%',
        overflow: 'hidden',
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: wp('10%'),
        borderBottomLeftRadius: wp('10%'),
      }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Gilroy-Bold',
          color: 'rgba(172, 172, 172, 1)',
          marginLeft: '5%',
          marginBottom: hp('3%'),
        }}>
        Notification
      </Text>
      <View
        style={{
          width: '90%',
          borderWidth: 1,
          borderColor: 'rgba(243, 41, 101, 1)',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignSelf: 'center',
          borderRadius: 100,
        }}>
        <TouchableOpacity
          onPress={() => setTab(0)}
          style={[
            {width: '25%', borderRadius: 100, paddingVertical: 3},
            tab === 0 ? {backgroundColor: 'rgba(243, 41, 101, 1)'} : {},
          ]}>
          <Text
            style={[
              {textAlign: 'center', fontSize: 14, fontFamily: 'Gilroy-Bold'},
              tab === 0 ? {color: '#fff'} : {color: 'rgba(94, 94, 94, 1)'},
            ]}>
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(1)}
          style={[
            {width: '30%', borderRadius: 100, paddingVertical: 3},
            tab === 1 ? {backgroundColor: 'rgba(243, 41, 101, 1)'} : {},
          ]}>
          <Text
            style={[
              {textAlign: 'center', fontSize: 14, fontFamily: 'Gilroy-Bold'},
              tab === 1 ? {color: '#fff'} : {color: 'rgba(94, 94, 94, 1)'},
            ]}>
            Moments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab(2)}
          style={[
            {width: '45%', borderRadius: 100, paddingVertical: 3},
            tab === 2 ? {backgroundColor: 'rgba(243, 41, 101, 1)'} : {},
          ]}>
          <Text
            style={[
              {textAlign: 'center', fontSize: 14, fontFamily: 'Gilroy-Bold'},
              tab === 2 ? {color: '#fff'} : {color: 'rgba(94, 94, 94, 1)'},
            ]}>
            Online Friends
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[
          {
            id: 1,
            sender: {id: 1, image: require('../Assets/Images/photo(1).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 2,
            sender: {id: 2, image: require('../Assets/Images/photo(2).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 3,
            sender: {id: 3, image: require('../Assets/Images/photo(3).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 4,
            sender: {id: 4, image: require('../Assets/Images/photo(4).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 5,
            sender: {id: 5, image: require('../Assets/Images/photo(5).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 6,
            sender: {id: 6, image: require('../Assets/Images/photo(6).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 7,
            sender: {id: 1, image: require('../Assets/Images/photo(7).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 8,
            sender: {id: 2, image: require('../Assets/Images/photo(8).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 9,
            sender: {id: 3, image: require('../Assets/Images/photo(9).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 10,
            sender: {id: 4, image: require('../Assets/Images/photo(10).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 11,
            sender: {id: 5, image: require('../Assets/Images/photo(1).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
          {
            id: 12,
            sender: {id: 6, image: require('../Assets/Images/photo(2).jpg')},
            content: {
              image: require('../Assets/Images/photo(1).jpg'),
              watching: 747,
            },
          },
        ]}
        style={{flex: 1, marginTop: 10}}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                width: '85%',
                marginLeft: '5%',
                marginBottom: 10,
              }}>
              <View
                style={{
                  borderRadius: 100,
                  overflow: 'hidden',
                  width: 50,
                  height: 50,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={item.sender.image}
                  style={{width: 50, height: 50}}
                />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Gilroy-Medium',
                    color: 'rgba(243, 41, 101, 1)',
                    marginBottom: 5,
                  }}>
                  From 5 mins
                </Text>
                <ImageBackground
                  source={item.sender.image}
                  style={{
                    width: '100%',
                    height: hp('25%'),
                    borderRadius: wp('5%'),
                    overflow: 'hidden',
                  }}
                  resizeMode={'cover'}>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <EyeIcon />
                    <Text
                      style={{
                        marginLeft: 2,
                        fontSize: 10,
                        fontFamily: 'Gilroy-Bold',
                        color: '#fff',
                      }}>
                      {item.content.watching}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};
// const DiscoverDrawer = () => {
//   return (
//     <Drawer.Navigator
//       drawerPosition={'right'}
//       drawerStyle={{backgroundColor: 'transparent', width: '80%', zIndex: 9999}}
//       drawerContent={props => <DrawerContent {...props} />}
//       //  tabBar={props => <DiscoverTabBar {...props} />}
//     >
//       <Drawer.Screen name={'DiscoverTab'} component={TabNav} />
//     </Drawer.Navigator>
//   );
// };

// const DiscoverTabNav = () => {
//   return (
//     <DiscoverTab.Navigator tabBar={props => <DiscoverTabBar {...props} />}>
//       <Tab.Screen name={'All'} component={All} />
//       <Tab.Screen name={'Nearby'} component={DummyPage} />
//       <Tab.Screen name={'Popular'} component={DummyPage} />
//       <Tab.Screen name={'PK'} component={DummyPage} />
//     </DiscoverTab.Navigator>
//   );
// };

// export default DiscoverDrawer;

// import * as React from 'react';
// import {View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import WalletScreen from "../Containers/Wallet/WalletScreen";
// import {Image} from "react-native";
// import styles from './styles';
// import Home from '../Containers/Home';
// import Settings from '../Containers/Settings';
// const Tab = createBottomTabNavigator();

// const TabNav = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let icon;

//                     switch (route.name) {
//                         case 'Home': icon = focused ? require('../Assets/Images/HomeIconActive(1).jpg') : require('../Assets/Images/HomeIcon(1).jpg'); break;
//                         case 'Data points': icon = focused ? require('../Assets/Images/DataPointsIconActive(1).jpg') : require('../Assets/Images/DataPointsIcon(1).jpg'); break;
//                         case 'Dapps': icon = focused ? require('../Assets/Images/DappsIconActive(1).jpg') : require('../Assets/Images/DappsIcon(1).jpg'); break;
//                         case 'NFT (soon)': icon = focused ? require('../Assets/Images/NFTIconActive(1).jpg') : require('../Assets/Images/NFTIcon(1).jpg'); break;
//                         case 'Settings': icon = focused ? require('../Assets/Images/SettingsIconActive(1).jpg') : require('../Assets/Images/SettingIcon(1).jpg'); break;
//                     }

//                     return <Image
//                         style={styles.navIcon}
//                         source={icon}
//                     />
//                 },
//                 tabBarStyle: styles.tabBar,
//                 tabBarLabelStyle: styles.tabBarText,
//                 tabBarActiveTintColor: '#FFFFFF',
//                 tabBarInactiveTintColor: '#5E6272',
//             })}
//         >
//             <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
//             <Tab.Screen name="Data points" component={WalletScreen} options={{headerShown: false}}/>
//             <Tab.Screen name="Dapps" component={WalletScreen} options={{headerShown: false}}/>
//             <Tab.Screen name="NFT (soon)" component={WalletScreen} options={{headerShown: false}}/>
//             <Tab.Screen name="Settings" component={WalletScreen} options={{headerShown: false}}/>

//         </Tab.Navigator>
//     );
// };

// export default TabNav;
