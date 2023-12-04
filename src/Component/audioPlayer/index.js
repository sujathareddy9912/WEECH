import React, {useMemo} from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';

const AudioPlayer = props => {
  const {source} = props;

  const url = useMemo(() => {
    return source;
  }, [source]);

  const isPausedf = useMemo(()=>{

  },[paused])

  return (
    <View>
      {/* <Video
        source={url} // Can be a URL or a local file.
        volume={10}
        ref="audioElement"
        paused={this.state.paused} // Pauses playback entirely.
        resizeMode="cover" // Fill the whole screen at aspect ratio.
        repeat={true} // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)} // Callback when video loads
        onProgress={this.setTime.bind(this)} // Callback every ~250ms with currentTime
        onEnd={this.onEnd} // Callback when playback finishes
        onError={this.videoError} // Callback when video cannot be loaded
        style={styles.audioElement}
      /> */}
    </View>
  );
};
