import React from 'react';
import {StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {COLORS} from '../Utils/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';

export const MyVideo = props => {
  const {
    source,
    videoRef,
    onBuffer,
    onError,
    paused,
    style,
    width,
    height,
    resizeMode,
  } = props;

  const videoWidth = width ? width : SCREEN_WIDTH;
  const videoHeight = height ? height : SCREEN_HEIGHT;
  return (
    <Video
      {...props}
      paused={paused}
      source={source} // Can be a URL or a local file.
      ref={videoRef} // Store reference
      onBuffer={onBuffer} // Callback when remote video is buffering
      onError={onError} // Callback when video cannot be loaded
      resizeMode={resizeMode || 'contain'}
      controls={true}
      style={[
        styles['videoBackground'],
        {width: videoWidth, height: videoHeight},
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  videoBackground: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
});
