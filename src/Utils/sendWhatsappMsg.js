import {Alert, Linking, Platform} from 'react-native';

export function sendWhatsappMsg(phoneWithCountryCode, msg) {
  let mobile =
    Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
  if (mobile) {
    if (msg) {
      let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
      Linking.openURL(url)
        .then(data => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          Alert.alert('Make sure WhatsApp installed on your device');
        });
    } else {
      Alert.alert('Please insert message to send');
    }
  } else {
    Alert.alert('Please insert mobile no');
  }
}
