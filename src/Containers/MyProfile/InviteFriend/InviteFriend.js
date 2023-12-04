import React, {useState} from 'react';
import {View, StatusBar, Alert} from 'react-native';

import {styles} from './styles';
import Header from '../../../Component/header/Header';
import FB from '../../../Assets/Icons/SocialIcons/FB.svg';
import InvitationAlert from './Component/InvitationAlert';
import Insta from '../../../Assets/Icons/SocialIcons/Insta.svg';
import Weecha from '../../../Assets/Icons/SocialIcons/Weecha.svg';
import BackArrowIcon from '../../../Assets/Icons/WhiteBackIcon.svg';
import {MyText, Touchable} from '../../../Component/commomComponent';
import Whatsapp from '../../../Assets/Icons/SocialIcons/Whatsapp.svg';
import Telegram from '../../../Assets/Icons/SocialIcons/Telegram.svg';
import FbMessanger from '../../../Assets/Icons/SocialIcons/fbMessanger.svg';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const SOCIAL_APP = [
  'Facebook',
  'Instagram',
  'Messenger',
  'Whatsapp',
  'Weecha Friends',
  'Telegram',
];

const InviteFriend = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const LeftComponent = () => (
    <Touchable onPress={() => navigation.goBack()}>
      <BackArrowIcon />
    </Touchable>
  );

  const getComponent = item => {
    switch (item) {
      case 'Facebook':
        return <FB />;
      case 'Instagram':
        return <Insta />;
      case 'Messenger':
        return <FbMessanger />;
      case 'Whatsapp':
        return <Whatsapp />;
      case 'Weecha Friends':
        return <Weecha />;
      case 'Telegram':
        return <Telegram />;

      default:
        return null;
    }
  };

  const handleRedirect = item => {
    setSelectedItem(item);
    setShow(true);
    switch (item) {
      case 'Facebook':
        return console.log(item);
      case 'Instagram':
        return console.log(item);
      case 'Messenger':
        return console.log(item);
      case 'Whatsapp':
        return console.log(item);
      case 'Weecha Friends':
        return console.log(item);
      case 'Telegram':
        return console.log(item);
      default:
        return console.log(item);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('Invite Friend').toUpperCase()}
        leftComponent={<LeftComponent />}
        containerStyle={styles.header}
      />
      <MyText style={styles.heading}>Share it Using</MyText>
      <View style={styles.iconCon}>
        {SOCIAL_APP.map(item => (
          <Touchable style={styles.btn} onPress={() => handleRedirect(item)}>
            {getComponent(item)}
            <MyText style={styles.appName}>{item}</MyText>
          </Touchable>
        ))}
      </View>
      <InvitationAlert
        show={show}
        item={selectedItem}
        handleClick={() => {
          setShow(false);
        }}
      />
    </View>
  );
};

export default InviteFriend;
