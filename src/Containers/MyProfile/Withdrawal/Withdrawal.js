import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {COLORS} from '../../../Utils/colors';
import Header from '../../../Component/header/Header';
import {FONT_FAMILY, FONT_SIZE} from '../../../Utils/fontFamily';
import {Button, Touchable} from '../../../Component/commomComponent';
import {
  addUserWithdrawalReq,
  deleteWithdrawalList,
  getUserWithdrawalList,
} from '../../../Redux/Action';
import {SingleDiamond} from '../../../Assets/Icons/diamond';

const Withdrawal = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return state;
  });
  const {userLoginList} = state.authReducer;
  const [listStart, setListStart] = useState(0);
  const [withdrawalList, setWithdrawalList] = useState([]);
  const [withdrawalOptionVisible, setWithdrawalOptionVisible] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(null);
  const [withdrawalComment, setWithdrawalComment] = useState(null);

  const [withdrawalAmountError, setWithdrawalAmountError] = useState(null);
  const [withdrawalCommentError, setWithdrawalCommentError] = useState(null);

  useEffect(() => {
    getWithdrawalList();
  }, []);

  const getWithdrawalList = () => {
    const payload = {
      userId: userLoginList?.user?._id,
      limit: 10,
      start: listStart,
    };
    dispatch(
      getUserWithdrawalList(payload, result => {
        setWithdrawalList(result?.data);
      }),
    );
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
      <Text style={{color: COLORS.BLACK}}>Back</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const dateString = item?.updatedAt;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();

    return (
      <Touchable
        style={styles.itemContainer}
        onLongPress={() => {
          Alert.alert('', `Do you want to delete this withdrawal!`, [
            {
              text: 'NO',
            },
            {
              text: 'YES',
              onPress: () => {
                dispatch(
                  deleteWithdrawalList({withdrawalId: item?._id}, result => {
                    getWithdrawalList();
                  }),
                );
              },
            },
          ]);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.itemTitle}>{item?.comment}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <View>
            <Text style={styles.itemTitle}>{item?.amount}</Text>
            <View style={styles.dimondContainer}>
              <Text style={styles.status}>{item?.settlementStatus}</Text>
              <SingleDiamond width={hp(2)} height={hp(2)} marginLeft={wp(2)} />
            </View>
          </View>
        </View>
      </Touchable>
    );
  };

  const itemSeperator = () => {
    return <View style={styles.seperator} />;
  };

  const handleAddWithdrawalOption = () => {
    setWithdrawalOptionVisible(!withdrawalOptionVisible);
  };

  const submitAddWithdrawal = () => {
    const payload = {
      userId: userLoginList?.user?._id,
      amount: withdrawalAmount,
      comment: withdrawalComment,
    };

    if (withdrawalAmount == null || withdrawalAmount <= 5) {
      setWithdrawalAmountError('Amount should be more then $5');
    } else if (withdrawalComment == null || withdrawalComment == '') {
      setWithdrawalCommentError('Withdrawal comment is required!');
    } else {
      dispatch(
        addUserWithdrawalReq(payload, result => {
          setWithdrawalAmount(null);
          setWithdrawalComment(null);
          setWithdrawalAmountError(null)
          setWithdrawalCommentError(null)
          getWithdrawalList();
          handleAddWithdrawalOption();
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('Withdrawal Details')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={withdrawalList}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeperator}
        ListHeaderComponentStyle={styles.seperator}
      />

      <Button
        buttonStyle={styles.addWithdrawButton}
        isDark
        label="Add Withdrawal"
        width={'75%'}
        onPress={() => handleAddWithdrawalOption()}
      />

      <Modal isVisible={withdrawalOptionVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalRow}>
            <Text style={styles.modalTItle}>Add Withdrawal</Text>
            <FontAwesome
              name="close"
              color={COLORS.BLACK}
              size={wp(5)}
              onPress={() => handleAddWithdrawalOption()}
            />
          </View>
          <View style={styles.addWithdrawalFormContainer}>
            <View style={{marginVertical: hp(1)}}>
              <Text style={styles.formTitle}>Amount</Text>
              <TextInput
                placeholder="Amount should be more than $5"
                value={withdrawalAmount}
                onChangeText={e => setWithdrawalAmount(e)}
                style={styles.formInputContainer}
                keyboardType="numeric"
              />
              {withdrawalAmountError ? (
                <Text style={styles.modalError}>{withdrawalAmountError}</Text>
              ) : null}
            </View>
            <View style={{marginVertical: hp(1)}}>
              <Text style={styles.formTitle}>Comment</Text>
              <TextInput
                placeholder="Add withdrawal comment!"
                value={withdrawalComment}
                onChangeText={e => setWithdrawalComment(e)}
                style={styles.formInputContainer}
              />

              {withdrawalCommentError ? (
                <Text style={styles.modalError}>{withdrawalCommentError}</Text>
              ) : null}
            </View>
          </View>
          <Button
            buttonStyle={styles.addWithdrawButton}
            isDark
            label="Submit"
            width={'75%'}
            onPress={() => submitAddWithdrawal()}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    color: COLORS.BLACK,
  },
  header: {
    backgroundColor: COLORS.OFFWHITE,
    paddingTop: hp(5),
    height: hp(12),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addWithdrawButton: {
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  itemContainer: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
  },
  seperator: {
    borderBottomWidth: 0.5,
    borderColor: COLORS.TEXT_GRAY,
  },
  itemTitle: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color: COLORS.NAVY_BLUE,
    fontSize: FONT_SIZE.LARGE,
    maxWidth: wp(80),
  },
  dimondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: COLORS.TEXT_GRAY,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginTop: hp(1),
  },
  status: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: COLORS.DARK_BLUE,
    fontSize: FONT_SIZE.SMALL,
    textAlign: 'right',
  },

  modalContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    borderRadius: 10,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTItle: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    fontSize: FONT_SIZE.LARGE,
  },
  modalError: {
    color: COLORS.RED_COLOR,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  addWithdrawalFormContainer: {
    marginBottom: hp(2),
  },
  formTitle: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
  },
  formInputContainer: {
    backgroundColor: COLORS.GALLERY_PLACEHOLDER_GREY,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
});

export default Withdrawal;
