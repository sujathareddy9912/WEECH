import React from 'react';
import {StyleSheet, View} from 'react-native';
// import Slider from '@react-native-community/slider';

const SeekBar = props => {
  const {trackLength, currentPosition, onSeek, onSlidingStart} = props;

  function pad(n, width, z = 0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  const minutesAndSeconds = position => [
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
  ];

  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);

  return <View />;

  // return (
  //   <Slider
  //     maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
  //     onSlidingStart={onSlidingStart}
  //     onSlidingComplete={onSeek}
  //     value={currentPosition}
  //     minimumTrackTintColor="#fff"
  //     maximumTrackTintColor="rgba(255, 255, 255, 0.14)"
  //     thumbStyle={styles.thumb}
  //     trackStyle={styles.track}
  //   />
  // );
};

export default SeekBar;

const styles = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
