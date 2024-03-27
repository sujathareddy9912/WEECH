import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {FONT_FAMILY} from '../../Utils/fontFamily';

function Busy({isVisible = false}) {
  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.constainer}>
        <Text style={styles.text}>Host will join soon</Text>
      </View>
    </Modal>
  );
}

export default Busy;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: 18,
    color: COLORS.WHITE,
  },
});
