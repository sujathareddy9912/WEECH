import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {View, Image, StatusBar, ScrollView} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {styles} from './styles';
import {COLORS} from '../../../Utils/colors';
import icons from '../../../Component/icons';
import Header from '../../../Component/header/Header';
import {getWeechaLevelAction} from '../../../Redux/Action';
import ProgressBar, {weechaLevelCalculation} from './progressBar';
import {MyText, Touchable} from '../../../Component/commomComponent';

const DATA = [
  {
    id: 1,
    title: 'Live Broadcast',
    desc: 'The longer you broadcast the better',
    src: icons.broadcastCamera,
  },
  {
    id: 2,
    title: 'Get Gifts',
    desc: 'Talk about interesting topics so you can get more gifts',
    src: icons.goldenGift,
  },
  {
    id: 3,
    title: 'Live Share',
    desc: 'Each social media share you will get additional share xp & more benifits',
    src: icons.announce,
  },
  {
    id: 4,
    title: 'Get hearts',
    desc: "Hearts can also increase broadcaster's level",
    src: icons.heart,
  },
];

const WeechaLevel = ({navigation, route}) => {
  const [weechaLevel, setWeechaLevel] = useState({});

  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const dispatch = useDispatch();

  const leftHeaderComponent = (
    <Touchable onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.WHITE}
        size={wp(5)}
      />
    </Touchable>
  );

  const getWeechaLevel = () => {
    dispatch(
      getWeechaLevelAction(
        {
          userId: userLoginList?.user?._id,
        },
        result => {
          setWeechaLevel({...result});
        },
      ),
    );
  };

  useEffect(() => {
    getWeechaLevel();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.PINKY} />
      <Header
        title={null}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.headerContainer}
        rightComponent={null}
      />
      <View style={styles.topCont}>
        {/* <SvgIcon.ChakraBg width={wp(90)} height={hp(20)} /> */}
        <View style={styles.starCon}>
          <Image
            source={icons.starWeechaLevel}
            resizeMode={'contain'}
            style={{width: wp(30), height: wp(30)}}
          />
          <View style={styles.levelTextView}>
            <MyText style={styles.levelText}>
              LV.{' '}
              {weechaLevelCalculation(weechaLevel?.totalXP)?.currWeechaLevel}
            </MyText>
          </View>
        </View>
        <View style={styles.levelCon}>
          <View style={styles.levelLimitTextCon}>
            <MyText style={styles.levelLimitText}>
              {weechaLevelCalculation(weechaLevel?.totalXP)?.currWeechaLevel !==
                null &&
                `LV. ${
                  weechaLevelCalculation(weechaLevel?.totalXP)?.currWeechaLevel
                }`}
            </MyText>
            <MyText style={styles.levelLimitText}>
              {weechaLevelCalculation(weechaLevel?.totalXP)?.nextWeechaLevel !==
                null &&
                `LV. ${
                  weechaLevelCalculation(weechaLevel?.totalXP)?.nextWeechaLevel
                }`}
            </MyText>
          </View>
          <ProgressBar
            totalXp={weechaLevel?.totalXP}
            isHost={userLoginList?.user?.isHost}
          />
          <View style={styles.textCon}>
            <MyText style={styles.levelLimitText}>
              My xp : {weechaLevel?.totalXP}
            </MyText>
            <MyText style={styles.levelLimitText}>
              To next level required xp:{' '}
              {weechaLevelCalculation(weechaLevel?.totalXP)?.reqXp}
            </MyText>
          </View>
          <View style={styles.labelCon}>
            <View style={styles.label}>
              <MyText style={styles.count}>1</MyText>
              <Image
                source={icons.diamondIcon}
                resizeMode={'contain'}
                style={{width: wp(4), height: wp(4), marginLeft: wp(1)}}
              />
              <MyText style={styles.count}> = 1 xp</MyText>
            </View>
            <View style={styles.label}>
              <MyText style={styles.count}>1</MyText>
              <Image
                source={icons.heartImage}
                resizeMode={'contain'}
                style={{width: wp(4), height: wp(4), marginLeft: wp(1)}}
              />
              <MyText style={styles.count}> = 1 xp</MyText>
            </View>
          </View>
          <MyText
            style={[
              styles.levelLimitText,
              {textAlign: 'center', marginTop: hp(2)},
            ]}>
            each share with social media platforms = 15xp
          </MyText>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <MyText style={styles.heading}>
          How to increase your Talent Level ?
        </MyText>
        {DATA.map(({title, desc, id, src}) => (
          <View key={id} style={styles.item}>
            <Image
              source={src}
              resizeMode={'contain'}
              style={{width: wp(15), height: wp(15)}}
            />
            <View style={{marginLeft: wp(5), width: wp(65)}}>
              <MyText style={styles.heading}>{title}</MyText>
              <MyText style={styles.desc}>{desc}</MyText>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WeechaLevel;
