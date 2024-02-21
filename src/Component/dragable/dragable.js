import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const SIZE = 120;

function Dragable({children}) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const width = useSharedValue(0);

  const onLayout = event => {
    width.value = event.nativeEvent.layout.width;
  };

  const pan = Gesture.Pan()
    .onChange(event => {
      offsetX.value += event.changeX;
      offsetY.value += event.changeY;
    })
    // .onFinalize(event => {
    // //   highlight-start
    // //   offsetX.value += event.translationX;
    // //   offsetY.value += event.translationY;
    // //   offsetX.value = withDecay({
    // //     velocity: event.velocityX,
    // //     rubberBandEffect: true,
    // //     clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
    // //   });
    // //   offsetY.value = withDecay({
    // //     velocity: event.velocityY,
    // //     rubberBandEffect: true,
    // //     clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
    // //   });
    // //   highlight-end
    // });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offsetX.value}, {translateY: offsetY.value}],
  }));

  return (
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[animatedStyles]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
  );
}

export default Dragable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
