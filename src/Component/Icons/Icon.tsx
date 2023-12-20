import React, {FC} from 'react';
import {ColorValue, StyleProp, TextStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


interface IconProps {
  origin:
    | 'AntDesign'
    | 'Entypo'
    | 'MaterialIcons'
    | 'FontAwesome5'
    | 'FontAwesome5Pro'
    | 'FontAwesome6'
    | 'FontAwesome6Pro'
    | 'Feather'
    | 'EvilIcons'
    | 'FontAwesome'
    | 'Octicons'
    | 'MaterialCommunityIcons'
    | 'Ionicons';
  name: string;
  color?: ColorValue;
  size?: number;
  style?: StyleProp<TextStyle>;
}

const Icon: FC<IconProps> = ({origin, name, color, size, style}) => {
  let colorx = color || '#aaaaaa';
  let sizex = size || 24;
  let namex = name || 'right';

  let Element = Ionicons;

  switch (origin) {
    case 'AntDesign':
      Element = AntDesign;
      break;

    case 'Entypo':
      Element = Entypo;
      break;

    case 'MaterialIcons':
      Element = MaterialIcons;
      break;

    case 'FontAwesome5':
      Element = FontAwesome5;
      break;

    case 'Feather':
      Element = Feather;
      break;

    case 'EvilIcons':
      Element = EvilIcons;
      break;

    case 'FontAwesome':
      Element = FontAwesome;
      break;

    case 'FontAwesome5Pro':
      Element = FontAwesome5Pro;
      break;

    case 'Octicons':
      Element = Octicons;
      break;
    case 'MaterialCommunityIcons':
      Element = MaterialCommunityIcons;
      break;

    default:
      Element = Ionicons;
      break;
  }

  return <Element name={namex} size={sizex} color={colorx} style={[style]} />;
};

export default Icon;
