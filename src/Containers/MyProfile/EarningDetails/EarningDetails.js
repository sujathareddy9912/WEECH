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
import Header from '../../../Component/header/Header';
import {SingleDiamond} from '../../../Assets/Icons/diamond';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getUserEarningDetailAction} from '../../../Redux/Action';
import {useDispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {dobFormat} from '../../../Utils/momentHelper';

const EarningDetails = ({navigation}) => {
  const maxDate = moment(
    moment().subtract(0, 'Y').format('YYYY-MM-DD'),
  ).toDate();

  // This function is to get current week start and end dates
  var today = new Date();
  var day = today.getDay(); // Get current day (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  var diff = today.getDate() - day + (day == 0 ? -6 : 1); // Adjust to get Monday if today is Sunday
  var startOfWeek = new Date(today.setDate(diff));
  var endOfWeek = new Date(today.setDate(diff + 6));
  // This function is to get current week start and end dates

  // This function is to get one Month date
  var oneMonth = new Date();
  const oneMonthAgo = today.getMonth();
  oneMonth.setMonth(oneMonthAgo - 1);
  // This function is to get one Month date

  const dispatch = useDispatch();
  const [datePicker, setDatePicker] = useState(false);
  const [from, setFrom] = useState(false);
  const [todate, setToDate] = useState(dobFormat(startOfWeek));
  const [fromdate, setFromDate] = useState(dobFormat(maxDate));
  const [choosenDate, setChoosenDate] = useState(moment().toDate());
  const [earningDetailList, setEarningDetailList] = useState([]);
  useEffect(() => {
    getUserEarningDetail();
  }, []);

  const getUserEarningDetail = () => {
    const payload = {
      start_date: fromdate,
      end_date: todate,
    };
    dispatch(
      getUserEarningDetailAction(payload, result => {
        setEarningDetailList(result?.data);
      }),
    );
  };

  const _onConfirm = date => {
    const resultDob = moment(date).toDate();
    setChoosenDate(resultDob);
    from ? setToDate(dobFormat(resultDob)) : setFromDate(dobFormat(resultDob));
    setFrom(false);
    setDatePicker(false);
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

  const rightHeaderComponent = (
    <TouchableOpacity
      style={[
        styles.backContainer,
        {
          justifyContent: 'flex-end',
        },
      ]}
      onPress={() => {
        getUserEarningDetail();
      }}>
      <Text style={styles.itemTitle}>Apply</Text>
    </TouchableOpacity>
  );

  const getCallDuration = () => {};
  const renderItem = ({item}) => {
    let callDuration = item?.seconds;

    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.itemTitle}>{item?.notes}</Text>
            <Text style={styles.date}>
              {moment(item?.createdAt).format('YYYY-MM-Do h:mm:ss a')}
            </Text>
          </View>
          <View>
            <View style={styles.dimondContainer}>
              <Text style={styles.itemTitle}>+{item?.income}</Text>
              <SingleDiamond width={hp(2)} height={hp(2)} marginLeft={wp(2)} />
            </View>
            <Text style={styles.time}>
              {moment.utc(item?.seconds * 1000).format('HH:mm:ss')}
            </Text>
          </View>
        </View>
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
          title={String('Earning Details')}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          titleStyle={styles.title}
          rightComponent={rightHeaderComponent}
        />
        <View style={styles.filterContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setDatePicker(true);
                setFrom(true);
              }}
              style={[
                styles.row,
                {
                  marginRight: wp(3),
                },
              ]}>
              <Text style={styles.itemTitle}>{todate}</Text>
              <AntDesign name={'down'} size={wp(5)} color={COLORS.NAVY_BLUE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDatePicker(true);
              }}
              style={[styles.row]}>
              <Text style={styles.itemTitle}>{fromdate}</Text>
              <AntDesign name={'down'} size={wp(5)} color={COLORS.NAVY_BLUE} />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity style={[styles.row]}>
            <Text style={styles.itemTitle}>All</Text>
            <AntDesign name={'down'} size={wp(5)} color={COLORS.NAVY_BLUE} />
          </TouchableOpacity> */}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={earningDetailList}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeperator}
        />
      </View>
      {datePicker && (
        <DateTimePickerModal
          minimumDate={oneMonth}
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
            setFrom(false);
          }}
        />
      )}
    </>
  );
};

export default EarningDetails;
