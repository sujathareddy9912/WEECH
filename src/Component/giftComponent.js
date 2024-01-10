import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, StyleSheet, View} from 'react-native';

import Input from './Input';
import {SvgIcon} from './icons';
import {COLORS} from '../Utils/colors';
import {strings} from '../localization/config';
import {dynamicSize} from '../Utils/responsive';
import {sendGiftAction} from '../Redux/Action';
import {IMAGE_URL} from '../Services/Api/Common';
import {FONT_FAMILY, FONT_SIZE} from '../Utils/fontFamily';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/helper';
import {HelperService} from '../Services/Utils/HelperService';

import {
  MyText,
  Touchable,
  Counter,
  Button,
  MyImage,
  MyIndicator,
  KeyboardAwareScroll,
} from './commomComponent';

const GiftComponent = props => {
  const {
    roomID,
    onBlur,
    onFocus,
    onSearch,
    senderId,
    receiverId,
    onSendClick,
    placeholder,
    topTitleList,
    mainContainer,
    diamondCount,
    fetchingGifts,
    onSendSuccess,
  } = props;

  const dispatch = useDispatch();

  const [refreshData, setRefreshData] = useState(false);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [sendingGift, setSendingGift] = useState(false);
  const [selectedGiftType, updateSelectedGiftType] = useState(0);
  const [diamondPoints, setDiamondPoints] = useState(diamondCount);
  const [topCategoryList, setTopCategoryList] = useState(topTitleList || []);

  useEffect(() => {
    if (topTitleList) setTopCategoryList(topTitleList);
  }, [topTitleList]);

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

  const _alignItems = index => {
    if (index % 3 == 0) return 'flex-start';
    else if (index % 3 == 2) return 'flex-end';
    else return 'center';
  };

  const onDecrement = (item, index) => () => {
    if (!item?.count) {
      topCategoryList[selectedGiftType].gifts[index].count = 0;
    } else if (item?.count == 0) {
      topCategoryList[selectedGiftType].gifts[index].count = 0;
    } else {
      topCategoryList[selectedGiftType].gifts[index].count = item.count - 1;
    }
    const indexFound = selectedGifts.findIndex(find => {
      if (item._id == find._id) return find;
    });
    if (indexFound < 0) {
      selectedGifts.push({...item, count: !item?.count ? 0 : item.count});
    } else {
      updateCountAndRemoveIfZero(selectedGifts, item);
    }
    setRefreshData(!refreshData);
  };

  function updateCountAndRemoveIfZero(array, updatedObject) {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === updatedObject._id) {
        // Decrease count by 1
        array[i].count--;

        // Remove the object if count is 0
        if (array[i].count === 0) {
          array.splice(i, 1);
        }

        break; // exit loop once the object is found and updated
      }
    }
  }

  const onIncrement = (item, index) => () => {
    if (!item?.count) {
      topCategoryList[selectedGiftType].gifts[index].count = 1;
    } else {
      topCategoryList[selectedGiftType].gifts[index].count = item.count + 1;
    }
    const indexFound = selectedGifts.findIndex(find => {
      if (item._id == find._id) return find;
    });
    if (indexFound < 0) {
      selectedGifts.push({...item, count: !item?.count ? 1 : item.count});
    } else {
      selectedGifts[indexFound].count = item.count;
    }
    setRefreshData(!refreshData);
  };

  const onSendPress = () => {
    let totalPrice = 0;
    let totalCount = 0;
    const gifts = selectedGifts.map(item => {
      totalPrice = totalPrice + item.price * item.count;
      totalCount = item.count > 0 ? totalCount + 1 : totalCount;
      return {giftId: item._id, quantity: item.count};
    });
    if (!gifts.length) {
      HelperService.showToast(strings('gift.pleaseSelectGift'));
      return;
    }
    if (totalPrice <= diamondPoints) {
      setSendingGift(true);
      const param = {
        senderId,
        totalPrice,
        giftId: gifts,
        receiverId: [{userId: receiverId}],
        roomId: roomID,
      };

      dispatch(
        sendGiftAction(param, () => {
          onSendSuccess({param, totalCount});
          setSendingGift(false);
          onSendClick();
        }),
      );
      setDiamondPoints(diamondPoints - totalPrice);
    } else HelperService.showToast(strings('gift.giftSendError'));
  };

  const _renderGiftList = ({item, index}) => {
    return (
      <View style={[styles.giftItem, {alignItems: _alignItems(index)}]}>
        <View style={{alignItems: 'center'}}>
          <MyImage
            fast
            source={{uri: `${IMAGE_URL}${item.icon}`}}
            style={styles.giftIcon}
          />
          <View style={styles.diamondContainerSmall}>
            <SvgIcon.SmallDiamond />
            <MyText style={styles.diamondCount}>{item.price}</MyText>
          </View>
          <Counter
            count={item?.count || 0}
            onDecrement={onDecrement(item, index)}
            onIncrement={onIncrement(item, index)}
            style={{marginTop: dynamicSize(5)}}
          />
        </View>
      </View>
    );
  };

  const _renderSelectedList = ({item, index}) => {
    if(!item.count) return null

    return (
      <View style={[styles.selectedContainer]}>
        <MyText style={styles.selectedCount}>{`*${item.count || 0}`}</MyText>
        <MyImage
          fast
          key={index.toString()}
          source={{uri: `${IMAGE_URL}${item.icon}`}}
          style={styles.giftIcon}
        />
      </View>
    );
  };

  const _renderSelectedSeperator = () => (
    <View style={styles.selectedSeperator} />
  );

  return (
    <View style={[styles.giftContainer, mainContainer]}>
      <View style={styles.diamondContainer}>
        <SvgIcon.SmallDiamond />
        <MyText style={styles.diamondText}>{diamondPoints}</MyText>
      </View>
      <View>
        <FlatList
          key="horizontalList"
          data={topCategoryList}
          renderItem={_renderTopList}
          horizontal
          ItemSeparatorComponent={_renderHeaderSeperator}
          contentContainerStyle={styles.topContentContainerStyle}
        />
      </View>
      {!topCategoryList?.[selectedGiftType]?.gifts ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {fetchingGifts ? <MyIndicator color={COLORS.BABY_PINK} /> : null}
        </View>
      ) : (
        <FlatList
          key="horizontalList"
          data={topCategoryList?.[selectedGiftType]?.gifts || []}
          numColumns={3}
          renderItem={_renderGiftList}
          ItemSeparatorComponent={_renderGiftSeperator}
          contentContainerStyle={styles.giftList}
        />
      )}
      <View>
        <FlatList
          key="selectedList"
          data={selectedGifts}
          renderItem={_renderSelectedList}
          horizontal
          ItemSeparatorComponent={_renderSelectedSeperator}
          contentContainerStyle={styles.selectedlistContainerStyle}
        />
      </View>

      <Button
        disabled={fetchingGifts}
        indicator={sendingGift}
        width={SCREEN_WIDTH - dynamicSize(40)}
        buttonStyle={styles.buttonStyle}
        labelStyle={styles.buttonText}
        label={strings('gift.send')}
        onPress={onSendPress}
      />
    </View>
  );
};

