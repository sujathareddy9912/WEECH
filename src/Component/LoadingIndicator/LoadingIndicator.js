import React, {useState, useEffect} from 'react';
import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingIndicator = ({
  cancelable = false,
  color = 'white',
  animation = 'none', // none,fade,slide
  overlayColor = 'rgba(0, 0, 0, 0.25)',
  size = 'large', // small or large
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey,
}) => {
  const [spinnerVisible, setSpinnerVisibility] = useState(visible);
  const close = () => {
    setSpinnerVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  useEffect(() => {
    setSpinnerVisibility(visible);
  }, [visible]);

  const _renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        {customIndicator || (
          <ActivityIndicator
            color={color}
            size={size}
            style={[styles.activityIndicator, {...indicatorStyle}]}
          />
        )}
        <View style={[styles.textContainer, {...indicatorStyle}]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  };

  const spinner = (
    <View
      style={[styles.container, {backgroundColor: overlayColor}]}
      key={spinnerKey || `spinner_${Date.now()}`}>
      {children || _renderDefaultContent()}
    </View>
  );

  return (
    <Modal
      animationType={animation}
      onRequestClose={() => {
        _handleOnRequestClose();
      }}
      supportedOrientations={['landscape', 'portrait']}
      transparent
      visible={spinnerVisible}
      statusBarTranslucent={true}>
      {spinner}
    </Modal>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: 'transparent',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContent: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    top: 80,
  },
});
