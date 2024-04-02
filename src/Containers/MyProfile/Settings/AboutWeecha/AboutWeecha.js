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
import {WebView} from 'react-native-webview';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../../Utils/colors';
import {getAboutWeecha} from '../../../../Redux/Action';
import Header from '../../../../Component/header/Header';
import {MyText} from '../../../../Component/commomComponent';
import {FONT_FAMILY} from '../../../../Utils/fontFamily';

const AboutWeecha = ({navigation}) => {
  const [userAgreement, setUserAgreement] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchUserAgreement = () => {
    setLoading(true);
    dispatch(
      getAboutWeecha(result => {
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
        title={String('About Weecha')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <View style={styles.mainContainer}>
        {!loading ? (
          <WebView
            source={{uri: 'http://web.weecha.uk/about.html'}}
            style={styles.webViewContent}
            scalesPageToFit={false}
          />
        ) : (
          <ActivityIndicator size={'small'} color={COLORS.BABY_PINK} />
        )}
      </View>
    </>
  );
};

export default AboutWeecha;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
  },
  webViewContent: {
    flex: 1,
    padding: 10,
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
  text: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    lineHeight: 24,
  },
});
