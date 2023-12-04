import moment from 'moment';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import React, {useCallback, useState} from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {styles} from './styles';
import Header from '../../../../Component/header/Header';
import DiamondIcon from '../../../../Assets/Icons/DiamondIcon.svg';
import {
  getTradeTransactionTransfer,
  getTradeTransactionListAction,
} from '../../../../Redux/Action';
import BackArrowIcon from '../../../../Assets/Icons/WhiteBackIcon.svg';
import {MyText, Touchable} from '../../../../Component/commomComponent';
import TransactionLogo from '../../../../Assets/Icons/TransactionLogo.svg';

const Transactions = ({navigation, route}) => {
  const {
    params: {userId},
  } = route;
  const [transactionList, setTransactionList] = useState([]);

  const dispatch = useDispatch();

  const LeftComponent = () => (
    <Touchable onPress={() => navigation.goBack()}>
      <BackArrowIcon />
    </Touchable>
  );

  const handleTransfer = (key, transferId) => {
    if (key === 'Transfer') {
      dispatch(
        getTradeTransactionTransfer(
          {
            transferId: transferId,
            type: 'Transfer',
          },
          getTransactionList,
        ),
      );
    } else {
      dispatch(
        getTradeTransactionTransfer(
          {
            transferId: transferId,
            type: 'Recall',
          },
          getTransactionList,
        ),
      );
    }
  };

  const renderTransactions = ({item}) => {
    return (
      <View style={styles.card}>
        <View>
          <TransactionLogo />
        </View>
        <View style={styles.infoContainer}>
          <View style={{width: wp(40)}}>
            <View>
              <MyText style={styles.userName}>
                Purchased from {item?.receiverData?.name}
              </MyText>
              <MyText style={styles.userId}>
                User Id : {item?.receiverData?.userId}
              </MyText>
            </View>
            <View>
              <MyText style={styles.userId}>Balance</MyText>
              <MyText style={styles.transactionTime}>
                {moment(item?.createdAt).format('DD-MM-YYYY hh:mm a')}
              </MyText>
            </View>
          </View>
          <View style={styles.statusCon}>
            <View style={{alignItems: 'flex-end'}}>
              <View style={styles.balanceCon}>
                <DiamondIcon width={wp(6)} />
                <MyText style={[styles.userId, {marginLeft: wp(1)}]}>
                  {item?.amount}
                </MyText>
              </View>
              <MyText style={styles.status}>{item?.status}</MyText>
            </View>
            {item?.status !== 'Transferred' && item?.status !== 'Recall' ? (
              <View style={styles.btnCon}>
                <Touchable
                  style={styles.btn}
                  onPress={() => handleTransfer('Transfer', item?._id)}>
                  <MyText style={styles.btnText}>Transfer</MyText>
                </Touchable>
                <Touchable
                  style={styles.btnWhite}
                  onPress={() => handleTransfer('Recall', item?._id)}>
                  <MyText style={styles.btnTextBlack}>Recall</MyText>
                </Touchable>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const getTransactionList = () => {
    dispatch(
      getTradeTransactionListAction(
        {
          start: 0,
          limit: 20,
          userId: userId,
          search: '',
        },
        setTransactionList,
      ),
    );
  };

  useFocusEffect(useCallback(() => getTransactionList(), []));

  return (
    <>
      <View style={styles.container}>
        <View>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <Header
            title={String('Trade Account').toUpperCase()}
            leftComponent={<LeftComponent />}
            containerStyle={styles.header}
          />
          <FlatList
            data={transactionList.reverse()}
            renderItem={renderTransactions}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingBottom: hp(15),
              paddingHorizontal: wp(2),
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Transactions;
