import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, StyleSheet, View} from 'react-native';

import {SvgIcon} from './icons';
import {COLORS} from '../Utils/colors';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';
import {sendGiftAction} from '../Redux/Action';
import {IMAGE_URL} from '../Services/Api/Common';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';
import {HelperService} from '../Services/Utils/HelperService';

import {MyText, Touchable, MyImage, MyIndicator} from './commomComponent';

const GiftComponent = props => {
  const {
    roomID,
    senderId,
    receiverId,
    onSendClick,
    topTitleList,
    mainContainer,
    diamondCount,
    fetchingGifts,
    onSendSuccess,
  } = props;

  const dispatch = useDispatch();

  const [selectedGiftType, updateSelectedGiftType] = useState(0);
  const [diamondPoints, setDiamondPoints] = useState(diamondCount);
  const [topCategoryList, setTopCategoryList] = useState(topTitleList || []);

  const [newSelectedGift, setNewSelectedGift] = useState();
  const [selectedGiftQuantity, setSelectedGiftQuantity] = useState(1);
  const giftQuantity = [
    {
      quantity: 1,
    },
    {
      quantity: 15,
    },
    {
      quantity: 30,
    },
    {
      quantity: 60,
    },
  ];

  useEffect(() => {
    if (topTitleList) setTopCategoryList(topTitleList);
  }, [topTitleList]);

  useEffect(() => {
    setNewSelectedGift({
      ...topCategoryList?.[selectedGiftType]?.gifts[0],
      count: selectedGiftQuantity,
    });
  }, []);

  const _renderTopList = ({item, index}) => {
    return (
      <Touchable
        onPress={() => updateSelectedGiftType(index)}
        style={styles.topItem}>
        <MyText style={styles.topText}>{item.name}</MyText>
      </Touchable>
    );
  };

  const _renderHeaderSeperator = () => <View style={styles.topSeperator} />;

  const _renderGiftSeperator = () => <View style={styles.giftSeperator} />;

  const newSendGiftAction = async () => {
    let totalPrice = newSelectedGift?.price * newSelectedGift?.count;
    let totalCount = newSelectedGift?.count;

    const gifts = {
      giftId: newSelectedGift?._id ? newSelectedGift?._id : null,
      quantity: newSelectedGift?.count ? newSelectedGift?.count : null,
    };

    const giftData = {
      giftImage: newSelectedGift?.icon ? newSelectedGift?.icon : null,
      giftName: newSelectedGift?.name ? newSelectedGift?.name : null,
    };

    if (!gifts?.quantity) {
      HelperService.showToast(strings('gift.pleaseSelectGift'));
      return;
    }
    if (totalPrice <= diamondPoints) {
      const param = {
        senderId,
        totalPrice,
        giftId: [gifts],
        receiverId: [{userId: receiverId}],
        roomId: roomID,
      };
      dispatch(
        sendGiftAction(param, resp => {
          onSendSuccess({param, totalCount, giftData});
          onSendClick();
        }),
      );
      setDiamondPoints(diamondPoints - totalPrice);
    } else HelperService.showToast(strings('gift.giftSendError'));
  };

  const newSelectedGiftFunction = item => {
    setNewSelectedGift({...item, count: selectedGiftQuantity});
  };

  const _renderGiftList = ({item, index}) => {
    return (
      <Touchable
        style={[
          styles.giftItemsContainer,
          newSelectedGift?._id === item?._id ? styles.selectedGiftView : null,
        ]}
        onPress={() => newSelectedGiftFunction(item)}>
        <View style={{alignItems: 'center'}}>
          <MyImage
            fast
            source={{uri: `${IMAGE_URL}${item.icon}`}}
            style={styles.giftIcon}
          />
          <MyText style={styles.giftTitle}>
            {item?.name} {}
          </MyText>
          <View style={styles.diamondContainerSmall}>
            <SvgIcon.SmallDiamond />
            <MyText style={styles.diamondCount}>
              {item?.price}{' '}
              {selectedGiftQuantity > 1 ? '*' + selectedGiftQuantity : null}
            </MyText>
          </View>
        </View>
      </Touchable>
    );
  };

  const selectGiftQuantity = e => {
    setSelectedGiftQuantity(e);
    setNewSelectedGift({...newSelectedGift, count: e});
  };

  return (
    <View style={[styles.giftContainer, mainContainer]}>
      <View>
        <FlatList
          key="horizontalList"
          data={topCategoryList}
          renderItem={_renderTopList}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={_renderHeaderSeperator}
          contentContainerStyle={styles.topContentContainerStyle}
        />
      </View>
      {!topCategoryList?.[selectedGiftType]?.gifts ? (
        <View style={styles.giftTitleRenderingContainer}>
          {fetchingGifts ? <MyIndicator color={COLORS.BABY_PINK} /> : null}
        </View>
      ) : (
        <FlatList
          key="horizontalList"
          data={topCategoryList?.[selectedGiftType]?.gifts || []}
          numColumns={4}
          renderItem={_renderGiftList}
          ItemSeparatorComponent={_renderGiftSeperator}
        />
      )}

      <View style={styles.bottomSendGiftContainer}>
        <View style={styles.diamondContainer}>
          <SvgIcon.SmallDiamond />
          <MyText style={styles.diamondText}>{diamondPoints}</MyText>
        </View>
        <View style={styles.giftShareAndQuantityContainer}>
          <View style={styles.giftQuantityContainer}>
            {giftQuantity.map((e, key) => (
              <Touchable
                onPress={() => selectGiftQuantity(e?.quantity)}
                key={key}
                style={[
                  e?.quantity === selectedGiftQuantity
                    ? styles.selectedQuantityView
                    : null,
                ]}>
                <MyText
                  style={[
                    styles.giftNumberText,
                    e?.quantity === selectedGiftQuantity
                      ? styles.selectedGiftQuantityNumber
                      : null,
                  ]}>
                  {e?.quantity}
                </MyText>
              </Touchable>
            ))}
          </View>
          <Touchable onPress={() => newSendGiftAction()}>
            <SvgIcon.GiftIcon />
          </Touchable>
        </View>
      </View>
    </View>
  );
};

