import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {WebView} from 'react-native-webview';

import Header from '../../../../Component/header/Header';
import {COLORS} from '../../../../Utils/colors';
import {MyText} from '../../../../Component/commomComponent';
import {FONT_FAMILY} from '../../../../Utils/fontFamily';

const WeeChaGuideLine = ({navigation}) => {
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

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('WeeCha Guidelines')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <View style={styles.mainContainer}>
        <WebView
          source={{uri: 'http://web.weecha.uk/guide_line_weecha.html'}}
          style={styles.webViewContent}
          scalesPageToFit={false}
        />
      </View>
    </>
  );
};

export default WeeChaGuideLine;

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
