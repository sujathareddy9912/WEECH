import React from 'react';
import {Dimensions, View, Text, Pressable} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').width;

const imgSize = (deviceWidth / 10) * 1;
const checkedImgSize = (imgSize / 10) * 6;
const popupWidth = (deviceWidth / 10) * 8;

const SelectImageDialog = React.forwardRef((props, ref) => {
  const {
    title,
    onPressTakePhoto,
    onPressChooseFromLibrary,
    onPressCancel,
    isVideo,
    ...attributes
  } = props;

  return (
    <RBSheet
      ref={ref}
      height={deviceHeight}
      openDuration={250}
      customStyles={{
        container: {
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white',
          height: dynamicSize(300),
        },
      }}>
      <Text
        style={{
          paddingLeft: 16,
          marginTop: 16,
          fontSize: 12,
          fontWeight: '700',
          color: '#f47920',
          textAlign: 'center', // <-- the magic
        }}>
        {isVideo
          ? strings('filePicker.selectVideo')
          : strings('filePicker.selectPhoto')}
      </Text>
      <View
        style={{
          width: deviceWidth,
          height: 1,
          marginTop: 16,
          backgroundColor: '#eaeaea',
        }}></View>

      <View
        style={{
          width: '100%',
          paddingHorizontal: 30,
          justifyContent: 'flex-end',
          height: '75%',
        }}>
        <Pressable
          style={{
            height: 55,
            backgroundColor: 'blue',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={onPressTakePhoto}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {isVideo
              ? strings('filePicker.takeVideo')
              : strings('filePicker.takePhoto')}
          </Text>
        </Pressable>
        <Pressable
          style={{
            height: 55,
            backgroundColor: 'blue',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={onPressChooseFromLibrary}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {strings('filePicker.chooseFromLibrary')}
          </Text>
        </Pressable>
        <Pressable
          style={{
            height: 55,
            backgroundColor: 'blue',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={onPressCancel}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            {strings('filePicker.cancel')}
          </Text>
        </Pressable>
      </View>
    </RBSheet>
  );
});
export default SelectImageDialog;
