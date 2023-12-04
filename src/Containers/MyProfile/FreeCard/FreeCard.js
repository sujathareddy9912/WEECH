import {
  Text,
  View,
  FlatList,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import Share from 'react-native-share';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  claimFreeCardAction,
  getFreeCardListAction,
} from '../../../Redux/Action';
import {styles} from './styles';
import {
  Button,
  MyText,
  Touchable,
  GradientBackground,
} from '../../../Component/commomComponent';
import {COLORS} from '../../../Utils/colors';
import Header from '../../../Component/header/Header';
import icons, {SvgIcon} from '../../../Component/icons.js';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../Utils/helper';
import {HelperService} from '../../../Services/Utils/HelperService';

const sheetCustomStyles = {
  wrapper: {
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
  },
};

const shareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://facebook.com',
};

const FreeCard = ({navigation}) => {
  const dispatch = useDispatch();
  const USER = useSelector(state => state.authReducer?.userLoginList?.user);
  const [freeCards, setFreeCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [shared, setShared] = useState({fb: false, ig: false});

  const refRBSheet = useRef();

  useEffect(() => {
    getFreeCardList();
  }, []);

  const getFreeCardList = () => {
    const params = {userId: USER?._id};
    dispatch(
      getFreeCardListAction(params, result => {
        setFreeCards(result?.data);
      }),
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

  const renderItem = ({item}) => {
    let selected = selectedCard?._id == item?._id;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCard(item);
        }}
        style={[
          {
            alignItems: 'center',
            marginTop: hp(2),
          },
          selected && {
            backgroundColor: 'rgba(94, 148, 255,0.4)',
            paddingVertical: hp(1),
          },
        ]}>
        <ImageBackground
          source={icons.freeCard}
          style={[
            {
              width: wp(90),
              height: hp(20),
              justifyContent: 'center',
            },
            selected && {
              // backgroundColor: 'rgba(94, 148, 255,0.4)',
              shadowOffset: {
                height: 1,
                width: 1,
              },
              shadowColor: COLORS.BLACK,
              elevation: 4,
            },
          ]}>
          {item?.calls == item?.callsUsed && (
            <View style={styles.claimBadge}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 25,
                  },
                ]}>
                *Claimed
              </Text>
            </View>
          )}
          <View
            style={{
              position: 'absolute',
              left: wp(10),
              alignItems: 'center',
            }}>
            <Text style={styles.text}>{`${item?.seconds} Sec`}</Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 25,
                },
              ]}>{`${item?.calls - item?.callsUsed} Calls`}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const shareLinkWithShareDialog = key => {
    Share.share({
      message: 'https://weecha.page.link/1gGs',
    })
      //after successful share return result
      .then(result => {
        setShared(prevState => {
          return {
            ...prevState,
            [key]: true,
          };
        });
      })
      //If any thing goes wrong it comes here
      .catch(errorMsg => HelperService.showToast(errorMsg));
  };

  const onSubmit = () => refRBSheet.current.open();

  useEffect(() => {
    if (shared.fb && shared.ig) {
      refRBSheet.current.close();
      let data = {
        userId: USER?._id,
        cardId: selectedCard?._id,
        calls: selectedCard?.calls,
        seconds: selectedCard?.seconds,
      };
      dispatch(
        claimFreeCardAction(data, result => {
          setSelectedCard(null);
          getFreeCardList();
        }),
      );
    }
  }, [shared.fb, shared.ig]);

  return (
    <GradientBackground style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={styles.flex1}>
        <Header
          title={String('Free Cards')}
          leftComponent={leftHeaderComponent}
          containerStyle={styles.header}
          titleStyle={styles.title}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={freeCards}
          renderItem={renderItem}
          style={styles.FlatList}
          contentContainerStyle={styles.flatListCon}
        />
      </View>
      {!!selectedCard && (
        <Button
          onPress={onSubmit}
          buttonStyle={styles.buttonStyle}
          width={wp(90)}
          label={'Claim'}
          labelStyle={{
            color: COLORS.WHITE,
          }}
        />
      )}
      <RBSheet
        ref={refRBSheet}
        openDuration={250}
        height={SCREEN_HEIGHT * 0.4}
        customStyles={sheetCustomStyles}>
        <View style={styles.exitModal}>
          <MyText style={styles.exitText}>
            You want claim free cards you need to share
          </MyText>
          <MyText style={styles.exitTextDesc}>
            the app at 2 Social media platforms.
          </MyText>
          <MyText style={styles.share}>Share</MyText>
          <View style={styles.socialCon}>
            <Touchable
              style={styles.btn}
              onPress={() => {
                shareLinkWithShareDialog('fb');
              }}>
              <SvgIcon.fbCircle />
              {shared.fb && <MyText style={styles.shared}>Shared</MyText>}
            </Touchable>
            <Touchable
              style={styles.btn}
              onPress={() => {
                shareLinkWithShareDialog('ig');
              }}>
              <SvgIcon.igCircle />
              {shared.ig && <MyText style={styles.shared}>Shared</MyText>}
            </Touchable>
          </View>
        </View>
      </RBSheet>
    </GradientBackground>
  );
};

export default FreeCard;
