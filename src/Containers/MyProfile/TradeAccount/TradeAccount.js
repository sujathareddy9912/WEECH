import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {
  tradeInitializerAction,
  tradeUserExistingAction,
} from '../../../Redux/Action';
import {styles} from './styles';
import {
  MyText,
  Touchable,
  MyTextInput,
} from '../../../Component/commomComponent';
import Header from '../../../Component/header/Header';
import {InputWithLabel} from '../../../Component/Input';
import Check from '../../../Assets/Icons/checkbox/Check.svg';
import DiamondGold from '../../../Assets/Icons/DiamondGold.svg';
import PinkBox from '../../../Assets/Icons/checkbox/PinkBox.svg';
import BackArrowIcon from '../../../Assets/Icons/WhiteBackIcon.svg';
import TransactionIcon from '../../../Assets/Icons/Transaction.svg';
import CheckboxContainer from '../../../Assets/Icons/checkbox/CheckboxContainer.svg';

const fixedValue = 1000;

const TradeAccount = ({navigation, route}) => {
  const {
    params: {inventoryAmt, _id},
  } = route;
  const [userId, setUserId] = useState('');
  const [tradeAcc, setCheckTradeAcc] = useState(false);
  const [transferAmount, setTransferAmount] = useState('0');

  const dispatch = useDispatch();

  const LeftComponent = () => (
    <Touchable onPress={() => navigation.goBack()}>
      <BackArrowIcon />
    </Touchable>
  );
  const RightComponent = () => (
    <Touchable
      style={{alignItems: 'flex-end'}}
      onPress={() => navigation.navigate('Transactions', {userId: _id})}>
      <TransactionIcon />
    </Touchable>
  );
  const Checkbox = ({label = '', check, handlePress}) => {
    return (
      <Touchable onPress={() => handlePress(check)}>
        <View style={{flexDirection: 'row'}}>
          {check ? (
            <CheckboxContainer />
          ) : (
            <>
              <View>
                <PinkBox />
                <View style={{position: 'absolute'}}>
                  <Check />
                </View>
              </View>
            </>
          )}
          <MyText style={styles.checkboxLabel}>{label}</MyText>
        </View>
      </Touchable>
    );
  };

  const handleTransferCallback = resp => {
    let params = {
      receiverId: userId,
      senderId: _id,
      type: tradeAcc ? 'Trade Account' : 'Balance',
      amount: transferAmount * 1000,
    };
    if (resp === 'User Exist') {
      dispatch(
        tradeInitializerAction(params, () =>
          navigation.navigate('Transactions', {userId: _id}),
        ),
      );
    } else {
    }
  };

  const handleTransfer = () => {
    let params = {userId: userId};
    dispatch(tradeUserExistingAction(params, handleTransferCallback));
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <Header
            title={String('Trade Account').toUpperCase()}
            leftComponent={<LeftComponent />}
            containerStyle={styles.header}
            rightComponent={<RightComponent />}
          />
          <View style={styles.inventoryInfo}>
            <MyText style={styles.heading}>Inventory Amount</MyText>
            <DiamondGold height={wp(6)} width={wp(6)} />
          </View>
          <MyText style={styles.amount}>{inventoryAmt}</MyText>
          <View style={styles.inputCon}>
            <InputWithLabel
              value={userId}
              style={styles.input}
              label={'Transfer To'}
              onChangeText={setUserId}
              placeholder={'#123456'}
              keyboardType={'number-pad'}
              labelStyle={styles.labelStyle}
              textInputStyle={styles.textInputStyle}
            />
            <View style={styles.customInputCon}>
              <MyText style={styles.label}>Transfer to His/Her</MyText>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Checkbox
                    label="Balance"
                    check={tradeAcc}
                    handlePress={state => {
                      setCheckTradeAcc(!state);
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Checkbox
                    label="Trade Account"
                    check={!tradeAcc}
                    handlePress={state => {
                      setCheckTradeAcc(state);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.customInputCon}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <MyText style={styles.label}>Transfer Amount</MyText>
                <MyText style={styles.label}>Total</MyText>
              </View>
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
                    justifyContent: 'center',
                  }}>
                  <MyTextInput
                    style={[
                      {
                        width: wp(20),
                        height: wp(10),
                        paddingVertical: 0,
                        borderBottomWidth: 1,
                      },
                      styles.textInputStyle,
                    ]}
                    value={transferAmount}
                    keyboardType={'number-pad'}
                    onChangeText={setTransferAmount}
                  />
                  <MyText style={styles.checkboxLabel}>
                    {' '}
                    X {fixedValue} ={' '}
                  </MyText>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <DiamondGold height={wp(6)} width={wp(6)} />
                  <MyText style={styles.checkboxLabel}>
                    {transferAmount * fixedValue}
                  </MyText>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <MyText style={styles.description}>
            After clicking transfer, the user will receive the diamonds that are
            ready for activation. The diamonds will be activated once they are
            sent by the sender.
          </MyText>
          <Touchable style={styles.btn} onPress={handleTransfer}>
            <MyText style={styles.btnText}>Transfer</MyText>
          </Touchable>
        </View>
      </View>
    </>
  );
};

export default TradeAccount;
