import React, {useEffect, useState} from 'react';
import {
  FlatList,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../../Component/header/Header';
import {SingleDiamond} from '../../../Assets/Icons/diamond';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../Utils/helper';
import {Touchable} from '../../../Component/commomComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {dobFormat} from '../../../Utils/momentHelper';
import moment from 'moment';
import {getUserSettlementDetailAction} from '../../../Redux/Action';
import {useDispatch} from 'react-redux';

const Settlement = ({navigation}) => {
  const dispatch = useDispatch();
  const maxDate = moment(
    moment().subtract(0, 'Y').format('YYYY-MM-DD'),
  ).toDate();
  const [instructionVisible, setinstructionVisible] = useState(false);
  const [fromdate, setFromDate] = useState(dobFormat(maxDate));
  const [datePicker, setDatePicker] = useState(false);
  const [choosenDate, setChoosenDate] = useState(moment().toDate());
  const [settlementList, setSettlementList] = useState({});

  useEffect(() => {
    getUserSettlementDetail();
  }, [fromdate]);

  const getUserSettlementDetail = () => {
    const payload = {
      start_date: fromdate,
      end_date: fromdate,
    };
    dispatch(
      getUserSettlementDetailAction(payload, result => {
        setSettlementList({...result?.data});
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
      <Text>Back</Text>
    </TouchableOpacity>
  );

  const _onConfirm = date => {
    const resultDob = moment(date).toDate();
    setChoosenDate(resultDob);
    setFromDate(dobFormat(resultDob));
    setDatePicker(false);
  };

  const renderItem = () => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.itemTitle}>Agent</Text>
            <Text style={styles.date}>2022-03-01 05:00:00</Text>
          </View>
          <View>
            <Text style={styles.itemTitle}>-1,440</Text>
            <View style={styles.dimondContainer}>
              <Text style={styles.status}>Paid</Text>
              <SingleDiamond width={hp(2)} height={hp(2)} marginLeft={wp(2)} />
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Next Bill Time</Text>
        <Text style={styles.date}>{settlementList?.nextSettlementDate}</Text>
      </View>
    );
  };

  const itemSeperator = () => {
    return <View style={styles.seperator} />;
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Header
          title={String('Settlement Details')}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          titleStyle={styles.title}
        />
        <View style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() => {
              setDatePicker(true);
            }}
            style={[styles.row]}>
            <Text style={styles.itemTitle}>{fromdate}</Text>
            <AntDesign name={'down'} size={wp(5)} color={COLORS.NAVY_BLUE} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setinstructionVisible(true);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.NAVY_BLUE,
              }}>
              Instructions
            </Text>
            <Entypo
              name={'help-with-circle'}
              color={COLORS.TEXT_GRAY}
              style={{
                marginLeft: wp(1),
              }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[]}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeperator}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={styles.seperator}
        />
      </View>
      {instructionVisible && (
        <View
          style={{
            position: 'absolute',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: wp(5),
          }}>
          <Touchable
            onPress={() => {
              setinstructionVisible(false);
            }}
            style={{
              flexGrow: 1,
            }}
          />
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              flexGrow: 0.3,
              borderRadius: 12,
              paddingHorizontal: wp(5),
              paddingTop: hp(2),
            }}>
            <Text
              style={[
                styles.itemTitle,
                {
                  color: COLORS.BLACK,
                },
              ]}>
              Settlement Instructions
            </Text>
            <Text
              style={{
                marginTop: hp(2),
              }}>
              1. The system will cut off for you every week automatically.{'\n'}
              {'\n'}
              2. Your wallet will receive your salary every Thursday. (It may
              delay due to holidays){'\n'}
              {'\n'}
              3. The settlement amount must be $5 and it should be integer
              multiple of $5. The remainder will be accumulated and cashed out
              in following settlement cycle
            </Text>
          </View>
          <Touchable
            onPress={() => {
              setinstructionVisible(false);
            }}
            style={{
              flexGrow: 1,
            }}
          />
        </View>
      )}
      {datePicker && (
        <DateTimePickerModal
          // minimumDate={''}
          maximumDate={maxDate}
          isVisible={datePicker}
          locale="en_GB"
          mode={'date'}
          date={choosenDate}
          // value={choosenDate}
          display={'spinner'}
          onConfirm={_onConfirm}
          onCancel={() => {
            setDatePicker(false);
          }}
        />
      )}
    </>
  );
};

export default Settlement;
