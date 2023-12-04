import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

import { COLORS } from '../../../Utils/colors';
import { FONT_FAMILY } from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    paddingBottom: wp(10),
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    marginBottom:hp(3)
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.BLACK,
    fontWeight: '700'
  },
  innerContainer: {
    alignItems:'center',
    paddingHorizontal:wp(5),
  },
  buttonStyle:{
    borderRadius:10,
    backgroundColor:COLORS.BABY_PINK
  }
});
