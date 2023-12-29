import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Icon from '../../Component/Icons/Icon';
import GradientBackground from '../../Component/GardientBackground/GardientBackGround';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../Utils/colors';
import Profile from './profile';
import FavouriteImages from './favouriteImages';
import FavouriteVideos from './favouriteVideos';
import {useSelector, useDispatch} from 'react-redux';
import {isEdit as actionEdit} from '../../Actions/Profile/profile.actions';

const renderScene = SceneMap({
  profile: Profile,
  favouriteImages: FavouriteImages,
  favouriteVideos: FavouriteVideos,
});

const {width} = Dimensions.get('window');

function TabViewExample() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reducer = useSelector(state => state.profile);

  const {appgender, isDone, isEdit} = reducer;


  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'profile', title: 'Profile'},
    {key: 'favouriteImages', title: 'Images'},
    {key: 'favouriteVideos', title: 'Video'},
  ]);

  const onPressBack = () => {
    dispatch(actionEdit(false));
    navigation.goBack();
  };

  const _renderTabBar = props => {
    const {routes} = props.navigationState;
    return (
      <View style={styles.tabBar}>
        {routes.map((route, i) => {
          return (
            <TouchableOpacity
             disabled ={isEdit === false && appgender === 'female' ? true: false}
              style={[
                styles.tabItem,
                {
                  borderBottomColor:
                    index === i ? COLORS.VERIFIED_GREEN : 'transparent',
                  borderBottomWidth: 3,
                },
              ]}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={index === i ? styles.activeTitle : styles.inActiveTitle}>
                {route.title}
              </Animated.Text>

              {appgender === 'female' &&
                index !== i &&
                !isDone?.includes(route.key) && (
                  <View style={{position: 'absolute', right: 8, top: 16}}>
                    <Icon
                      origin="AntDesign"
                      name="exclamationcircle"
                      color={COLORS.RED_COLOR}
                      size={12}
                    />
                  </View>
                )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <GradientBackground>
      {isEdit && (
        <TouchableOpacity
          style={[styles.backBtn, {top: useSafeAreaInsets().top}]}
          onPress={onPressBack}>
          <Icon
            origin="AntDesign"
            name="arrowleft"
            size={24}
            color={COLORS.BLACK}
          />
        </TouchableOpacity>
      )}

       <Text style={styles.header}>PROFILE SETUP</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: width}}
        renderTabBar={_renderTabBar}
        swipeEnabled={isEdit === false && appgender === 'female' ? false : true}
      />
    </GradientBackground>
  );
}

export default TabViewExample;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.WHITE,
    alignSelf: 'center',
    marginBottom: 16,
  },
  backBtn: {
    position: 'absolute',
    left: width * 0.03,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  activeTitle: {
    fontSize: 18,
    color: COLORS.VERIFIED_GREEN,
  },
  inActiveTitle: {
    fontSize: 18,
    color: COLORS.MID_GREY,
  },
});
