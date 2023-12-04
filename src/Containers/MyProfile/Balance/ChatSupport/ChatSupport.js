import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StatusBar, TextInput, View} from 'react-native';

import {styles} from './styles';
import Header from '../../../../Component/header/Header';
import BackArrowIcon from '../../../../Assets/Icons/WhiteBackIcon.svg';
import {MyText, Touchable} from '../../../../Component/commomComponent';
import {COLORS} from '../../../../Utils/colors';
import Icons, {SvgIcon} from '../../../../Component/icons';

const DATA = [
  {
    id: 23231211,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
  {
    id: 23231231,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
  {
    id: 23231211,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
  {
    id: 23231231,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
  {
    id: 23231231,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
  {
    id: 23231211,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
  {
    id: 23231231,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
  {
    id: 23231231,
    msg: 'SDFSDVCDSVSKDVB,SJDGVSDHVSGJDHVSJDVHBSJ',
    time: '12:00',
  },
];

const ChatSupport = ({navigation}) => {
  const dispatch = useDispatch();

  const LeftComponent = () => (
    <Touchable style={styles.leftComponent} onPress={() => navigation.goBack()}>
      <BackArrowIcon />
    </Touchable>
  );

  const renderMsg = ({item}) => {
    return (
      <View
        style={[
          styles.msgContainer,
          item?.id == 23231231 && {
            alignItems: 'flex-start',
          },
        ]}>
        <Touchable
          style={[
            styles.msgBox,
            item?.id == 23231231 && {backgroundColor: COLORS.LOW_GRAY},
          ]}>
          <MyText
            type={'heading'}
            style={[
              styles.msgText,
              item?.id == 23231231 && {
                color: COLORS.BLACK,
              },
            ]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of
          </MyText>
          <MyText
            style={[
              styles.msgTime,
              item?.id == 23231231 && {
                color: COLORS.BLACK,
              },
            ]}>
            16:40
          </MyText>
        </Touchable>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <Header
            title={'Chat Support'}
            leftComponent={<LeftComponent />}
            containerStyle={styles.header}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderMsg}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={'Enter chat'}
            placeholderTextColor={COLORS.WHITE}
          />
          <Touchable style={styles.sendContainer}>
            <SvgIcon.SendIcon />
          </Touchable>
        </View>
      </View>
    </>
  );
};

export default ChatSupport;
