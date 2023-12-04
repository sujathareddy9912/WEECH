import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import {
  allowFreeChat,
  getFriendsListAction,
} from '../../../../Redux/Action'
import Gender from '../../../../Assets/Icons/Gender.svg';
import Header from '../../../../Component/header/Header';
import { IMAGE_URL } from '../../../../Services/Api/Common';
import CrownIcon from '../../../../Assets/Icons/crown.svg';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, MyText, Touchable } from '../../../../Component/commomComponent';
import { COLORS } from '../../../../Utils/colors';
import { useFocusEffect } from '@react-navigation/native';

const FreeChatInvites = ({ navigation, route }) => {
  // const {
  //   params: { group, members },
  // } = route;
  const dispatch = useDispatch();
  const [friendsList, setFriennds] = useState([]);
  const [selected, setSelected] = useState([]);

  const USER = useSelector(state => {
    return state?.authReducer?.userLoginList?.user;
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getFriendsListAction(
          {
            start: 0,
            limit: 100,
            userId: USER?._id,
            search: '',
          },
          list => {
            setFriennds(list?.data);
          },
        ),
      );
    }, []),
  );

  const handleInvite = () => {
    const payload = {
      allowByUser: USER?._id,
      allowToUser: selected,
    };
    dispatch(
      allowFreeChat(payload, res => {
        navigation.goBack();
      }),
    );
  };

  const renderItem = ({ item }) => {
    const { friendUserId } = item;
    let selectedIndex;
    let selectedArr = selected.filter((id, index) => {
      if (id == friendUserId?._id) {
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
          {friendUserId?.profile != '' ? (
            <Image
              source={{ uri: `${IMAGE_URL}${friendUserId?.profile}` }}
              style={styles.userImg}
            />
          ) : (
            <Image
              source={require('../../../../Assets/Images/girl.png')}
              style={styles.userImg}
            />
          )}
          <View style={styles.nameContainer}>
            <MyText style={{}}>{friendUserId?.name}</MyText>
            <View style={styles.flagContainer}>
              <Image
                source={require('../../../../Assets/countryImages/bl.png')}
                style={styles.flag}
              />
              <View style={styles.crownContainer}>
                <CrownIcon
                  width={hp(1.5)}
                  height={hp(1.5)}
                  marginRight={wp(1)}
                />
                <Text
                  style={{
                    color: 'white',
                  }}>
                  9
                </Text>
              </View>
              <View
                style={[
                  styles.crownContainer,
                  {
                    backgroundColor: COLORS.LIGHT_VIOLET,
                  },
                ]}>
                <Gender width={hp(1.5)} height={hp(1.5)} marginRight={wp(1)} />
                <Text
                  style={{
                    color: 'white',
                  }}>
                  9
                </Text>
              </View>
            </View>
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
              tempArr.push(friendUserId?._id);
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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        title={String('Select Friends')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={friendsList}
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
          label={'Invite'}
          labelStyle={{
            color: COLORS.WHITE,
          }}
        />
      ) : null}
    </View>
  );
};

export default FreeChatInvites;
