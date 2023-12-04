import {useDispatch} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../Utils/colors';
import {MyDropDown} from './dropDown';
import {MyText, Touchable, Button} from '../Component/commomComponent';
import {SvgIcon} from '../Component/icons';
import AddImg from '../Assets/Icons/gallery.svg';
import Entypo from 'react-native-vector-icons/Entypo';
import {getAge, imagePicker, SCREEN_WIDTH} from '../Utils/helper';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';
import {SCREEN_HEIGHT} from '../Utils/helper';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {useKeyboard} from '@react-native-community/hooks';
import {reportUserAction} from '../Redux/Action';

const ReportModal = props => {
  const {reportBy, onRequestClose, isVisible, selectedUserId} = props;
  const dispatch = useDispatch();
  const [attachment, setAttachment] = useState([]);
  const [complain, setComplain] = useState('');
  const [focus, setFocus] = useState(false);
  const [desc, setDesc] = useState('');
  const KeyboardHeight = useKeyboard();

  const complainTypes = [
    {value: 'Fake avatar in profile or moments', id: 1},
    {value: 'Posting illegal advertising content', id: 2},
    {value: 'Posting politically sensitive content', id: 3},
    {value: 'Posting violent content', id: 4},
    {value: 'Posting pornographic content', id: 5},
  ];

  const _onChangeDropdown = value => {
    setComplain(value);
  };

  const reportUser = () => {
    dispatch(
      reportUserAction(
        {
          userId: selectedUserId,
          reportBy: reportBy,
          description: desc,
        },
        x => {},
        onRequestClose(),
      ),
    );
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker('photo', true, true);
      const formData = {
        uri: file.uri,
        type: file.type,
        name: file.name,
      };
      setAttachment([...attachment, formData]);
    } catch (error) {
      console.log('catch err=> _chooseFromLib', error);
      // _closeImagePicker();
      // _closeProfilePicker();
    }
  };

  const removeAttachment = index => {
    let newArr = attachment;
    newArr.splice(index, 1);
    setAttachment([...newArr]);
  };

  return (
    <View
      style={{
        position: 'absolute',
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        paddingBottom: focus ? KeyboardHeight.keyboardHeight : 0,
      }}
      // onRequestClose={onRequestClose}
      // isVisible={isVisible}
    >
      <Touchable
        onPress={() => {
          Keyboard.dismiss();
          onRequestClose();
        }}
        style={{flex: 0.5, width: SCREEN_WIDTH}}
      />
      <View style={styles.container}>
        <View>
          <MyText style={styles.header}>{'Do you want to complain?'}</MyText>
          <MyText style={styles.subHeader}>{'Type of Complain'}</MyText>
          <MyDropDown
            placeholder={'Select your complain'}
            data={complainTypes}
            mainContainerStyle={styles.seperator}
            onChangeText={_onChangeDropdown}
            value={complain}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <MyText style={styles.subHeader}>{'Message'}</MyText>
            <Text
              style={{
                color: COLORS.TEXT_GRAY,
              }}>
              (max 150 words)
            </Text>
          </View>
          <TextInput
            maxLength={500}
            multiline
            style={styles.input}
            onChangeText={val => {
              setDesc(val);
            }}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MyText style={styles.subHeader}>{'Attach Images'}</MyText>
              <TouchableOpacity
                disabled={attachment.length == 5}
                onPress={_chooseFromLib}
                style={{
                  marginLeft: dynamicSize(10),
                }}>
                <AddImg />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: COLORS.TEXT_GRAY,
              }}>
              (max 5)
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: SCREEN_WIDTH,
              flexWrap: 'wrap',
            }}>
            {attachment.map((item, index) => {
              return (
                <View style={styles.fileContainer}>
                  <Text>{item?.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeAttachment(index)}
                    style={styles.cross}>
                    <Entypo name={'cross'} size={dynamicSize(18)} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
        <Button
          onPress={reportUser}
          buttonStyle={styles.buttonStyle}
          label={'Report'}
          labelStyle={styles.btntext}
        />
      </View>
    </View>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0.1,
    // flex:0.5,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: dynamicSize(15),
    borderTopRightRadius: dynamicSize(15),
    paddingHorizontal: dynamicSize(15),
    paddingVertical: dynamicSize(20),
    justifyContent: 'space-between',
    shadowOffset: {
      height: -2,
      width: 2,
    },
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    paddingBottom: dynamicSize(45),
  },
  header: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.LARGE,
  },
  subHeader: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: FONT_SIZE.LARGE,
    marginTop: dynamicSize(4),
  },
  noText: {
    color: COLORS.DARK_RED,
    textAlign: 'center',
  },
  seperator: {
    // marginVertical: dynamicSize(8),
    borderBottomWidth: 0.5,
    borderColor: COLORS.LIGHT_GREY_OFFSET,
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: COLORS.LIGHT_GREY_OFFSET,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    maxHeight: dynamicSize(150),
    paddingBottom: dynamicSize(5),
    marginBottom: dynamicSize(10),
  },
  buttonStyle: {
    backgroundColor: COLORS.BABY_PINK,
    alignSelf: 'center',
    height: dynamicSize(50),
    marginTop: dynamicSize(1),
    width: dynamicSize(300),
  },
  btntext: {
    fontSize: FONT_SIZE.SEMI,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
  },
  fileContainer: {
    backgroundColor: COLORS.GALLERY_PLACEHOLDER_GREY,
    marginRight: dynamicSize(10),
    paddingVertical: dynamicSize(5),
    paddingHorizontal: dynamicSize(5),
    borderRadius: dynamicSize(5),
    marginVertical: dynamicSize(3),
    flexDirection: 'row',
  },
  cross: {
    top: dynamicSize(-5),
    right: dynamicSize(-5),
  },
});
