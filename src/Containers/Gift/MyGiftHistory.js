import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

import {styles} from './styles';
import Header from '../../Component/header/Header';
import {COLORS} from '../../Utils/colors';
import SendGiftHistory from './SendGiftHistory';
import ReceivedGiftHistory from './ReceivedGiftHistory';
import {MyText, Touchable} from '../../Component/commomComponent';

const MyGiftHistory = ({navigation}) => {
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
        title={String('Gift History')}
        leftComponent={leftHeaderComponent}
        containerStyle={styles.header}
        titleStyle={styles.title}
      />
      <Animatable.View
        animation="fadeIn"
        easing="ease"
        duration={3000}
        style={{flex: 1}}>
        <GiftHistoryTopTab />
      </Animatable.View>
    </View>
  );
};

export default MyGiftHistory;

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.toptabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <Touchable
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <MyText
              style={[
                styles.textStyle,
                isFocused ? styles.inFocusedTextStyle : null,
              ]}>
              {label}
            </MyText>
          </Touchable>
        );
      })}
    </View>
  );
}

const GiftHistoryTopTab = () => {
  return (
    <TopTab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <TopTab.Screen
        name="ReceivedGift"
        component={ReceivedGiftHistory}
        options={{
          title: 'Received Gift',
        }}
      />
      <TopTab.Screen
        name="SendGift"
        component={SendGiftHistory}
        options={{
          title: 'Send Gift',
        }}
      />
    </TopTab.Navigator>
  );
};
