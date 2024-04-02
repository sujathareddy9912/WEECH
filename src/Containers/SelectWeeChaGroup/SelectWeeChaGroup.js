import React, {useState, useRef, useCallback} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Image} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {styles} from '../SelectFriend/styles';
import {COLORS} from '../../Utils/colors';
import Header from '../../Component/header/Header';
import {getChatGroups, shareLiveLinkGroups} from '../../Redux/Action';
import {MyText, Touchable, Button} from '../../Component/commomComponent';
import {IMAGE_URL} from '../../Services/Api/Common';

const SelectWeeChaGroup = ({navigation, route}) => {
  const dataLimit = 20;
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;
  const paginationOffset = useRef(0);
  const waitTillFetchingData = useRef(true);
  const [selected, setSelected] = useState([]);
  const [groups, setGroups] = useState([]);

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

  useFocusEffect(
    useCallback(() => {
      paginationOffset.current = 0;
      _fetchChatGroupList();
    }, []),
  );

  const _fetchChatGroupList = () => {
    const param = {
      start: paginationOffset.current,
      limit: dataLimit,
      search: '',
      userId: userLoginList?.user?._id,
    };
    dispatch(
      getChatGroups(param, result => {
        if (result?.data?.count) {
          if (paginationOffset.current == 0) {
            setGroups(result?.data?.result);
          } else {
            setGroups(prevState => [...prevState, ...result?.data?.result]);
          }
        }
        waitTillFetchingData.current = true;
      }),
    );
  };

  const renderItem = ({item}) => {
    let selectedIndex;
    let selectedArr = selected.filter((id, index) => {
      if (id == item?._id) {
        selectedIndex = index;
        return id;
      }
    });
    return (
      <View style={[styles.item]}>
        <Touchable
          style={{
            flexDirection: 'row',
          }}>
          {item?.icon != '' ? (
            <Image
              source={{uri: `${IMAGE_URL}${item?.icon}`}}
              style={styles.userImg}
            />
          ) : (
            <FontAwesome5Icon
              name={'users'}
              color={COLORS.WHITE}
              size={wp(8)}
            />
          )}
          <View>
            <MyText style={styles.grpName}>
              {item?.groupName}
              {'  '}
              <MyText
                style={[
                  styles.groupMembers,
                  {
                    color: COLORS.LIGHT_MAGENTA,
                  },
                ]}>
                (
                <MyText
                  style={[
                    styles.groupMembers,
                    {
                      color: COLORS.PRIMARY_BLUE,
                    },
                  ]}>
                  {item?.usersData?.length}
                </MyText>
                /300)
              </MyText>
            </MyText>
            <MyText style={styles.grpMsg}>
              {item?.latestMessage[0]?.content}
            </MyText>
          </View>
        </Touchable>
        <Touchable
          onPress={() => {
            if (selectedArr.length > 0) {
              let tempArr = selected;
              tempArr.splice(selectedIndex, 1);
              setSelected([...tempArr]);
            } else {
              let tempArr = selected;
              tempArr.push(item?._id);
              setSelected([...tempArr]);
            }
          }}>
          <MaterialIcons
            name={
              selectedArr.length == 0 ? 'check-box-outline-blank' : 'check-box'
            }
            color={COLORS.BLACK}
            size={wp(7)}
            style={{
              marginRight: wp(1),
            }}
          />
        </Touchable>
      </View>
    );
  };

  const handleInvite = () => {
    const payload = {
      senderId: userLoginList?.user?._id,
      groupId: selected,
      roomId: route?.params?.channelToken,
      userName: userLoginList?.user?.name,
      userProfile: userLoginList?.user?.profile,
      liveRoomData: {
        channel_token: route?.params?.channelToken,
        channel_name: route?.params?.channelName,
        hostId: route?.params?.hostId,
        link: route?.params?.link,
        hostName: route?.params?.hostDetail?.name,
        hostImage: route?.params?.hostDetail?.profile,
      },
    };
    dispatch(
      shareLiveLinkGroups(payload, res => {
        navigation.goBack();
      }),
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        title={String('Select Group')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={groups}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        style={{
          flex: 1,
        }}
      />

      {selected.length ? (
        <Button
          onPress={handleInvite}
          buttonStyle={styles.buttonStyle}
          width={wp(96)}
          label={'Share'}
          labelStyle={{
            color: COLORS.WHITE,
          }}
        />
      ) : null}
    </View>
  );
};

export default SelectWeeChaGroup;
