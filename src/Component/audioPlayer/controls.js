import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import {SCREEN_WIDTH} from '../../Utils/helper';
import {TouchableIcon} from '../commomComponent';
import icons from '../icons';

const Controls = props => {
  const {paused} = props;

  const isPaused = useMemo(() => {
    return paused;
  }, [paused]);

  return (
    <TouchableIcon
      source={isPaused ? icons.pauseIcon : icons.playIcon}
      styles={styles.buttonContainer}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.PINK,
    width: SCREEN_WIDTH / 10,
    height: SCREEN_WIDTH / 10,
    borderRadius: SCREEN_WIDTH / 10 / 2,
  },
});

export default Controls;
