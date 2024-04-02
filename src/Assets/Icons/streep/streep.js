import React from 'react';
import {Path, Svg} from 'react-native-svg';

const CrownStrip = ({color}) => {
  return (
    <Svg width="24" height="7" viewBox="0 0 28 7" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 7.00049L10 7.00049L28 7.00049L25 3.85049L28 0.000490189L18 0.000488281H0L3.5 3.85049L0 7.00049Z"
        fill={color}
      />
    </Svg>
  );
};

export default CrownStrip;
