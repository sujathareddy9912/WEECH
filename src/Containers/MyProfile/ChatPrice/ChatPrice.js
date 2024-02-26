import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../Utils/colors';
import {styles} from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../Component/header/Header';
import {Button} from '../../../Component/commomComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SingleDiamond} from '../../../Assets/Icons/diamond';
import Edit from '../../../Assets/Icons/Edit.svg';
import LinearGradient from 'react-native-linear-gradient';
import {Actionsheet, Box} from 'native-base';
import {FONT_FAMILY} from '../../../Utils/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {profleSetupAction} from '../../../Redux/Action';
import {CHATPRICE_REQUEST} from '../../../ActionConstant/chatPrice.constant';
import LoadingIndicator from '../../../Component/LoadingIndicator/LoadingIndicator';

const ChatPrice = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [isOpen, setIsopen] = useState(false);
  const [isSelected, setSelected] = useState('');
  const [optionSelected, setOptionSelected] = useState('');
  const [priceSlab, setPriceSlab] = useState(null);
  const [loading, setLoading] = useState(false);

  let stateData = useSelector(state => {
    return state?.authReducer?.userLoginList?.user;
  });
  const [userData, setUserData] = useState(stateData);

  const chatReducer = useSelector(state => state.chatPrice);

  console.log('ccccc', chatReducer);

  const {chatPriceError, chatPriceLoading, chatPriceSuccess} = chatReducer;

  useEffect(() => {
    dispatch({type: CHATPRICE_REQUEST});
  }, []);

  useEffect(() => {
    if (chatPriceSuccess && chatPriceSuccess.data) {
      setPriceSlab(chatPriceSuccess.data);
    }
  }, [chatPriceSuccess]);

  useEffect(() => {
    setLoading(chatPriceLoading);
  }, [chatPriceLoading]);

  const updatePrice = () => {
    let param = {};
    if (isSelected == '0' && optionSelected == 'Free') {
      setIsopen(false);
      navigation.navigate('FreeChatInvites');
    } else {
      switch (isSelected) {
        case '0':
          param['messageCharge'] = optionSelected;
          break;
        case '1':
          param['callCharge'] = optionSelected;
          break;
        case '2':
          param['videoCharge'] = optionSelected;
          break;
        case '3':
          param['privateMultiRoomCharge'] = optionSelected;
          break;
        default:
          break;
      }
      {
        isSelected < 4 &&
          dispatch(
            profleSetupAction(param, res => {
              setUserData(res?.user);
              setIsopen(false);
              setOptionSelected('');
            }),
          );
      }
    }
  };

  const PriceCard = ({title, price, subText, onEdit}) => {
    return (
      <LinearGradient
        style={[styles.item]}
        colors={['rgba(79, 125, 242, 0.19)', COLORS.WHITE_OFFSET]}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.dimondContainer}>
          <SingleDiamond width={wp(6)} height={hp(2)} />
          <Text style={styles.cardTitle}>{price}</Text>
          <TouchableOpacity onPress={onEdit} style={styles.edit}>
            <Edit width={wp(6)} height={hp(6)} />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardSub}>{subText}</Text>
      </LinearGradient>
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
      <Text>Back</Text>
    </TouchableOpacity>
  );

  const onEdit = index => {
    setSelected(index);
    setIsopen(true);
  };
  const closeModal = () => {
    setIsopen(false);
    setOptionSelected('');
  };
  const getPriceList = index => {
    switch (index) {
      case '0':
        return priceSlab.chat;
      case '1':
        return priceSlab.call;
      case '2':
        return priceSlab.videoCall;
      case '3':
        return priceSlab.liveRoom;
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <LoadingIndicator visible={loading} />
      <Header
        title={String('My Chat Price')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={styles.list}>
        <PriceCard
          title={'Chat Price'}
          subText={'Per Message'}
          price={userData?.messageCharge}
          onEdit={() => onEdit('0')}
        />
        <PriceCard
          title={'Audio Call Price'}
          subText={'Per Minute'}
          price={userData?.callCharge}
          onEdit={() => onEdit('1')}
        />
        <PriceCard
          title={'Video Call Price'}
          subText={'Per Minute'}
          price={userData?.videoCharge}
          onEdit={() => onEdit('2')}
        />
        <PriceCard
          title={'Private multiroom entry Price'}
          subText={'Per Minute'}
          price={userData?.privateMultiRoomCharge}
          onEdit={() => onEdit('3')}
        />
      </ScrollView>
      <Actionsheet isOpen={isOpen} onClose={closeModal}>
        <Actionsheet.Content alignItems={'center'}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: wp(4),
            }}>
            <Button
              onPress={closeModal}
              buttonStyle={[
                styles.buttonStyle,
                {
                  borderWidth: 1,
                  backgroundColor: COLORS.WHITE,
                },
              ]}
              label={'Cancel'}
              labelStyle={[
                styles.btnLabel,
                {
                  color: COLORS.BLACK,
                },
              ]}
            />
            <Button
              disabled={optionSelected == ''}
              onPress={updatePrice}
              buttonStyle={styles.buttonStyle}
              label={'Confirm'}
              labelStyle={styles.btnLabel}
            />
          </View>
          {getPriceList(isSelected).map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: hp(1),
                }}
                onPress={() => {
                  setOptionSelected(item.value);
                }}>
                <Text
                  style={[
                    styles.options,
                    optionSelected === item.value && {
                      opacity: 1,
                    },
                  ]}>
                  {item.slab} diamonds
                </Text>

                <View style={styles.seperator} />
              </TouchableOpacity>
            );
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default ChatPrice;
