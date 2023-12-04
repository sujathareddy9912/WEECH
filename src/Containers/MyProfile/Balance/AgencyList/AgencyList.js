import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Modal, StatusBar, View, Image} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {styles} from './styles';
import {COLORS} from '../../../../Utils/colors';
import India from '../../../../Assets/Icons/india.svg';
import {SvgIcon} from '../../../../Component/icons';
import {getAgencyList} from '../../../../Redux/Action';
import Header from '../../../../Component/header/Header';
import BackArrowIcon from '../../../../Assets/Icons/WhiteBackIcon.svg';
import {MyList, MyText, Touchable} from '../../../../Component/commomComponent';
import {Avatar} from 'react-native-paper';

const AgencyList = ({navigation}) => {
  const [agencyData, setAgencyData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const leftHeaderComponent = (
    <Touchable
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.WHITE}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <MyText style={{color: COLORS.WHITE}}>Back</MyText>
    </Touchable>
  );

  const rightHeaderComponent = (
    <Touchable style={styles.right} onPress={() => setRefresh(!refresh)}>
      <MyText style={{color: COLORS.WHITE}}>Refresh</MyText>
    </Touchable>
  );

  const renderItem = ({item}) => {
    return (
      <Touchable activeOpacity={0.5} style={styles.item}>
        <View style={styles.infoCon}>
          <View style={styles.avatar}>
            <MyText style={styles.avatarTxt}>{item?.name?.[0] ?? 'NA'}</MyText>
          </View>
          <View style={styles.info}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MyText style={styles.name}>{item?.name}</MyText>
              <India width={'24'} height={'24'} />
            </View>
            <View style={styles.phoneCon}>
              <SvgIcon.WhatsappIcon />
              <MyText style={styles.phone}>{item?.phone}</MyText>
            </View>
          </View>
        </View>
        <View>
          <FontAwesome5Icon
            name={'chevron-right'}
            color={COLORS.BLACK}
            size={wp(4)}
            style={{
              marginRight: wp(1),
            }}
          />
        </View>
      </Touchable>
    );
  };

  useFocusEffect(
    useCallback(() => {
      let params = {length: 20, start: 0, gender: userLoginList?.user?.gender};
      dispatch(getAgencyList(params, list => setAgencyData(list?.data)));
    }, [refresh]),
  );

  return (
    <>
      <View style={styles.container}>
        <View>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <Header
            title={'Top-UP Agency'}
            titleStyle={styles.title}
            containerStyle={styles.header}
            leftComponent={leftHeaderComponent}
            rightComponent={rightHeaderComponent}
          />
        </View>
        {!!agencyData.length && (
          <FlatList
            data={agencyData}
            renderItem={renderItem}
            keyExtractor={item => item?._id}
            style={styles.FlatList}
          />
        )}
        <View style={styles.footer}>
          <MyText>
            All dealers displayed here have been verified, you should get
            diamonds from any of them only. If you get diamonds from someone
            else and meet scammers, WE WILL NOT TAKE ANY RESPONSIBILITY.
          </MyText>
        </View>
      </View>
    </>
  );
};

export default AgencyList;