export default GiftComponent;

const styles = StyleSheet.create({
  giftContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.BLACK,
    width: SCREEN_WIDTH - dynamicSize(20),
    borderRadius: dynamicSize(5),
    padding: dynamicSize(10),
    height: SCREEN_HEIGHT / 2.8,
  },
  diamondText: {
    marginLeft: dynamicSize(10),
    color: COLORS.BABY_PINK,
    fontWeight: 'bold',
  },
  topItem: {
    backgroundColor: COLORS.LIGHT_BABY_PINK,
    borderRadius: dynamicSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dynamicSize(5),
    paddingHorizontal: dynamicSize(10),
  },
  topText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: FONT_SIZE.SMALL,
    textTransform: 'capitalize',
  },
  topSeperator: {
    width: 10,
  },
  topContentContainerStyle: {
    paddingVertical: dynamicSize(10),
  },
  giftItemsContainer: {
    width: SCREEN_WIDTH / 5,
    alignItems: 'center',
    marginHorizontal: dynamicSize(5),
    padding: 5,
  },
  giftSeperator: {
    height: dynamicSize(10),
  },
  diamondContainerSmall: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  giftTitleRenderingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftTitle: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontSize: FONT_SIZE.SMALL,
    textAlign: 'center',
    marginTop: dynamicSize(5),
  },
  diamondCount: {
    marginLeft: dynamicSize(5),
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.WHITE,
  },
  giftIcon: {
    width: SCREEN_HEIGHT * 0.04,
    height: SCREEN_HEIGHT * 0.04,
  },
  giftNumberText: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    paddingHorizontal: dynamicSize(5),
    marginHorizontal: dynamicSize(5),
  },
  selectedGiftView: {
    borderColor: COLORS.BABY_PINK,
    borderWidth: 1,
    borderRadius: 10,
  },
  selectedQuantityView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.BABY_PINK,
    color: COLORS.BABY_PINK,
  },
  selectedGiftQuantityNumber: {
    color: COLORS.BABY_PINK,
  },
  bottomSendGiftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: dynamicSize(10),
    justifyContent: 'space-between',
  },
  diamondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  giftShareAndQuantityContainer: {
    backgroundColor: COLORS.LIGHT_GREY_OFFSET,
    flexDirection: 'row',
    borderRadius: 20,
  },
  giftQuantityContainer: {
    flexDirection: 'row',
    padding: dynamicSize(5),
    alignItems: 'center',
  },
});
