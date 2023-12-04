import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../../Utils/colors';
import {styles} from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../Component/header/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FONT_FAMILY} from '../../../../Utils/fontFamily';
import {IconButton, MyText} from '../../../../Component/commomComponent';
import {List} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {getHelpCenter} from '../../../../Redux/Action';

const Description = ({navigation, route: {params}}) => {
  const renderItem = ({item}) => {
    return (
      <List.Section>
        {item?.nextStep?.length > 0 ? (
          <List.Accordion title={item.title}>
            {item?.nextStep.map(ele => renderItem({item: ele}))}
          </List.Accordion>
        ) : (
          <List.Item title={item?.title} />
        )}
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Header
        title={String('Help Center')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <View style={styles.info}>
        <MyText style={styles.topicTitle}>{params?.title}</MyText>
        <MyText style={styles.topicDesc}>{params?.descriptions}</MyText>
      </View>
    </View>
  );
};

export default Description;
