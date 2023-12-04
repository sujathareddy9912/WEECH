import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SendIcon from '../../Assets/Icons/Send.svg';
import AddIcon from '../../Assets/Icons/Add.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Message from './Message';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
// const messages = [
//     {id: 1, type: 'sent', body: {text: 'Hi', image: require('../../Assets/Images/photo.png'), video: '', file: ''}, createdAt: '2021-07-10T04:50:00.000Z', read: 'true'},
//     {id: 2, type: 'received', body: {text: 'Hi', image: '', video: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4', file: ''}, createdAt: '2021-07-10T04:50:00.000Z'},
//     {id: 3, type: 'received', body: {text: 'Hi', image: '', video: '', file: ''}, createdAt: '2021-07-10T04:50:00.000Z' } ,
//     {id: 4, type: 'sent', body: {text: 'Hello, this is me', image: '', video: '', file: ''}, createdAt: '2021-07-10T04:50:00.000Z' },
//     {id: 5, type: 'received', body: {text: 'Hi', image: '', video: '', file: ''}, createdAt: '2021-07-10T04:50:00.000Z' } ,
//     {id: 6, type: 'sent', body: {text: 'Hello, this is me', image: '', video: '', file: ''}, createdAt: '2021-07-10T04:50:00.000Z' }
// ]
const Chat = props => {
  const userId = '12';
  const otherId = '34';
  const docId =
    userId < otherId ? userId + '-' + otherId : otherId + '-' + userId;
  const [messages, setMessages] = React.useState([]);
  const [read, setRead] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const mref = React.useMemo(
    () => firestore().collection('chatrooms').doc(docId).collection('messages'),
    [],
  );

  useEffect(() => {
    // since query and getContent are only used by this effect, we should
    // define them inside the effect so we don't have to worry about
    // adding them to the dependency array

    const query = mref.orderBy('createdAt', 'desc');

    const getContent = async () => {
      let messagesAll = [];

      await query.get().then(docs => {
        docs.forEach(doc => {
          if (doc.data().sentBy == otherId) {
            mref
              .doc(doc.ref._documentPath._parts[3])
              .update({...doc.data(), read: true});
          }
          messagesAll.push({
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          });
        });
      });

      setMessages(messagesAll);
    };

    const unsubscribe = query.onSnapshot(snapshot => {
      if (snapshot.metadata.hasPendingWrites) {
        // Local changes have not yet been written to the backend
      } else {
        // Changes have been written to the backend
        getContent();
      }
    });
    return () => unsubscribe();
  }, [mref]);

  const sendMessage = msg => {
    if (msg.trim().length != 0) {
      const myMsg = {
        sentBy: userId,
        sentTo: otherId,
        body: {text: msg, image: '', video: '', file: ''},
        createdAt: new Date(),
        read: false,
      };
      const docId =
        userId < otherId ? userId + '-' + otherId : otherId + '-' + userId;
      firestore()
        .collection('chatrooms')
        .doc(docId)
        .collection('messages')
        .add({...myMsg, createdAt: firestore.FieldValue.serverTimestamp()});
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          height: 70,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            marginLeft: 5,
            marginTop: 20,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={'chevron-left'} size={18} color={'#000'} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 5,
            marginTop: 20,
            fontSize: 18,
            fontFamily: 'Mulish-Regular',
          }}>
          Athalia Putri
        </Text>
      </View>
      <KeyboardAwareScrollView
        // style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={false}
        contentContainerStyle={{height: hp('100%') - 70, flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'white'} />
        <FlatList
          data={messages}
          style={{}}
          inverted
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <Message
                messages={messages}
                index={index}
                userId={userId}
                item={item}
              />
            );
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            height: 62,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: '50%',
              justifyContent: 'center',
              flex: 0.2,
              alignItems: 'center',
            }}>
            <AddIcon />
          </TouchableOpacity>
          <TextInput
            value={msg}
            returnKeyType="send"
            onSubmitEditing={() => {
              sendMessage(msg);
              setMsg('');
            }}
            allowFontScaling={false}
            onChangeText={text => setMsg(text)}
            style={{
              paddingVertical: 5,
              backgroundColor: 'rgba(247, 247, 252, 1)',
              flex: 1,
              fontSize: 14,
              fontFamily: 'Mulish-Regular',
              paddingHorizontal: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              sendMessage(msg);
              setMsg('');
            }}
            style={{
              height: '50%',
              justifyContent: 'center',
              flex: 0.2,
              alignItems: 'center',
            }}>
            <SendIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Chat;
