import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import AristocracyIcon from '../../Assets/Icons/Aristocracy.svg';
import HostRegistrationIcon from '../../Assets/Icons/HostRegistration.svg';
import RechargeIcon from '../../Assets/Icons/Recharge.svg';
import ReferIcon from '../../Assets/Icons/Refer.svg';
import FreeCardsIcon from '../../Assets/Icons/FreeCards.svg';
import SettingsIcon from '../../Assets/Icons/Settings.svg';
import CrownIcon from '../../Assets/Icons/crown.svg';
import DiamondGoldIcon from '../../Assets/Icons/DiamondGold.svg';
import Toggle from 'react-native-toggle-element';
import {connect, useDispatch} from 'react-redux';
import {getUserProfileAction} from '../../Redux/Action';
import {IMAGE_URL} from '../../Services/Api/Common';

let userData = null;

const MyProfile = props => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = React.useState(true);
  const [profileData, setProfileData] = React.useState(null);

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, []);

  useEffect(() => {
    userData = props.getUserList?.user;
    setProfileData(JSON.stringify(props.getUserList));
  }, [props.getUserList]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ScrollView>
        <LinearGradient
          colors={['rgba(249, 70, 253, 1)', 'rgba(72, 101, 255, 1)']}
          style={{alignItems: 'center', width: '100%'}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{position: 'absolute', left: wp('6%')}}>
              <FontAwesome5Icon name={'arrow-left'} color={'#fff'} size={20} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 20,
                color: '#fff',
                alignSelf: 'center',
              }}>
              Profile
            </Text>
          </View>

          <View
            style={{
              borderWidth: 2,
              marginTop: 15,
              marginBottom: 5,
              borderColor: 'white',
              backgroundColor: 'red',
              alignSelf: 'center',
              borderRadius: hp('50%'),
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: IMAGE_URL + userData?.profile,
              }}
              style={{height: wp('30%'), width: wp('30%')}}
            />
          </View>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 18,
              color: '#fff',
              alignSelf: 'center',
              marginBottom: 1,
            }}>
            {userData?.name}
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Medium',
              fontSize: 12,
              color: '#fff',
              alignSelf: 'center',
            }}>
            {'Weecha ID:' + userData?._id}
          </Text>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              marginTop: 15,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                1487
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                Friends
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                1000
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                Followers
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                877
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                Following
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                88
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Medium',
                  fontSize: 15,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                Group
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '88%',
              alignSelf: 'center',
              marginTop: 5,
            }}>
            <View style={{alignItems: 'flex-start', width: 50}}>
              <RechargeIcon width="30" height="30" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                color: 'rgba(52, 43, 43, 1)',
              }}>
              Recharge
            </Text>
            <View style={{}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'rgba(52, 43, 43, 0.6)'}
                size={20}
                solid
              />
            </View>
          </TouchableOpacity>
          <LinearGradient
            colors={['rgba(249, 70, 253, 1)', 'rgba(72, 101, 255, 1)']}
            style={{
              alignSelf: 'center',
              height: 50,
              width: wp('92%'),
              borderRadius: 4,
              marginVertical: 5,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: wp('92%') - 2,
                height: 48,
                marginTop: 1,
                alignSelf: 'center',
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 18,
                  color: 'black',
                }}>
                My Income
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 21,
                  color: 'rgba(255, 150, 5, 1)',
                }}>
                {/* {'$' + userData?.points} */}
                $400
              </Text>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['rgba(72, 101, 255, 1)', 'rgba(249, 70, 253, 1)']}
            style={{
              borderRadius: 5,
              alignSelf: 'center',
              marginVertical: 10,
              width: wp('92%'),
            }}>
            <View
              style={{
                height: hp('7.5%'),
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  My Weecha Level
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 25, 0, 1)',
                    borderRadius: 100,
                    paddingHorizontal: 8,
                    paddingVertical: 0,
                    marginLeft: 10,
                  }}>
                  <CrownIcon />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 17,
                      color: '#fff',
                      marginLeft: 3,
                    }}>
                    98
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <FontAwesome5Icon
                  name={'chevron-right'}
                  color={'rgba(255,255,255,1)'}
                  size={20}
                  solid
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(241, 241, 241, 1)',
                borderRadius: 5,
              }}>
              <View
                style={{
                  height: hp('7.5%'),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 16,
                      color: '#000',
                    }}>
                    My Balance
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <DiamondGoldIcon width="17" height="17" />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 12,
                      color: '#000',
                      marginLeft: 5,
                    }}>
                    {userData?.wallletAmount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(241, 241, 241, 1)',
                  width: '100%',
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  height: hp('7.5%'),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 16,
                      color: '#000',
                    }}>
                    My Chat Price
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <DiamondGoldIcon width="17" height="17" />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 12,
                      color: '#000',
                      marginLeft: 5,
                    }}>
                    {userData?.messageCharge}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(241, 241, 241, 1)',
                  width: '100%',
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  height: hp('7.5%'),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 16,
                      color: '#000',
                    }}>
                    Trade Account
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <DiamondGoldIcon width="17" height="17" />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 12,
                      color: '#000',
                      marginLeft: 5,
                    }}>
                    {userData?.tradeBalance}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.07)',
              width: '92%',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '88%',
              alignSelf: 'center',
            }}>
            <View style={{alignItems: 'flex-start', width: 50}}>
              <AristocracyIcon width="30" height="30" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                color: 'rgba(52, 43, 43, 1)',
              }}>
              Aristocracy
            </Text>
            <View style={{}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'rgba(52, 43, 43, 0.6)'}
                size={20}
                solid
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.07)',
              width: '92%',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '88%',
              alignSelf: 'center',
            }}>
            <View style={{alignItems: 'flex-start', width: 50}}>
              <HostRegistrationIcon width="30" height="30" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                color: 'rgba(52, 43, 43, 1)',
              }}>
              Host Registration
            </Text>
            <View style={{}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'rgba(52, 43, 43, 0.6)'}
                size={20}
                solid
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.07)',
              width: '92%',
              alignSelf: 'center',
            }}
          />
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '88%',
              alignSelf: 'center',
            }}>
            <View style={{alignItems: 'flex-start', width: 50}}>
              <RechargeIcon width="30" height="30" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                color: 'rgba(52, 43, 43, 1)',
              }}>
              Recharge
            </Text>
            <View style={{}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'rgba(52, 43, 43, 0.6)'}
                size={20}
                solid
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.07)',
              width: '92%',
              alignSelf: 'center',
            }}
          /> */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '88%',
              alignSelf: 'center',
            }}>
            <View style={{alignItems: 'flex-start', width: 50}}>
              <ReferIcon width="30" height="30" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                color: 'rgba(52, 43, 43, 1)',
              }}>
              Refer Friend
            </Text>
            <View style={{}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'rgba(52, 43, 43, 0.6)'}
                size={20}
                solid
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.07)',
              width: '92%',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '88%',
              alignSelf: 'center',
            }}>
            <View style={{alignItems: 'flex-start', width: 50}}>
              <FreeCardsIcon width="30" height="30" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                color: 'rgba(52, 43, 43, 1)',
              }}>
              Free Cards
            </Text>
            <View style={{}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'rgba(52, 43, 43, 0.6)'}
                size={20}
                solid
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: 'rgba(0,0,0,0.07)',
              width: '92%',
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('EditProfile');
            }}
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
              width: '88%',
              alignSelf: 'center',
            }}>
            <View style={{alignItems: 'flex-start', width: 50}}>
              <SettingsIcon width="30" height="30" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Gilroy-SemiBold',
                color: 'rgba(52, 43, 43, 1)',
              }}>
              Setting
            </Text>
            <View style={{}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'rgba(52, 43, 43, 0.6)'}
                size={20}
                solid
              />
            </View>
          </TouchableOpacity>

          {/* <LinearGradient
            colors={['rgba(249, 70, 253, 1)', 'rgba(72, 101, 255, 1)']}
            style={{
              alignSelf: 'center',
              height: 50,
              width: wp('92%'),
              borderRadius: 4,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: wp('92%') - 2,
                height: 48,
                marginTop: 1,
                alignSelf: 'center',
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: 18,
                  color: 'black',
                }}>
                My Income
              </Text>
              <Text
                style={{
                  fontFamily: 'Gilroy-Bold',
                  fontSize: 21,
                  color: 'rgba(255, 150, 5, 1)',
                }}>
                {'$' + userData?.points}
              </Text>
            </View>
          </LinearGradient> */}

          {/* <LinearGradient
            colors={['rgba(72, 101, 255, 1)', 'rgba(249, 70, 253, 1)']}
            style={{
              borderRadius: 5,
              alignSelf: 'center',
              marginVertical: 10,
              width: wp('92%'),
            }}>
            <View
              style={{
                height: hp('7.5%'),
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Gilroy-SemiBold',
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  User Level
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 25, 0, 1)',
                    borderRadius: 100,
                    paddingHorizontal: 8,
                    paddingVertical: 0,
                    marginLeft: 10,
                  }}>
                  <CrownIcon />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 17,
                      color: '#fff',
                      marginLeft: 3,
                    }}>
                    98
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <FontAwesome5Icon
                  name={'chevron-right'}
                  color={'rgba(255,255,255,1)'}
                  size={20}
                  solid
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'rgba(241, 241, 241, 1)',
                borderRadius: 5,
              }}>
              <View
                style={{
                  height: hp('7.5%'),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 16,
                      color: '#000',
                    }}>
                    My Balance
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <DiamondGoldIcon width="17" height="17" />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 12,
                      color: '#000',
                      marginLeft: 5,
                    }}>
                    {userData?.wallletAmount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(241, 241, 241, 1)',
                  width: '100%',
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  height: hp('7.5%'),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 16,
                      color: '#000',
                    }}>
                    My Chat Price
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <DiamondGoldIcon width="17" height="17" />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 12,
                      color: '#000',
                      marginLeft: 5,
                    }}>
                    {userData?.messageCharge}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: 'rgba(241, 241, 241, 1)',
                  width: '100%',
                  alignSelf: 'center',
                }}
              />
              <View
                style={{
                  height: hp('7.5%'),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Regular',
                      fontSize: 16,
                      color: '#000',
                    }}>
                    Trade Account
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <DiamondGoldIcon width="17" height="17" />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Medium',
                      fontSize: 12,
                      color: '#000',
                      marginLeft: 5,
                    }}>
                    {userData?.tradeBalance}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient> */}
          <View
            style={{
              flexDirection: 'row',
              width: wp('92%'),
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginTop: 5,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 16,
                color: 'rgba(49, 40, 40, 1)',
              }}>
              Location
            </Text>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 16,
                color: 'rgba(36, 125, 207, 1)',
              }}>
              My Current Location
            </Text>
          </View>
          <View
            style={{
              height: hp('7.5%'),
              borderWidth: 1,
              width: wp('92%'),
              alignSelf: 'center',
              borderRadius: 5,
              borderColor: 'rgba(198, 198, 198, 1)',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Regular',
                  fontSize: 16,
                  color: 'rgba(41, 41, 41, 1)',
                }}>
                India
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Toggle
                value={toggle}
                onToggle={newState => setToggle(newState)}
                trackBar={{
                  activeBackgroundColor: 'rgba(246, 181, 69, 1)',
                  inActiveBackgroundColor: 'gray',
                  borderActiveColor: '#86c3d7',
                  borderInActiveColor: '#1c1c1c',
                  borderWidth: 0,
                  width: 40,
                  height: 10,
                  radius: 25,
                }}
                thumbStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#383838',
                }}
                thumbButton={{
                  width: 20,
                  height: 20,
                  radius: 30,
                }}
                thumbActiveComponent={
                  <View
                    style={{
                      width: 4,
                      height: 10,
                      radius: 30,
                      backgroundColor: 'rgba(246, 181, 69, 1)',
                    }}
                  />
                }
                thumbInActiveComponent={
                  <View
                    style={{
                      width: 4,
                      height: 10,
                      radius: 30,
                      backgroundColor: 'gray',
                    }}
                  />
                }
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: wp('92%'),
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: 16,
                color: 'rgba(49, 40, 40, 1)',
              }}>
              Language
            </Text>
          </View>
          <View
            style={{
              height: hp('7.5%'),
              borderWidth: 1,
              width: wp('92%'),
              alignSelf: 'center',
              borderRadius: 5,
              borderColor: 'rgba(198, 198, 198, 1)',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Gilroy-Regular',
                  fontSize: 16,
                  color: 'rgba(41, 41, 41, 1)',
                }}>
                English
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5Icon
                name={'chevron-right'}
                color={'#8B919C'}
                size={20}
                solid
              />
            </View>
          </View>
          {/* <TouchableOpacity onPress={() => {props.navigation.reset({
           index: 0,
           routes: [{name: 'Login'}] 
          })}}>
            <Text>Sign Out</Text>
          </TouchableOpacity> */}
          <View style={{height: 100}} />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getUserList: state.common.getUserList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
