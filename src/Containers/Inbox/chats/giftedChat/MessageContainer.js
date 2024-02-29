/* eslint-disable react/jsx-props-no-spreading */
import moment from 'moment';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
} from 'react-native-gifted-chat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {SwipeRow} from 'react-native-swipe-list-view';

import {COLORS} from '../../../../Utils/colors';
import {getTimeFormat, SCREEN_HEIGHT} from '../../../../Utils/helper';
import {FONT_FAMILY, FONT_SIZE} from '../../../../Utils/fontFamily';
import {MyText} from '../../../../Component/commomComponent';
import BlueDoubleTick from '../../../../Assets/Icons/BlueDoubleTick.svg';
import {dynamicSize} from '../../../../Utils/responsive';

export const renderAvatar = props => (
  <Avatar
    {...props}
    // containerStyle={{left: {borderWidth: 3, borderColor: 'red'}, right: {}}}
    // imageStyle={{left: {borderWidth: 3, borderColor: 'blue'}, right: {}}}
  />
);

export const renderBubble = props => {
  return (
    <View
      style={{
        backgroundColor:
          props?.currentMessage?._id === props.deleteOneMsg
            ? COLORS.BABY_PINK + '60'
            : 'transparent',
        borderRadius: wp(2),
        paddingTop: dynamicSize(4),
      }}>
      <BubbleComp props={props} />
    </View>
  );
};

const BubbleComp = ({props}) => {
  const {text, system} = props.currentMessage;

  const onLeftAction = React.useCallback(
    ({isActivated}) => {
      if (isActivated) {
        props.renderBubbleCallBack({
          replyId: props.currentMessage?._id,
          text: text || 'Document',
          user: props.currentMessage?.user?.name,
        });
      }
    },
    [props.currentMessage?._id],
  );

  return (
    <SwipeRow
      useNativeDriver
      onLeftActionStatusChange={onLeftAction}
      disableLeftSwipe
      // disableRightSwipe={true}
      leftActivationValue={90}
      leftActionValue={0}
      swipeKey={props.currentMessage?._id + ''}>
      <></>
      <Bubble
        {...props}
        renderTime={() => (
          <MyText style={{fontSize: 10, marginLeft: dynamicSize(4)}}>
            {moment(props?.currentMessage?.updatedAt).format('hh:mm A')}
          </MyText>
        )}
        renderTicks={currentMessage => (
          <View style={{marginLeft: dynamicSize(4)}}>
            <BlueDoubleTick width={dynamicSize(12)} height={dynamicSize(8)} />
          </View>
        )}
        // containerStyle={{
        //   left: {borderColor: 'teal', borderWidth: 8},
        //   right: {},
        // }}

        wrapperStyle={{
          left: {
            paddingLeft: props?.currentMessage?.replyMessageId
              ? dynamicSize(2)
              : 0,
            paddingRight: dynamicSize(4),
            paddingBottom: dynamicSize(4),
            backgroundColor: COLORS.WHITE,
            borderBottomLeftRadius: 0,
            borderColor: '#F4F4F4',
            borderWidth: 1,
            borderRadius: dynamicSize(8),
            // minWidth: wp(40),
          },
          right: {
            paddingLeft: props?.currentMessage?.replyMessageId
              ? dynamicSize(4)
              : 0,
            paddingRight: dynamicSize(4),
            paddingBottom: dynamicSize(4),
            backgroundColor: '#E0E0E0',
            borderBottomRightRadius: 0,
            borderRadius: dynamicSize(8),
            // width: '100%',
          },
        }}
        bottomContainerStyle={{
          left: {
            justifyContent: 'flex-end',
            alignItems: 'center',
          },
          right: {
            justifyContent: 'flex-end',
            alignItems: 'center',
          },
        }}
        usernameStyle={{color: 'tomato', fontWeight: '100'}}
        // containerToNextStyle={{
        //   left: {borderColor: 'navy', borderWidth: 4},
        //   right: {},
        // }}
        // containerToPreviousStyle={{
        //   left: {borderColor: 'mediumorchid', borderWidth: 4},
        //   right: {},
        // }}
      />
    </SwipeRow>
  );
};

export const renderSystemMessage = props => (
  <SystemMessage
    {...props}
    containerStyle={{backgroundColor: 'pink'}}
    wrapperStyle={{borderWidth: 10, borderColor: 'white'}}
    textStyle={{color: 'crimson', fontWeight: '900'}}
  />
);

export const renderMessage = props => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    // containerStyle={{
    //   left: {backgroundColor: 'red'},
    //   right: {backgroundColor: 'gold'},
    // }}
  />
);

export const CustomMessageText = props => {
  return (
    <View>
      <View
        style={{
          backgroundColor:
            props.userId === props.currentMessage.sender
              ? COLORS.WHITE
              : '#F0F1F5',
          borderRadius: dynamicSize(20),
          paddingHorizontal: dynamicSize(15),
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: COLORS.BABY_PINK,
                // paddingHorizontal: 10,
                paddingTop: 5,
                fontFamily: FONT_FAMILY.POPPINS_REGULAR,
                fontSize: FONT_SIZE.MEDIUM,
              }}>
              {props.currentMessage?.isReply?.name}
            </Text>
            <Text
              style={{
                color: COLORS.BLACK,
                // paddingHorizontal: 10,
                // paddingTop: 5,
                marginBottom: 5,
              }}>
              {props.currentMessage?.isReply?.text}
            </Text>
          </View>
        </View>
      </View>
      <MessageText {...props} customTextStyle={{color: COLORS.BLACK}} />
    </View>
  );
};

export const renderMessageText = props => {
  if (props.currentMessage.isReply) {
    return <CustomMessageText {...props} />;
  }
  return (
    <MessageText
      {...props}
      containerStyle={{
        left: {
          // backgroundColor: COLORS.WHITE,
          // borderRadius: wp(4),
        },
        right: {
          // backgroundColor: COLORS.BABY_PINK,
          // borderRadius: wp(4),
        },
      }}
      textStyle={{
        left: {
          color: COLORS.BLACK,
        },
        right: {color: COLORS.BLACK},
      }}
      linkStyle={{
        left: {color: COLORS.PRIMARY_BLUE},
        right: {color: COLORS.PRIMARY_BLUE},
      }}
      customTextStyle={{
        fontFamily: FONT_FAMILY.POPPINS_REGULAR,
        fontSize: 13,
        lineHeight: 24,
      }}
    />
  );
};

export const renderCustomView = ({user}) => (
  <View
    style={{
      minHeight: 20,
      alignItems: 'center',
    }}>
    <Text>
      Current user:
      {user.name}
    </Text>
    <Text>From CustomView</Text>
  </View>
);
