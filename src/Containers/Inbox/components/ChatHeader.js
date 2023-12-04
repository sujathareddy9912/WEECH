import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet, Image, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {COLORS} from '../../../Utils/colors';
import {SCREEN_HEIGHT} from '../../../Utils/helper';
import {dynamicSize} from '../../../Utils/responsive';
import WhiteCamIcon from '../../../Assets/Icons/WhiteCamIcon.svg';
import BackArrowIcon from '../../../Assets/Icons/WhiteBackIcon.svg';
import {MyText, Touchable} from '../../../Component/commomComponent';
import WhitePhoneIcon from '../../../Assets/Icons/WhitePhoneIcon.svg';

const ChatHeader = ({
  handleMore,
  handleBack,
  handleTitle,
  handleDelete,
  deleteIconFlag,
  title = 'Home',
  containerStyle,
  handleAudioCall,
  handleVideoCall,
  avatarSource = require('../../../Assets/Images/girl.png'),
}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.LIGHT_BABY_PINK,
        paddingBottom: -useSafeAreaInsets().bottom,
      }}>
      <View style={[styles.containerStyle, containerStyle]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Touchable onPress={handleBack} style={styles.leftComponent}>
            <BackArrowIcon />
          </Touchable>
          <Image source={avatarSource} style={styles.avatar} />
          <Touchable
            activeOpacity={0.7}
            onPress={handleTitle}
            style={{width: wp(45)}}>
            <MyText style={styles.heading} numberOfLines={1}>
              {title}
            </MyText>
          </Touchable>
        </View>
        <View style={styles.rightComponent}>
          {deleteIconFlag ? (
            <Touchable onPress={handleDelete}>
              <Entypo
                color={COLORS.WHITE}
                size={dynamicSize(18)}
                name={'trash'}
              />
            </Touchable>
          ) : null}
          <Touchable onPress={handleVideoCall}>
            <WhiteCamIcon />
          </Touchable>
          <Touchable onPress={handleAudioCall}>
            <WhitePhoneIcon />
          </Touchable>
          <Touchable onPress={handleMore}>
            <Entypo
              color={COLORS.WHITE}
              size={dynamicSize(18)}
              name={'dots-three-vertical'}
            />
          </Touchable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: wp(2.5),
    justifyContent: 'space-between',
    backgroundColor: COLORS.LIGHT_BABY_PINK,
    width: wp(100),
    flexDirection: 'row',
    height: SCREEN_HEIGHT * 0.07,
    alignItems: 'center',
    zIndex: 999,
  },
  avatar: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(100),
    marginLeft: wp(4),
  },
  leftComponent: {
    marginLeft:dynamicSize(4),
    padding: dynamicSize(4),
  },
  rightComponent: {
    flexDirection: 'row',
    width: wp(25),
    justifyContent: 'space-between',
  },
  heading: {
    marginLeft: wp(2),
    fontSize: 20,
    color: COLORS.WHITE,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ChatHeader;
