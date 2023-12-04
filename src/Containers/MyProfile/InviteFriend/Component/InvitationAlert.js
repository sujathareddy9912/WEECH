import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, StyleSheet, Modal, Alert} from 'react-native';

import {COLORS} from '../../../../Utils/colors';
import {MyText, Touchable} from '../../../../Component/commomComponent';
import {FONT_FAMILY} from '../../../../Utils/fontFamily';

const InvitationAlert = ({item = '', show, handleClick, onRequestClose}) => {
  return (
    // <View style={styles.centeredView}>
    <Modal
      visible={show}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onRequestClose || {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <MyText style={styles.heading}>Weecha Wants to open</MyText>
            <MyText style={[styles.heading, {color: COLORS.PRIMARY_BLUE}]}>
              {item}
            </MyText>
          </View>
          <Touchable
            style={styles.content}
            activeOpacity={0.6}
            onPress={handleClick}>
            <MyText style={styles.btnText}>Open App</MyText>
          </Touchable>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: COLORS.ALERT_BG,
    borderRadius: wp(2),
    width: wp(90),
    height: hp(22),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  btnText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
  content: {
    width: wp(90),
    height: hp(7),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BABY_PINK,
  },
});

export default InvitationAlert;
