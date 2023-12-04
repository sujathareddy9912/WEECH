/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../../Utils/colors';
import CallMike from '../../../../Assets/Icons/callMic.svg';
import SendIcon from '../../../../Assets/Icons/BlueSendIcon.svg';
import CameraIcon from '../../../../Assets/Icons/CameraChatIcon.svg';
import GalleryIcon from '../../../../Assets/Icons/GalleryChatIcon.svg';
import GiftIcon from '../../../../Assets/Icons/GiftChatIcon.svg';
import {dynamicSize} from '../../../../Utils/responsive';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../Utils/helper';
import {FONT_FAMILY} from '../../../../Utils/fontFamily';

import {
  MyText,
  Touchable,
  TouchableIcon,
} from '../../../../Component/commomComponent';

export const renderInputToolbar = (props, callBack) => (
  <InputToolbar
    {...props}
    containerStyle={{
      paddingTop: dynamicSize(3),
      paddingBottom: props.safeArea.bottom,
      marginBottom: -props.safeArea.bottom,
      backgroundColor: COLORS.LOW_GRAY,
    }}
    renderAccessory={() => (
      <View
        style={{
          height: '100%',
          flexDirection: 'row',
          width: '100%',
          marginTop: dynamicSize(3),
          justifyContent: 'space-around',
        }}>
        <TouchableIcon
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => callBack('CAMERA')}
          customIcon={
            <CameraIcon
              width={wp(7)}
              height={wp(7)}
              fill={props.sendMedia === 'CAMERA' ? '#F32965' : '#1B1717'}
            />
          }
        />
        <TouchableIcon
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => callBack('GALLERY')}
          customIcon={
            <GalleryIcon
              width={wp(7)}
              height={wp(7)}
              fill={props.sendMedia === 'GALLERY' ? '#F32965' : '#1B1717'}
            />
          }
        />
        <TouchableIcon
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => callBack('GIFT')}
          customIcon={
            <GiftIcon
              width={wp(7)}
              height={wp(7)}
              fill={props.sendMedia === 'GIFT' ? '#F32965' : '#1B1717'}
            />
          }
        />
      </View>
    )}
    // primaryStyle={{alignItems: 'center'}}
    // renderActions={props => renderActions({...props})}
    renderComposer={
      props => renderComposer({...props}) // this is textinput component to send message
    }
    renderSend={renderSend}>
    {/* <Touchable onPress={() => {}}>
      <SendIcon />
    </Touchable> */}
  </InputToolbar>
);

export const renderChatFooter = props => {
  const Reply = () => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: 'rgba(0,0,0,.1)',
          borderRadius: dynamicSize(10),
        }}>
        <View
          style={{
            height: '100%',
            width: 5,
            backgroundColor: COLORS.BABY_PINK,
          }}
        />
        <View
          style={{
            flex: 1,
            paddingVertical: dynamicSize(5),
            paddingHorizontal: dynamicSize(5),
          }}>
          <MyText
            style={{
              color: COLORS.BABY_PINK,
              paddingTop: 5,
              fontWeight: 'bold',
            }}>
            {props?.replyMsg?.user}
          </MyText>
          <MyText
            numberOfLines={3}
            style={{
              color: '#034f84',
              paddingVertical: dynamicSize(5),
            }}>
            {props?.replyMsg.text}
          </MyText>
        </View>
        <Touchable
          style={{
            alignItems: 'flex-end',
            paddingRight: 2,
            position: 'absolute',
            padding: dynamicSize(5),
            right: 0,
            top: 0,
          }}
          onPress={() =>
            props.setReplyCallback({replyId: null, text: '', user: null})
          }>
          <Icon name="x" type="feather" color={COLORS.BABY_PINK} size={20} />
        </Touchable>
      </View>
    );
  };
  const ReplyWrapper = ({id}) => {
    return <Reply id={id} />;
  };
  return (
    <>
      {props.replyMsg.replyId && <ReplyWrapper id={props.replyMsg.replyId} />}
    </>
  );
};

export const renderActions = props => {
  return (
    <Actions
      {...props}
      containerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: dynamicSize(10),
        marginVertical: 0,
        // marginBottom: 10,
      }}
      icon={() => <CallMike width={wp(8)} />}
      options={{
        'Record Voice': () => {
          console.log('Record Voice');
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );
};

export const renderComposer = props => {
  return (
    <>
      {/* {props.replyMsg.replyId && <ReplyWrapper id={props.replyMsg.replyId} />} */}
      <Composer
        {...props}
        textInputStyle={{
          flex: 1,
          fontFamily: FONT_FAMILY.ROBOTO_REGULAR,
          color: COLORS.WHITE,
          backgroundColor: COLORS.VIOLET,
          borderRadius: 5,
          marginLeft: dynamicSize(10),
          paddingHorizontal: 12,
          // marginLeft: 0,
        }}
        placeholderTextColor={COLORS.WHITE}
      />
    </>
  );
};

export const renderSend = props => {
  const {sendMessage, text} = props;
  return (
    <Send
      {...props}
      disabled={!text}
      containerStyle={{
        width: SCREEN_WIDTH / 10,
        height: SCREEN_WIDTH / 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
        marginHorizontal: dynamicSize(4),
      }}>
      <Touchable
        onPress={sendMessage}
        style={{
          padding: dynamicSize(8),
          borderRadius: dynamicSize(50),
          backgroundColor: COLORS.VIOLET,
        }}>
        <SendIcon width={18}/>
      </Touchable>
    </Send>
  );
};
