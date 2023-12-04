import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {styles} from './styles';
import {COLORS} from '../../../../Utils/colors';
import {SvgIcon} from '../../../../Component/icons';
import Header from '../../../../Component/header/Header';
import BlueGame from '../../../../Assets/Icons/blueGame.svg';
import SmallGiftIcon from '../../../../Assets/Icons/giftIcon.svg';
import {HelperService} from '../../../../Services/Utils/HelperService';
import {MyText, Touchable} from '../../../../Component/commomComponent';
import {grpChatCreation, grpChatUpdate} from '../../../../Redux/Action';

const GRP_TYPE = [
  {id: 1, title: 'Work'},
  {id: 2, title: 'Entertainment'},
  {id: 3, title: 'Friends'},
  {id: 4, title: 'Interest'},
  {id: 5, title: 'Life'},
  {id: 6, title: 'Other'},
];

const GroupType = ({navigation, route}) => {
  const {
    params: {groupName, status, file, editFlag, chatId},
  } = route;
  const [type, setSelectedType] = useState(null);
  const dispatch = useDispatch();

  const handleGrpCreate = () => {
    if (type) {
      if (!editFlag) {
        dispatch(
          grpChatCreation({groupName, file, type, status}, res => {
            if (res) {
              navigation.navigate('GroupInvite', {group: res?.data});
            }
          }),
        );
      } else {
        dispatch(
          grpChatUpdate({groupName, file, type, status, chatId}, res => {
            if (res) {
              navigation.navigate('GroupDetails', {groupInfo: res?.data});
            }
          }),
        );
      }
    } else {
      HelperService.showToast('Please select a group type');
    }
  };
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
    <Touchable onPress={handleGrpCreate} style={styles.next}>
      <MyText>Next</MyText>
    </Touchable>
  );
  const getIcon = key => {
    switch (key) {
      case 'Work':
        return <SmallGiftIcon width={50} height={50} />;
      case 'Entertainment':
        return <BlueGame width={50} height={50} />;
      case 'Friends':
        return <SvgIcon.outlineHeart />;
      case 'Interest':
        return <SvgIcon.music />;
      case 'Life':
        return <SvgIcon.suitcase />;
      case 'Other':
        return <SvgIcon.box />;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <Header
        title={'Group Type'}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
        rightComponent={rightHeaderComponent}
      />
      <View style={styles.typeCon}>
        {GRP_TYPE.map(({id, title}) => (
          <View key={title + id}>
            <Touchable
              onPress={() => setSelectedType(title)}
              style={[
                styles.iconCon,
                type === title && {
                  borderWidth: 2,
                  borderColor: COLORS.LIGHT_MAGENTA,
                },
              ]}>
              {getIcon(title)}
            </Touchable>
            <MyText style={styles.typeTitle}>{title}</MyText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default GroupType;
