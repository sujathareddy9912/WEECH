import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS} from '../../../Utils/colors';

/** 
 this @REQ_XP_ARR array is requireXp for next level. like if i have 5000xp then to achieve next level
    i need 10000xp. Corresponding index will be the weecha level. **/

const REQ_XP_ARR = [
  10000, 20000, 50000, 75000, 100000, 150000, 200000, 300000, 500000, 100000,
  200000, 400000, 800000, 1600000, 3200000, 3840000, 4608000, 5529600, 6635520,
  7962624, 9555149, 11466179, 13759414, 16511297, 19813557, 23776268, 28531521,
  34237826, 41085391, 49302469, 59162963, 70995555, 85194666, 102233600,
  122680320, 147216384, 176659660, 211991593, 254389911, 305267893, 366321472,
  439585766, 527502920, 633003503, 759604204, 911525045, 1093830054, 1312596065,
  1575115278, 1890138333,
];

export function weechaLevelCalculation(currentXp) {
  let currWeechaLevel = null,
    weechaProgressPercent = null,
    nextWeechaLevel = null,
    reqXp = null;
  for (let i = 0; i < REQ_XP_ARR.length; i++) {
    if (currentXp <= REQ_XP_ARR[i]) {
      weechaProgressPercent =
        ((currentXp - REQ_XP_ARR[i - 1]) * 100) /
        (REQ_XP_ARR[i] - REQ_XP_ARR[i - 1]);
      currWeechaLevel = i;
      nextWeechaLevel = i + 1;
      reqXp = REQ_XP_ARR[i] - currentXp;
      break;
    }
  }
  if (currentXp > REQ_XP_ARR[REQ_XP_ARR.length - 1]) {
    currWeechaLevel = 50;
    weechaProgressPercent = 100;
  }
  return {
    reqXp,
    currWeechaLevel,
    nextWeechaLevel,
    weechaProgressPercent,
  };
}

function getWeechaColor(currLevel, isHost) {
  switch (true) {
    case currLevel >= 1 && currLevel <= 9:
      return isHost ? '#F4C2C2' : '#ADD8E6';
    case currLevel > 9 && currLevel <= 19:
      return isHost ? '#e7548040' : '#00008b40';
    case currLevel > 19 && currLevel <= 29:
      return isHost ? '#e75480' : '#00008b';
    case currLevel > 29 && currLevel <= 39:
      return isHost ? '#ff69b4' : '#0000FF';
    case currLevel > 39 && currLevel <= 49:
      return isHost ? '#FF10F0' : '#0047ab';
    case currLevel > 49:
      return '#ffd700';
    default:
      return '#FFFFFF';
  }
}

const ProgressBar = ({totalXp, isHost}) => {
  return (
    <View style={styles.barCon}>
      <View
        style={[
          styles.bar,
          {
            width: `${
              weechaLevelCalculation(totalXp)?.weechaProgressPercent || 0
            }%`,
            backgroundColor: getWeechaColor(
              weechaLevelCalculation(totalXp)?.currWeechaLevel,
              isHost,
            ),
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  barCon: {
    width: '100%',
    height: hp(0.8),
    borderRadius: wp(5),
    backgroundColor: COLORS.WHITE + '40',
  },
  bar: {
    height: hp(0.8),
    borderRadius: wp(5),
  },
});
