import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  View,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  Modal as CallModal,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';
import {callList} from '../chats/dummyChatList';
import {FONT_FAMILY} from '../../../Utils/fontFamily';
import CallIcon from '../../../Assets/Icons/callBlue.svg';
import CrossPink from '../../../Assets/Icons/EndCall.svg';
import SearchIcon from '../../../Assets/Icons/SearchIcon.svg';
import VideoCallIcon from '../../../Assets/Icons/videoCallBlue.svg';

import {
  MyText,
  Touchable,
  MyTextInput,
} from '../../../Component/commomComponent';

import {
  deleteAllRecentCallAction,
  deleteRecentChatModalAction,
} from '../../../Redux/Action';

const DeleteAllModal = ({onDeleteSuccess}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const {userLoginList} = state.authReducer;
  const {deleteRecentChatModalVisible} = state.loaderReducer;

  const onDeleteAllPress = () => {
    const param = {
      userId: userLoginList?.user?._id,
    };
    dispatch(deleteRecentChatModalAction(false));
    dispatch(
      deleteAllRecentCallAction(param, result => {
        if (result) {
          if (onDeleteSuccess) onDeleteSuccess();
        }
      }),
    );
  };

  return (
    // <View style={styles.centeredView}>
    <CallModal
      animationType="slide"
      transparent={true}
      visible={deleteRecentChatModalVisible}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <View style={styles.header}>
            <MyText style={styles.headerText}>
              {String('New Call').toUpperCase()}
            </MyText>
            <Pressable
              style={styles.buttonClose}
              onPress={() => callback(false)}>
              <CrossPink width={wp(8)} height={wp(8)} />
            </Pressable>
          </View> */}
          <View style={styles.content}>
            {/* <View style={styles.inputCon}>
              <SearchIcon width={wp(5)} height={wp(5)} />
              <MyTextInput style={styles.input} />
            </View> */}
            <Touchable
              activeOpacity={0.8}
              onPress={onDeleteAllPress}
              style={{
                width: wp(98),
                borderRadius: wp(1),
                height: hp(6),
                backgroundColor: COLORS.PRIMARY_BLUE,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                style={{
                  fontSize: 16,
                  color: COLORS.WHITE,
                  fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
                }}>
                {String('delete all recents').toUpperCase()}
              </MyText>
            </Touchable>
            <Touchable
              activeOpacity={0.8}
              style={{
                marginTop: wp(1),
                width: wp(98),
                borderRadius: wp(1),
                height: hp(6),
                backgroundColor: COLORS.PRIMARY_BLUE,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => dispatch(deleteRecentChatModalAction(false))}>
              <MyText
                style={{
                  fontSize: 16,
                  color: COLORS.WHITE,
                  fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
                }}>
                {String('cancel').toUpperCase()}
              </MyText>
            </Touchable>
          </View>
        </View>
      </View>
    </CallModal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    // padding: wp(5),
    backgroundColor: 'transparent',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    width: wp(100),
    height: hp(16),
    alignItems: 'center',
  },
  header: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: COLORS.RED_COLOR,
  },
  headerText: {
    color: COLORS.BABY_PINK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  buttonClose: {
    top: 0,
    right: 0,
    position: 'absolute',
  },
  content: {
    padding: wp(2),
  },
  inputCon: {
    width: wp(90),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.VIOLET,
  },
  input: {
    width: wp(80),
    height: hp(5),
    borderRadius: wp(2),
  },
  chat: {
    paddingVertical: wp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(100),
  },
  heading: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  info: {
    width: wp(40),
    marginLeft: wp(2),
  },
  lastMsg: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.TEXT_GRAY,
  },
  imgInfo: {
    flexDirection: 'row',
  },
  time: {
    color: COLORS.TEXT_GRAY,
  },
  flatList: {
    // marginTop: wp(2),
    backgroundColor: COLORS.WHITE,
  },
  callBtnCon: {
    flexDirection: 'row',
  },
});

export default DeleteAllModal;
