import React, {FC} from 'react';
import {StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {COLORS} from '../../Utils/colors';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface GradientProps extends LinearGradientProps {
  style?: StyleProp<ViewStyle>;
  color?: (string | number)[];
  children?: React.ReactNode;
}

const GradientBackground: FC<GradientProps> = ({
  style,
  color,
  children,
  ...rest
}) => {
  return (
    <LinearGradient
      {...rest}
      colors={
        color
          ? color
          : [
              COLORS.GRADIENT_TOP_PINK,
              COLORS.GRADIENT_MID_PINK,
              COLORS.GRADIENT_BLUE,
            ]
      }
      style={[
        styles.conatiner,
        {
          paddingTop: useSafeAreaInsets().top,
          paddingBottom: useSafeAreaInsets().bottom,
        },
        style,
      ]}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});
