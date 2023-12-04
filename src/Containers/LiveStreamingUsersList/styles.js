import {StyleSheet} from 'react-native';

import {COLORS} from '../../Utils/colors';
import {SCREEN_HEIGHT} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';
import {FONT_FAMILY, FONT_SIZE} from '../../Utils/fontFamily';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_COLOR_BLUE,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: dynamicSize(10),
    padding: dynamicSize(10),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: dynamicSize(10),
    padding: dynamicSize(10),
  },
  liveCount: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    marginLeft: dynamicSize(3),
    fontSize: FONT_SIZE.SEMI_MEDIUM,
  },
  textInput: {
    marginTop: SCREEN_HEIGHT * 0.01,
    marginBottom: SCREEN_HEIGHT * 0.02,
    marginHorizontal: dynamicSize(20),
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.LIGHT_GREY_OFFSET,
    paddingHorizontal: dynamicSize(10),
  },
  textInputStyle: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    fontSize: FONT_SIZE.SEMI_LARGE,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pic: {
    height: SCREEN_HEIGHT / 19,
    width: SCREEN_HEIGHT / 19,
    borderRadius: SCREEN_HEIGHT / 19 / 2,
  },
  userList: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: dynamicSize(20),
    alignSelf: 'center',
    paddingVertical: SCREEN_HEIGHT * 0.02,
  },
  seperator: {
    height: SCREEN_HEIGHT * 0.035,
  },
  itemRight: {
    flex: 1,
    height: SCREEN_HEIGHT / 19,
    justifyContent: 'space-between',
    paddingLeft: dynamicSize(10),
  },
  name: {
    fontFamily: FONT_FAMILY.SF_PRO_REGULAR,
    fontSize: FONT_SIZE.SEMI_MEDIUM,
  },
  subRightContainer: {
    flexDirection: 'row',
  },
  picContainer: {
    // justifyContent: 'center',
    borderWidth: 0.5,
    alignItems: 'center',
    width: dynamicSize(36),
    height: dynamicSize(36),
    paddingTop: dynamicSize(3),
    borderRadius: dynamicSize(20),
  },
});

export default styles;
