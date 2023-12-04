import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../Utils/colors';
import {FONT_FAMILY} from '../Utils/fontFamily';
import {secondsToTime} from '../Utils/helper';
import {MyText} from './commomComponent';

const Timer = props => {
  const {timeInSeconds, over} = props;
  const [seconds, setSeconds] = useState(timeInSeconds || 60);
  const [done, setDone] = useState(false);
  const foo = useRef();

  useEffect(() => {
    function tick() {
      setSeconds(prevSeconds => prevSeconds - 1);
    }
    foo.current = setInterval(() => tick(), 1000);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(foo.current);
      setDone(true);
      over();
    }
  }, [seconds]);

  return (
    <MyText style={[styles.smallText, props.style]}>
      {secondsToTime(seconds)}
    </MyText>
  );
};

export default Timer;

const styles = StyleSheet.create({
  smallText: {
    fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
    color: COLORS.WHITE,
  },
});
