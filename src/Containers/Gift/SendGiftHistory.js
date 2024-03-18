import React, {useCallback, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './styles';
import {getSendGiftListAction} from '../../Redux/Action';
import {MyImage, MyText} from '../../Component/commomComponent';
import {IMAGE_URL} from '../../Services/Api/Common';
import {calculateTotalGiftPrice} from '../../Utils/helper';

export default function SendGiftHistory() {
  const dispatch = useDispatch();
  const [sendGiftList, setSendGiftList] = useState([]);

  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getSendGiftListAction(
          {
            start: 0,
            limit: 50,
            userId: userLoginList?.user?._id,
            search: '',
          },
          list => {
            setSendGiftList(list);
          },
        ),
      );
    }, []),
  );

  const GiftHistoryRender = ({item}) => {
    const {giftDetails, receiverUser, price} = item;
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
          <Text style={styles.renderingTextStyle}>
            Sended By: {receiverUser[0]?.name}
          </Text>
          <Text style={styles.renderingTextStyle}>
            Quantity: {giftDetails?.calcType} | {price}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.listRenderContainer}>
      <MyText>
        Total Gift Sended : {calculateTotalGiftPrice(sendGiftList)}
      </MyText>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sendGiftList}
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