export default GiftComponent;

const styles = StyleSheet.create({
  giftContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    width: SCREEN_WIDTH - dynamicSize(20),
    borderRadius: dynamicSize(5),
    padding: dynamicSize(10),
    height: SCREEN_HEIGHT / 2.8,
  },
  textInput: {
    borderRadius: dynamicSize(5),
    backgroundColor: COLORS.LIGHT_GREY_OFFSET,
    paddingHorizontal: dynamicSize(10),
  },
  textInputStyle: {
    paddingVertical: SCREEN_HEIGHT * 0.01,
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
  },
  inputRowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  diamondContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.WHITE,
  },
  diamondText: {
    marginLeft: dynamicSize(10),
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
  giftItem: {
    justifyContent: 'flex-end',
    width: SCREEN_WIDTH / 3 - dynamicSize(20),
    alignItems: 'center',
    marginRight: dynamicSize(10),
  },
  giftList: {
    // paddingHorizontal: dynamicSize(10),
  },
  giftSeperator: {
    height: dynamicSize(10),
  },
  diamondContainerSmall: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: dynamicSize(5),
  },
  diamondCount: {
    marginLeft: dynamicSize(5),
    fontSize: FONT_SIZE.SMALL,
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: COLORS.BABY_PINK,
    marginVertical: dynamicSize(15),
  },
  buttonText: {
    color: COLORS.WHITE,
  },
  selectedSeperator: {
    width: dynamicSize(10),
  },
  selectedlistContainerStyle: {
    paddingTop: dynamicSize(20),
    paddingHorizontal: dynamicSize(20),
  },
  selectedCount: {
    fontSize: FONT_SIZE.REGULAR_MEDIUM,
    position: 'absolute',
    right: dynamicSize(25),
  },
  selectedContainer: {
    paddingTop: dynamicSize(10),
    width: SCREEN_WIDTH / 5,
  },
  giftIcon: {
    width: SCREEN_HEIGHT * 0.04,
    height: SCREEN_HEIGHT * 0.04,
  },
});
