import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {SCREEN_HEIGHT} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';

const styles = StyleSheet.create({
  renderLiveUserContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingTop: dynamicSize(10),
    paddingVertical: dynamicSize(10),
    paddingHorizontal: dynamicSize(5),
  },

  coverPicLiveUser: {
    borderRadius: 5,
    width: dynamicSize(80),
    height: dynamicSize(80),
  },

  liveUserName: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '500',
  },

  flexDirection: {
    flexDirection: 'row',
  },

  ageContainer: {
    marginLeft: 10,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 14,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: dynamicSize(40),
  },

  momentContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingTop: dynamicSize(10),
    justifyContent: 'space-between',
    paddingVertical: dynamicSize(10),
    paddingHorizontal: dynamicSize(5),
  },

  momentPic: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subjectName: {
    fontSize: 10,
    lineHeight: 12,
    color: '#A59393',
    fontWeight: '600',
    paddingVertical: dynamicSize(2),
  },

  date: {
    fontSize: 8,
    lineHeight: 12,
    color: '#A59393',
    fontWeight: '500',
  },

  postImage: {
    borderRadius: 5,
    width: dynamicSize(50),
    height: dynamicSize(50),
  },

  safeAreaContainer: {
    flex: 1,
    marginBottom: dynamicSize(100),
    backgroundColor: 'transparent',
  },

  modalContainer: {
    marginTop: -wp(25),
    width: '60%',
    height: '90%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderTopLeftRadius: dynamicSize(30),
    borderBottomLeftRadius: dynamicSize(30),
  },

  mainContainer: {
    width: '100%',
    height: '100%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderTopLeftRadius: dynamicSize(30),
    borderBottomLeftRadius: dynamicSize(30),
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: dynamicSize(25),
    paddingBottom: dynamicSize(20),
  },

  headingStyle: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
  },

  notificationContainer: {
    padding: 8,
    marginRight: SCREEN_HEIGHT * 0.02,
  },

  subHeaderContainer: {
    borderWidth: 2,
    borderRadius: 30,
    marginHorizontal: 5,
    flexDirection: 'row',
    borderColor: COLORS.DARK_RED,
    justifyContent: 'space-between',
  },

  notificationType: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dynamicSize(16),
  },

  liveTypeText: {
    padding: 4,
    maxWidth: '30%',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
  },
});

export default styles;
