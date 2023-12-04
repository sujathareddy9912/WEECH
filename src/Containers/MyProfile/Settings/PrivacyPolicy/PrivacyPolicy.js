import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../../Utils/colors';
import Header from '../../../../Component/header/Header';
import {getPrivacyPolicy} from '../../../../Redux/Action';
import {MyText} from '../../../../Component/commomComponent';

const PrivacyPolicy = ({navigation}) => {
  const [userAgreement, setUserAgreement] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchUserAgreement = () => {
    setLoading(true);
    dispatch(
      getPrivacyPolicy(result => {
        setUserAgreement(result);
        setLoading(false);
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
      <MyText>Back</MyText>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchUserAgreement();
  }, []);
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('Privacy Policy')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <View style={styles.mainContainer}>
        {!loading ? (
          <ScrollView contentContainerStyle={styles.container}>
            <MyText style={styles.text}>{userAgreement}</MyText>
          </ScrollView>
        ) : (
          <ActivityIndicator size={'small'} color={COLORS.BABY_PINK} />
        )}
      </View>
    </>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: wp(8),
    paddingVertical: hp(3),
  },
  header: {
    backgroundColor: COLORS.LIGHT_PINK,
    paddingTop: hp(5),
    height: hp(12),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
    fontWeight: '700',
  },
  text: {},
});
