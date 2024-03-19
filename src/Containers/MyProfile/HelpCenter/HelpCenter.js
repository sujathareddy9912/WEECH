import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../Utils/colors';
import {styles} from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {WebView} from 'react-native-webview';
import Header from '../../../Component/header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FONT_FAMILY} from '../../../Utils/fontFamily';
import {IconButton, MyText} from '../../../Component/commomComponent';
import {List} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {getHelpCenter} from '../../../Redux/Action';

const DATA = [
  {
    id: 0,
    title: 'Account issues',
  },
  {
    id: 1,
    title: 'Live broadcast',
  },
  {
    id: 2,
    title: 'Ban complaints',
  },
  {
    id: 3,
    title: 'Recharge',
  },
  {
    id: 4,
    title: 'Other Questions',
  },
];

const HelpCenter = ({navigation}) => {
  const [helpData, setHelpData] = useState([]);
  const dispatch = useDispatch();

  const handleRedirection = id => {
    switch (id) {
      case 0:
        return navigation.navigate('AccountSecurity');
      case 2:
        return navigation.navigate('BlockList');
      default:
        break;
    }
  };

  const getItem = title => {
    switch (title) {
      case 'Account issues':
        return (
          <>
            <List.Accordion title={'1. How to avoid harassment ?'} />
            <List.Accordion
              title={'2. How to bind/change phone number/mail ?'}
            />
            <List.Accordion
              title={'3. How to improve my level?'}
              onPress={() => navigation.navigate('WeechaLevel')}
            />
          </>
        );
      default:
        break;
    }
  };

  const renderItem = ({item}) => {
    return (
      <List.Section>
        {item?.nextStep?.length > 0 ? (
          <List.Accordion title={item.title}>
            {item?.nextStep.map(ele => renderItem({item: ele}))}
          </List.Accordion>
        ) : (
          <List.Item
            title={item?.title}
            onPress={() => navigation.navigate('Description', item)}
          />
        )}
      </List.Section>
    );
  };

  const renderItemOld = ({item}) => {
    return (
      <List.Section>
        <List.Accordion title={item.title}>
          {getItem(item?.title)}
        </List.Accordion>
      </List.Section>
    );
  };

  const leftHeaderComponent = (
    <TouchableOpacity
      style={styles.backContainer}
      onPress={() => navigation?.goBack()}>
      <FontAwesome5Icon
        name={'chevron-left'}
        color={COLORS.BLACK}
        size={wp(4)}
        style={{
          marginRight: wp(1),
        }}
      />
      <Text>Back</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    dispatch(getHelpCenter(data => setHelpData(data?.data)));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('Help Center')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />

      {/* this is old which we are using */}
      {/* <FlatList
        data={helpData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      /> */}

      <View style={styles.mainContainer}>
        <WebView
          source={{uri: 'http://web.weecha.uk/help_center.html'}}
          style={styles.webViewContent}
          scalesPageToFit={false}
        />
      </View>
      <IconButton
        onPress={() => {
          navigation.navigate('CustomerCare');
        }}
        buttonStyle={styles.buttonStyle}
        width={wp(96)}
        label={'Online Customer Service'}
        labelStyle={{
          color: COLORS.WHITE,
          fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
        }}
        leftComponent={
          <AntDesign
            name={'customerservice'}
            color={COLORS.WHITE}
            size={wp(7)}
            style={{
              marginRight: wp(1),
            }}
          />
        }
      />
    </View>
  );
};

export default HelpCenter;
