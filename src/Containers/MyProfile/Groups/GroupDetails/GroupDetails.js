import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useCallback, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {styles} from './styles';
import {
  MyList,
  MyText,
  MyImage,
  Touchable,
} from '../../../../Component/commomComponent';
import {COLORS} from '../../../../Utils/colors';
import Header from '../../../../Component/header/Header';
import {dynamicSize} from '../../../../Utils/responsive';
import PencilIcon from '../../../../Assets/Icons/pencil.svg';
import {
  getAge,
  getCountryDetailWithKey,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../Utils/helper';
import {SvgIcon} from '../../../../Component/icons';
import Gender from '../../../../Assets/Icons/Gender.svg';
import CrownIcon from '../../../../Assets/Icons/crown.svg';
import FollowIcon from '../../../../Assets/Icons/followIcon.svg';
import {
  getAnotherUserProfile,
  getBlockListAction,
  getGroupDetails,
  makeGroupAdmin,
  removeGrpMember,
  userBlockFromLive,
} from '../../../../Redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import {FONT_SIZE} from '../../../../Utils/fontFamily';
import {useFocusEffect} from '@react-navigation/native';
import {IMAGE_URL} from '../../../../Services/Api/Common';
import ReportModal from '../../../../Component/ReportModal';
import {HelperService} from '../../../../Services/Utils/HelperService';

const ADMIN_OPTIONS = ['Mute/UnMute', 'Report'];
const USER_OPTIONS = ['Follow / Unfollow', 'Report'];

const GroupDetails = ({navigation, route}) => {
  const {
    params: {groupInfo},
  } = route;
  const [grpModal, setGrpModal] = useState(false);
  const [pageXY, setPageXY] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [grpDetails, setGrpDetails] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [admins, setAdmins] = useState([]);
  const [owners, setOwners] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [reportVisible, setReportVisible] = useState(false);
  const [mute, setUnmute] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  useFocusEffect(
    useCallback(() => {
      _fetchGroupDetails();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getBlockListAction(
          {
            start: 0,
            limit: 100,
            userId: userLoginList?.user?._id,
            search: '',
          },
          list => {
            const newList = list?.data?.map(ele => ele?.userData?._id);
            setBlockList(newList);
          },
        ),
      );
    }, []),
  );

  const GRP_ACTIONS = [
    'Edit Group',
    'Exit Group',
    `${!mute ? 'Mute' : 'Unmute'}`,
  ];

  const BROAD_OPTIONS = [
    `${
      admins.includes(selectedUser?.userData?._id)
        ? 'Remove Admin'
        : 'Make Admin'
    }`,
    `${blockList.includes(selectedUser?.userData?._id) ? 'Unblock' : 'Block'}`,
    'Remove',
    `${!mute ? 'Mute' : 'Unmute'}`,
    'Report',
  ];

  const OWNER_OPTIONS = {
    true: BROAD_OPTIONS,
    false: ADMIN_OPTIONS,
  };

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.BLACK}
        size={dynamicSize(18)}
        style={{
          marginRight: wp(1),
        }}
      />
    </TouchableOpacity>
  );
  const rightHeaderComponent = (
    <Touchable onPress={() => setGrpModal(!grpModal)} style={styles.next}>
      <Entypo
        color={COLORS.BLACK}
        size={dynamicSize(18)}
        name={'dots-three-vertical'}
      />
    </Touchable>
  );

  const profileRedirection = userId => {
    dispatch(
      getAnotherUserProfile({userId}, data => {
        if (data?.user) {
          navigation.navigate('UserProfile', data?.user);
        }
      }),
    );
  };

  const renderItem = ({item}) => {
    return (
      <Touchable
        onPress={() => profileRedirection(item?.userData?._id)}
        style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {item?.userData?.profile ? (
            <MyImage
              source={{uri: `${IMAGE_URL}${item?.userData?.profile}`}}
              style={styles.userImg}
            />
          ) : (
            <FontAwesome
              name={'user-circle-o'}
              color={COLORS.TAB_BORDER}
              size={wp(10.5)}
              style={{
                marginRight: wp(3),
              }}
            />
          )}
          <View style={styles.nameContainer}>
            <MyText style={{}}>
              {item?.userData?.name}{' '}
              <MyText
                style={{color: COLORS.TEXT_GRAY, fontSize: FONT_SIZE.SMALL}}>
                {userLoginList?.user?._id === item?.userData?._id && '(you)'}
              </MyText>
            </MyText>
            <View style={styles.flagContainer}>
              <MyImage
                source={
                  getCountryDetailWithKey({
                    key: 'name',
                    value: item?.userData?.country,
                  }).icon
                }
                style={styles.flag}
              />
              <View style={styles.crownContainer}>
                <CrownIcon width={13} height={11} marginRight={5} />
                <MyText
                  style={{
                    color: 'white',
                  }}>
                  {item?.userData?.level || 0}
                </MyText>
              </View>
              <View
                style={[
                  styles.crownContainer,
                  {
                    backgroundColor: COLORS.LIGHT_VIOLET,
                  },
                ]}>
                <Gender width={8} height={10} marginRight={5} />
                <MyText
                  style={{
                    color: 'white',
                  }}>
                  {getAge(item?.userData?.DateOfBirth)}
                </MyText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rightCon}>
          {owners.includes(item?.userData?._id) && (
            <Touchable>
              <SvgIcon.adminOutline />
            </Touchable>
          )}
          {admins.includes(item?.userData?._id) ? (
            <Touchable>
              <SvgIcon.grpAdmin />
            </Touchable>
          ) : null}
          {(!admins.includes(item?.userData?._id) &&
            admins.includes(userLoginList?.user?._id)) ||
          (!owners.includes(item?.userData?._id) &&
            owners.includes(userLoginList?.user?._id)) ? (
            <Touchable
              onPress={evt => {
                owners.includes(userLoginList?.user?._id) && setIsOwner(true);
                admins.includes(userLoginList?.user?._id) && setIsAdmin(true);
                setSelectedUser(item);
                setPageXY({
                  x: evt.nativeEvent.pageX,
                  y: evt.nativeEvent.pageY,
                });
              }}>
              <Entypo
                color={COLORS.BLACK}
                size={dynamicSize(18)}
                name={'dots-three-vertical'}
              />
            </Touchable>
          ) : null}
        </View>
      </Touchable>
    );
  };
  const handleGrpAct = key => {
    switch (key) {
      case 'Exit Group':
        setGrpModal(false);
        setExitModal(true);
        break;

      case 'Edit Group':
        setGrpModal(false);
        handleEdit();
        break;
      case 'Mute':
      case 'Unmute':
        setUnmute(!mute);
        setGrpModal(false);

      default:
        break;
    }
  };
  const _fetchGroupDetails = () => {
    const param = groupInfo?._id;
    dispatch(
      getGroupDetails(param, result => {
        if (result) {
          setGrpDetails(result?.data);
          setMembers(result?.data[0]?.users);
          const adminArr = result?.data[0]?.users?.filter(e => e.isAdmin);
          setAdmins(adminArr.map(e => e?.userData?._id));
          const ownerArr = result?.data[0]?.users?.filter(e => e.isOwner);
          setOwners(ownerArr.map(e => e?.userData?._id));
        }
      }),
    );
  };

  const handleMakeAdmin = () => {
    const params = {
      userId: selectedUser?.userData?._id,
      id: groupInfo?._id,
    };
    dispatch(
      makeGroupAdmin(params, res => {
        if (res) {
          if (!admins.includes(selectedUser?.userData?._id)) {
            const arr = admins;
            arr.push(selectedUser?.userData?._id);
            setAdmins(arr);
          } else {
            const arr = admins.filter(e => e !== selectedUser?.userData?._id);
            setAdmins(arr);
          }
        }
        setPageXY(false);
      }),
    );
  };

  const _Block = () => {
    const param = {
      userId: selectedUser?.userData?._id,
      blockedBy: userLoginList?.user?._id,
    };
    dispatch(
      userBlockFromLive(param, result => {
        if (result) {
          if (!blockList.includes(selectedUser?.userData?._id)) {
            const arr = blockList;
            arr.push(selectedUser?.userData?._id);
            setBlockList(arr);
          } else {
            const arr = blockList.filter(
              e => e !== selectedUser?.userData?._id,
            );
            setBlockList(arr);
          }
          setPageXY(false);
        }
      }),
    );
  };

  const _Remove = () => {
    const params = {
      userId: selectedUser?.userData?._id,
      id: groupInfo?._id,
    };
    dispatch(
      removeGrpMember(params, res => {
        if (res) {
          HelperService.showToast(res?.message);
          setPageXY(false);
          const arr = members.filter(
            e => e?.userData?._id !== selectedUser?.userData?._id,
          );
          setMembers(arr);
        }
      }),
    );
  };

  const handleOwnerAct = key => {
    switch (key) {
      case 'Make Admin':
        return handleMakeAdmin();
      case 'Remove Admin':
        return handleMakeAdmin();
      case 'Block':
        return _Block();
      case 'Unblock':
        return _Block();
      case 'Remove':
        return _Remove();
      case 'Report':
        setPageXY(false);
        setReportVisible(true);
        break;
      case 'Mute':
      case 'Unmute':
        setUnmute(!mute);
        setPageXY(false);
        break;

      default:
        break;
    }
  };
  const handleAdd = () =>
    navigation.navigate('GroupInvite', {group: groupInfo, members});
  const handleExitYes = () => {
    const params = {
      userId: userLoginList?.user?._id,
      id: groupInfo?._id,
    };
    dispatch(
      removeGrpMember(params, res => {
        if (res) {
          HelperService.showToast(res?.message);
          navigation.navigate('GroupCreation');
        }
      }),
    );
    setExitModal(false);
  };
  const handleExitNo = () => setExitModal(false);
  const handleEdit = () => navigation.navigate('GroupInfo', groupInfo);
  const _closeReportVisible = () => {
    setReportVisible(false);
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <Header
          title={''}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          rightComponent={rightHeaderComponent}
        />
        <View style={styles.profileCon}>
          {grpDetails[0]?.icon !== 'chat_group/default.png' ? (
            <MyImage
              style={styles.profilePic}
              source={{uri: `${IMAGE_URL}${grpDetails[0]?.icon}`}}
            />
          ) : (
            <View style={[styles.profilePic, styles.grpIcon]}>
              <FontAwesome5Icon
                name={'users'}
                color={COLORS.TAB_BORDER}
                size={wp(15)}
              />
            </View>
          )}
          <Touchable onPress={handleEdit} style={styles.editIcon}>
            <PencilIcon width={22} height={22} />
          </Touchable>
        </View>
        <MyText style={styles.grpName}>{grpDetails[0]?.groupName}</MyText>
        <MyText style={styles.participantsCount}>
          {members?.length} Participants
        </MyText>
        <MyList
          data={members}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        <Touchable onPress={handleAdd} style={styles.btn}>
          <FollowIcon fill={COLORS.WHITE} />
          <MyText style={styles.addTxt}>Add</MyText>
        </Touchable>
      </View>

      {grpModal && (
        <>
          <Touchable
            style={styles.overlay}
            onPress={() => setGrpModal(false)}
          />
          <View style={styles.modal}>
            {GRP_ACTIONS.map((item, i) => (
              <Touchable
                key={`${item}_act`}
                onPress={() => handleGrpAct(item)}
                style={[
                  styles.optCon,
                  GRP_ACTIONS.length - 1 !== i && {
                    borderBottomWidth: 1,
                  },
                ]}>
                <MyText style={styles.opt}>{item}</MyText>
              </Touchable>
            ))}
          </View>
        </>
      )}
      {pageXY ? (
        <>
          <Touchable style={styles.overlay} onPress={() => setPageXY(null)} />
          <View
            style={[
              {
                right: SCREEN_WIDTH - pageXY.x,
                bottom: SCREEN_HEIGHT - pageXY.y,
              },
              styles.xyModal,
            ]}>
            {OWNER_OPTIONS[isOwner].map((item, i) => (
              <Touchable
                key={`${item}_act`}
                onPress={() => handleOwnerAct(item)}
                style={[
                  styles.optCon,
                  GRP_ACTIONS.length - 1 !== i && {
                    borderBottomWidth: 1,
                  },
                ]}>
                <MyText style={styles.opt}>{item}</MyText>
              </Touchable>
            ))}
          </View>
        </>
      ) : null}
      {exitModal && (
        <>
          <Touchable
            style={styles.overlay}
            onPress={() => setExitModal(false)}
          />
          <View style={styles.exitModal}>
            <MyText style={styles.exitText}>
              Do you really want to exit the group ?
            </MyText>
            <View style={styles.modalActCon}>
              <Touchable onPress={handleExitYes}>
                <MyText style={styles.modalAct}>Yes</MyText>
              </Touchable>
              <Touchable onPress={handleExitNo}>
                <MyText style={styles.modalAct}>No</MyText>
              </Touchable>
            </View>
          </View>
        </>
      )}
      {reportVisible && (
        <ReportModal
          isVisible={reportVisible}
          onRequestClose={_closeReportVisible}
          reportBy={userLoginList?.user?._id}
          selectedUserId={selectedUser?.userData?._id}
        />
      )}
    </>
  );
};

export default GroupDetails;
