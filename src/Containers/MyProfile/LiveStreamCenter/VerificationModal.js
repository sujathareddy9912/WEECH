import {RNCamera} from 'react-native-camera';
import React, {useState, useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {View, StyleSheet, Dimensions, Text, SafeAreaView} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {containsFace} from './HelperFile';
import {COLORS} from '../../../Utils/colors';
import {Button} from '../../../Component/commomComponent';

const instructionsText = {
  initialPrompt: 'Position your face in the circle',
  performActions: 'Keep the device still and perform the following actions:',
  tooClose: "You're too close. Hold the device further.",
};

const detections = {
  BLINKRIGHTEYE: {instruction: 'Blink left eye', minProbability: 0.3},
  BLINKLEFTEYE: {instruction: 'Blink right eye', minProbability: 0.3},
  BLINK: {instruction: 'Blink both eyes', minProbability: 0.3},
  TURN_HEAD_LEFT: {instruction: 'Turn head left', maxAngle: -15},
  TURN_HEAD_RIGHT: {instruction: 'Turn head right', minAngle: 15},
  SMILE: {instruction: 'Smile', minProbability: 0.1},
  TURN_HEAD: {instruction: 'Turn head', minAngle: 15, maxAngle: -15},
};
const detectionsList = ['BLINK', 'SMILE', 'BLINKLEFTEYE', 'BLINKRIGHTEYE'];
const initialState = {
  faceDetected: 'no',
  faceTooBig: 'no',
  detectionsList,
  currentDetectionIndex: 0,
  progressFill: 0,
  processComplete: false,
};

const {width: windowWidth} = Dimensions.get('window');
const PREVIEW_SIZE = wp(97);
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

function moveArrayItemToNewIndex(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

const detectionReducer = (state, action) => {
  switch (action.type) {
    case 'FACE_DETECTED':
      if (action.payload === 'yes') {
        return {
          ...state,
          faceDetected: action.payload,
          progressFill: 100 / state.detectionsList.length - 1,
        };
      } else {
        return initialState;
      }
    case 'FACE_TOO_BIG':
      return {...state, faceTooBig: action.payload};
    case 'NEXT_DETECTION':
      const nextDetectionIndex = state.currentDetectionIndex + 1;

      const progressMultiplier = nextDetectionIndex + 2;

      const newProgressFill =
        (100 / state.detectionsList.length) * progressMultiplier;

      if (nextDetectionIndex === state.detectionsList.length - 2) {
        console.log(nextDetectionIndex, 'nextDetectionIndex');
        return {
          ...state,
          processComplete: true,
          progressFill: newProgressFill,
        };
      }

      return {
        ...state,
        currentDetectionIndex: nextDetectionIndex,
        progressFill: newProgressFill,
      };
    default:
      throw new Error('Unexpected action type.');
  }
};

const VerificationModal = ({callback, handleClose}) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(initialState);

  const cameraRef = useRef();

  useEffect(() => {
    moveArrayItemToNewIndex(
      state.detectionsList,
      Math.floor(Math.random() * state?.detectionsList?.length - 1),
      Math.floor(Math.random() * state?.detectionsList?.length - 1),
    );
  }, []);

  const onFacesDetected = result => {
    if (result.faces.length !== 1) {
      const newData = detectionReducer(state, {
        type: 'FACE_DETECTED',
        payload: 'no',
      });
      setState(newData);

      return;
    }

    const face = result.faces[0];

    const faceRect = {
      minX: face.bounds.origin.x,
      minY: face.bounds.origin.y,
      width: face.bounds.size.width,
      height: face.bounds.size.height,
    };

    const edgeOffset = 50;
    const faceRectSmaller = {
      width: faceRect.width - edgeOffset,
      height: faceRect.height - edgeOffset,
      minY: faceRect.minY + edgeOffset / 2,
      minX: faceRect.minX + edgeOffset / 2,
    };
    const previewContainsFace = containsFace({
      outside: PREVIEW_RECT,
      inside: faceRectSmaller,
    });
    if (!previewContainsFace) {
      const newData = detectionReducer(state, {
        type: 'FACE_DETECTED',
        payload: 'no',
      });
      setState(newData);
      return;
    }

    if (state.faceDetected === 'no') {
      const faceMaxSize = PREVIEW_SIZE - 90;
      if (faceRect.width >= faceMaxSize && faceRect.height >= faceMaxSize) {
        const newData = detectionReducer(state, {
          type: 'FACE_TOO_BIG',
          payload: 'yes',
        });
        setState(newData);
        return;
      }

      if (state.faceTooBig === 'yes') {
        const newData = detectionReducer(state, {
          type: 'FACE_TOO_BIG',
          payload: 'no',
        });
        setState(newData);
      }
    }

    if (state.faceDetected === 'no') {
      const newData = detectionReducer(state, {
        type: 'FACE_DETECTED',
        payload: 'yes',
      });
      setState(newData);
    }

    const detectionAction = state.detectionsList[state.currentDetectionIndex];

    switch (detectionAction) {
      case 'BLINK':
        const leftEyeClosed =
          face.leftEyeOpenProbability <= detections.BLINK.minProbability;
        const rightEyeClosed =
          face.rightEyeOpenProbability <= detections.BLINK.minProbability;
        if (leftEyeClosed && rightEyeClosed) {
          const newData = detectionReducer(state, {
            type: 'NEXT_DETECTION',
            payload: null,
          });
          setState(newData);
        }
        return;
      case 'BLINKLEFTEYE':
        const leftEyeClosedCon =
          face.leftEyeOpenProbability <= detections.BLINK.minProbability;
        const rEyeClosedCon =
          face.rightEyeOpenProbability <= detections.BLINK.minProbability;
        if (leftEyeClosed && rightEyeClosed) {
          // code statement
        } else if (leftEyeClosedCon && !rEyeClosedCon) {
          const newData = detectionReducer(state, {
            type: 'NEXT_DETECTION',
            payload: null,
          });
          setState(newData);
        }
        return;
      case 'BLINKRIGHTEYE':
        const lEyeClosedCon =
          face.leftEyeOpenProbability <= detections.BLINK.minProbability;
        const rightEyeClosedCon =
          face.rightEyeOpenProbability <= detections.BLINK.minProbability;
        if (leftEyeClosed && rightEyeClosed) {
          // code statement
        } else if (rightEyeClosedCon && !lEyeClosedCon) {
          const newData = detectionReducer(state, {
            type: 'NEXT_DETECTION',
            payload: null,
          });
          setState(newData);
        }
        return;
      case 'TURN_HEAD_LEFT':
        if (face.yawAngle <= detections.TURN_HEAD_LEFT.maxAngle) {
          const newData = detectionReducer(state, {
            type: 'NEXT_DETECTION',
            payload: null,
          });
          setState(newData);
        }
        return;
      case 'SMILE':
        if (face.smilingProbability >= detections.SMILE.minProbability) {
          const newData = detectionReducer(state, {
            type: 'NEXT_DETECTION',
            payload: null,
          });
          setState(newData);
        }
        return;
    }
  };

  const takePicture = async () => {
    if (cameraRef?.current && data.length < 1) {
      const options = {quality: 0.4, base64: true};
      try {
        const img = await cameraRef.current.takePictureAsync(options);
        setData([img]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (state.progressFill === 100) {
    takePicture();
  }

  useFocusEffect(
    React.useCallback(() => {
      setData([]);
    }, []),
  );

  useEffect(() => {
    if (data.length > 0) {
      callback(data);
    }
  }, [data]);

  return (
    <>
      <SafeAreaView style={styles.cameraContainer}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={<View style={styles.mask} />}>
          <RNCamera
            ref={cameraRef}
            captureAudio={false}
            style={StyleSheet.absoluteFill}
            type={'front'}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onFacesDetected={onFacesDetected}
            faceDetectionMode={'accurate'}
            onFaceDetectionError={({isOperational}) => {}}
            faceDetectorSettings={{minDetectionInterval: 125, tracking: true}}
            faceDetectionClassifications={'all'}>
            <AnimatedCircularProgress
              style={styles.circularProgress}
              size={PREVIEW_SIZE}
              width={5}
              backgroundWidth={7}
              fill={state.progressFill}
              tintColor={COLORS.BABY_PINK}
              backgroundColor={COLORS.LIGHT_GREY}
            />
          </RNCamera>
        </MaskedView>

        <Button
          buttonStyle={styles.closeButton}
          onPress={handleClose}
          label="X"
        />

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>
            {state.faceDetected === 'no' &&
              state.faceTooBig === 'no' &&
              instructionsText.initialPrompt}

            {state.faceTooBig === 'yes' && instructionsText.tooClose}

            {state.faceDetected === 'yes' &&
              state.faceTooBig === 'no' &&
              instructionsText.performActions}
          </Text>
          <Text style={styles.action}>
            {state.faceDetected === 'yes' &&
              state.faceTooBig === 'no' &&
              detections[state?.detectionsList[state?.currentDetectionIndex]]
                ?.instruction}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default VerificationModal;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  closeButton: {
    // position: 'absolute',
    top: hp(1),
    right: wp(0),
    height: hp(7),
    width: wp(15),
    backgroundColor: 'transparent',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mask: {
    borderRadius: PREVIEW_SIZE / 2,
    height: PREVIEW_SIZE,
    width: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    top: 25,
    position: 'absolute',
    color: COLORS.BLACK,
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    marginLeft: PREVIEW_RECT.minX,
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE,
  },
  action: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
});
