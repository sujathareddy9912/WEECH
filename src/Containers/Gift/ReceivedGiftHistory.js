import React, {useCallback, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './styles';
import {getReceivedGiftListAction} from '../../Redux/Action';
import {MyImage} from '../../Component/commomComponent';
import {IMAGE_URL} from '../../Services/Api/Common';

export default function ReceivedGiftHistory() {
  const dispatch = useDispatch();

  const [receivedGiftList, setReceivedGiftList] = useState([]);

  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getReceivedGiftListAction(
          {
            start: 0,
            limit: 50,
            userId: userLoginList?.user?._id,
            search: '',
          },
          list => {
            setReceivedGiftList(list);
          },
        ),
      );
    }, []),
  );

  const GiftHistoryRender = ({item}) => {
    const {giftDetails, senderUser, price} = item;
    return (
      <View style={styles.renderingContainer}>
        <MyImage
          fast
          source={{uri: `${IMAGE_URL}${giftDetails?.icon}`}}
          style={styles.renderingIconStyle}
        />
        <View style={styles.renderingDetailsContainer}>
          <Text style={styles.renderingTextStyle}>
            Gift Name: {giftDetails?.name}
          </Text>
          <Text style={styles.renderingTextStyle}>Sended By: {senderUser[0]?.name}</Text>
          <Text style={styles.renderingTextStyle}>
            Quantity: {giftDetails?.calcType} | {price}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.listRenderContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={receivedGiftList}
        renderItem={GiftHistoryRender}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
}
