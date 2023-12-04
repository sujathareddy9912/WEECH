import React, {useEffect, useState} from 'react';
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
import {SingleDiamond} from '../../../Assets/Icons/diamond';
import {Text as SvgText} from 'react-native-svg';
import Dollor from '../../../Assets/Icons/blueDollor.svg';
import LinearGradient from 'react-native-linear-gradient';
import Coin from '../../../Assets/Icons/noto_coin.svg';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Image} from 'react-native-animatable';
import {BarChart} from 'react-native-svg-charts';
import {
  LinearGradient as SvgLinearGradient,
  Defs,
  Stop,
} from 'react-native-svg';
import * as scale from 'd3-scale';
import {FONT_FAMILY} from '../../../Utils/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {getUserEarningListAction} from '../../../Redux/Action';
import {UserServices} from '../../../Services/Api/userServices';
import {IMAGE_URL} from '../../../Services/Api/Common';
import {dynamicSize} from '../../../Utils/responsive';

const MyEarning = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [myEarning, setMyEarning] = useState([]);
  const [label, setLabel] = useState([]);
  const [value, setValue] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [agencyDetail, setAgencyData] = useState();

  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  useEffect(() => {
    getUserEarning();
  }, []);

  const getUserEarning = () => {
    dispatch(
      getUserEarningListAction(result => {
        setMyEarning(result?.data);
      }),
    );
  };

  useEffect(() => {
    let max = 0;
    let tempLabel = [];
    let tempValue = [];
    myEarning?.weekGraph &&
      myEarning?.weekGraph.map(item => {
        item?.total > max && (max = item?.total);
        tempLabel.push(item?.day);
        tempValue.push(Number(item?.total));
      });
    setMaxValue(Number(max));
    setLabel([...tempLabel].reverse());
    setValue([...tempValue].reverse());
  }, [myEarning]);

  const getAgencyDetails = async () => {
    const data = await UserServices.getAgencyDetail(
      userLoginList?.user?.agency_id,
    );
    setAgencyData(data?.data?.result);
  };

  useEffect(() => {
    getAgencyDetails();
  }, []);

  const Gradient = () => (
    <Defs>
      <SvgLinearGradient
        id={'gradient'}
        x1={'0%'}
        y1={'0%'}
        x2={'0%'}
        y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#EC008C'} stopOpacity={1} />
        <Stop offset={'90%'} stopColor={'#FC6767'} stopOpacity={0.8} />
      </SvgLinearGradient>
    </Defs>
  );

  const LabelsY = ({x, y, bandwidth, data}) =>
    label.map((value, index) => {
      return (
        <SvgText
          key={index}
          x={x(index) + bandwidth / 2}
          y={y(0) + 15}
          fontSize={14}
          fill={COLORS.NAVY_BLUE}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value}
        </SvgText>
      );
    });
  const LabelsX = ({x, y, bandwidth, data}) =>
    data.map((value, index) => {
      return (
        <SvgText
          key={index}
          x={x(index) + bandwidth / 2}
          y={y(value) - 10}
          fontSize={14}
          fontWeight={'bold'}
          fill={'url(#gradient)'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value}
        </SvgText>
      );
    });
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

  const TableRow = props => {
    const {rightColm, leftColm} = props;
    return (
      <View style={styles.rowContainer}>
        <View style={styles.box}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.POPPINS_REGULAR,
            }}>
            {leftColm}
          </Text>
        </View>
        <View
          style={[
            styles.box,
            {
              alignItems: 'flex-end',
              paddingRight: wp(5),
              borderStartWidth: 1,
            },
          ]}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.POPPINS_REGULAR,
            }}>
            {rightColm}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('My Earning')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(2),
        }}
        showsVerticalScrollIndicator={false}
        style={styles.bodyContainer}>
        <View style={styles.cardContainer}>
          <LinearGradient style={styles.card} colors={['#EC008C', '#FC6767']}>
            <View>
              <Text style={styles.cardTitle}>Earnings</Text>
              <View style={styles.dimondContainer}>
                {!!myEarning?.userEarning ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={[
                        styles.cardTitle,
                        {
                          fontSize: 30,
                          marginRight: dynamicSize(4),
                          lineHeight: dynamicSize(34),
                          textAlign: 'center',
                        },
                      ]}>
                      {Math.floor(myEarning?.userEarning)}
                    </Text>
                    <SingleDiamond width={24} height={24} />
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={[
                        styles.cardTitle,
                        {
                          fontSize: 30,
                          marginRight: dynamicSize(4),
                          lineHeight: dynamicSize(34),
                          textAlign: 'center',
                        },
                      ]}>
                      {0}
                    </Text>
                    <SingleDiamond width={24} height={24} />
                  </View>
                )}
              </View>
            </View>
            
            {!!myEarning?.userEarningDollar && (
              <Text style={styles.cardTitle}>
                =$ {myEarning?.userEarningDollar || 0.0}
              </Text>
            )}

            <View style={styles.dollorContainer}>
              <Coin width={wp(31)} height={hp(17)} style={styles.coin} />
            </View>
          </LinearGradient>
          <LinearGradient style={styles.card} colors={['#1F79FF', '#0042A5']}>
            <Text style={styles.cardTitle}>My Wallet</Text>
            <Text style={styles.cardTitle}>$ {myEarning?.userWallet}</Text>
            <View style={styles.dollorContainer}>
              <Dollor width={wp(25)} height={hp(13)} style={styles.dollor} />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.weeklyContainer}>
          <Text style={styles.chartTitle}>Weekly Report</Text>
          <BarChart
            spacingInner={0.8}
            spacingOuter={0.1}
            gridMin={0}
            gridMax={maxValue + (30 * maxValue) / 100}
            style={styles.bar}
            data={value}
            animate={true}
            animationDuration={1000}
            xScale={scale.scaleTime}
            svg={{fill: 'url(#gradient)'}}
            contentInset={{top: 0, bottom: 25, left: 15, right: 15}}>
            <Gradient />
            <LabelsX />
            <LabelsY />
          </BarChart>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EarningDetails');
          }}
          style={styles.detailContainer}>
          <Text style={styles.detailText}>Earning Details</Text>
          <FontAwesome5Icon
            name={'chevron-right'}
            color={COLORS.NAVY_BLUE}
            size={wp(4)}
            style={{
              marginRight: wp(1),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settlement');
          }}
          style={styles.detailContainer}>
          <Text style={styles.detailText}>Settlement Details</Text>
          <FontAwesome5Icon
            name={'chevron-right'}
            color={COLORS.NAVY_BLUE}
            size={wp(4)}
            style={{
              marginRight: wp(1),
            }}
          />
        </TouchableOpacity>
        <View style={styles.todayContainer}>
          <Text
            style={[
              styles.detailText,
              {
                marginLeft: wp(2),
                marginBottom: hp(1),
              },
            ]}>
            Today
          </Text>
          <TableRow
            leftColm={'Total'}
            rightColm={myEarning?.todayData && myEarning?.todayData[0]?.total}
          />
          <TableRow
            leftColm={'Live Duration'}
            rightColm={`${
              myEarning?.todayData && myEarning?.todayData[0]?.liveMinutes
            }/mins`}
          />
          <TableRow
            leftColm={'Call Duration'}
            rightColm={`${
              myEarning?.todayData && myEarning?.todayData[0]?.liveMinutes
            }/mins`}
          />
          <TableRow
            leftColm={'Chat'}
            rightColm={`${
              myEarning?.todayData && myEarning?.todayData[0]?.liveMinutes
            } Message`}
          />
        </View>

        {!!agencyDetail && (
          <TouchableOpacity style={styles.agentContainer}>
            <Text style={styles.agentText}>My Agent</Text>
            <View style={styles.rowContainer}>
              <View style={styles.logoContainer}>
                <Image
                  resizeMode="center"
                  style={{width: '100%', height: '100%'}}
                  source={{uri: `${IMAGE_URL}${agencyDetail?.profile}`}}
                />
              </View>
              <Text style={styles.agentText}>{agencyDetail?.name} Agency</Text>
            </View>
          </TouchableOpacity>
        )}

        <View
          style={{
            alignItems: 'center',
            marginVertical: hp(1),
          }}>
          <Text>Weecha ID :{route?.params?.weechaId}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyEarning;
