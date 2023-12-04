import React, {useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {styles} from './styles';
import {COLORS} from '../../../../Utils/colors';
import Header from '../../../../Component/header/Header';
import GalleryIcon from '../../../../Assets/Icons/gallery.svg';
import SelectImageDialog from '../../../../Component/SelectImageDialog';
import {
  MyImage,
  MyText,
  Touchable,
} from '../../../../Component/commomComponent';
import FloatingInput from '../../../../Component/FloatingInput/FloatingInput';
import requestCameraAndAudioPermission, {
  openCamera,
  imagePicker,
} from '../../../../Utils/helper';
import {HelperService} from '../../../../Services/Utils/HelperService';
import {IMAGE_URL} from '../../../../Services/Api/Common';

const GroupInfo = ({navigation, route: {params: groupInfo}}) => {
  const [groupName, setGrpName] = useState(groupInfo?.groupName || '');
  const [status, setGrpStatus] = useState(groupInfo?.status || '');
  const [profilePic, setProfilePic] = useState(
    `${IMAGE_URL}${groupInfo?.icon}` || '',
  );
  const [fileBase64, setFileBase64] = useState('');
  const [fileUpdateStatus, setFileUpdateStatus] = useState(false);

  const refImageDialog = React.useRef();

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.BLACK}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <MyText>Back</MyText>
    </TouchableOpacity>
  );
  const rightHeaderComponent = (
    <Touchable
      onPress={() => {
        if (groupName !== '') {
          navigation.navigate('GroupType', {
            groupName,
            status,
            file: fileBase64,
            editFlag: !!groupInfo,
            chatId: groupInfo?._id,
          });
        } else {
          HelperService.showToast('Please select a group name');
        }
      }}
      style={styles.next}>
      <MyText>Next</MyText>
    </Touchable>
  );

  const _takePhoto = async () => {
    try {
      const file = await openCamera('photo', true);
      refImageDialog.current.close();
      setProfilePic(file.uri);
      setFileBase64(file.base64);
      setFileUpdateStatus(true);
    } catch (error) {
      setFileUpdateStatus(false);
    }
  };

  const _chooseFromLib = async () => {
    try {
      const file = await imagePicker('photo', true);
      refImageDialog.current.close();
      setProfilePic(file.uri);
      setFileBase64(file.base64);
      setFileUpdateStatus(true);
    } catch (error) {
      setFileUpdateStatus(false);
    }
  };

  const _closeImagePicker = () => {
    refImageDialog.current.close();
  };

  const handleImagPick = () => refImageDialog.current.open();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <Header
        title={'Group Info'}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
        rightComponent={rightHeaderComponent}
      />
      <View style={styles.profileCon}>
        {profilePic ? (
          <MyImage source={{uri: profilePic}} style={styles.avatar} />
        ) : null}
        <Touchable style={styles.galleryIcon} onPress={handleImagPick}>
          <GalleryIcon width={34} height={34} />
        </Touchable>
      </View>
      <View style={styles.form}>
        <FloatingInput
          value={groupName}
          label={'Group Name'}
          onChangeText={setGrpName}
          containerStyle={styles.input}
        />
        <FloatingInput
          value={status}
          label={'Group Status'}
          onChangeText={setGrpStatus}
          containerStyle={styles.input}
        />
        <SelectImageDialog
          key="imageRef"
          ref={refImageDialog}
          onPressTakePhoto={_takePhoto}
          onPressChooseFromLibrary={_chooseFromLib}
          onPressCancel={_closeImagePicker}
        />
      </View>
    </View>
  );
};

export default GroupInfo;
