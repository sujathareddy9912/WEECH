import {View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import styles, {fileWidth} from './styles';
import ProfileGift from '../../Assets/Icons/profileGift.svg';
import {MyImage, MyText} from '../../Component/commomComponent';
import {IMAGE_URL} from '../../Services/Api/Common';
import icons, {SvgIcon} from '../../Component/icons';
import {getAge} from '../../Utils/helper';
import {dynamicSize} from '../../Utils/responsive';

const _renderCoverImage = (item, index) => {
  if (item?.coverImage) {
    return (
      <MyImage
        fast
        borderRadius={5}
        resizeMode={'cover'}
        style={[styles.imageContainer, index == 0 ? styles.one : undefined]}
        source={{uri: `${IMAGE_URL}${item.coverImage}`}}
      />
    );
  } else if (item?.profile)
    return (
      <MyImage
        fast
        borderRadius={5}
        resizeMode={'cover'}
        style={[styles.imageContainer, index == 0 ? styles.one : undefined]}
        source={{uri: `${IMAGE_URL}${item.profile}`}}
      />
    );
  else return <SvgIcon.profilePlaceholder />;
};

export default function LiveStreamingCard(item, index, _joinAsAudience) {
  if (index == 0) {
    return item?._id ? (
      <TouchableOpacity onPress={() => _joinAsAudience(item)}>
        <View style={[styles.absoluteImage, styles.one]}>
          {_renderCoverImage(item, index)}
        </View>
        <View style={[styles.imageSubContainer, styles.one]}>
          <View style={styles.topContainer}>
            {/* {!!item.adminBadge ? ( */}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF2E55', '#FE9E02']}
              style={styles.myStarContainer}>
              <View style={{bottom: 2}}>
                <SvgIcon.PoperHeart />
              </View>
              <MyText style={styles.myStarValue}>{item?.adminBadge}</MyText>
            </LinearGradient>
            {/* ) : (
                <View />
              )} */}

            <View style={[styles.myStarContainer]}>
              <ProfileGift />
              <MyText style={styles.groupCount}>{item?.todayEarning}</MyText>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <View style={styles.nameContainer}>
                <SvgIcon.FlameIcon />
                <MyText style={styles.joinTextStyle}>{item?.letsJoin}</MyText>
              </View>

              <MyText style={styles.nameStyle}>
                {item.name}, {getAge(item?.DateOfBirth)}
              </MyText>
            </View>
            <View style={styles.starContainer}>
              {/* {item.star != 0 && ( */}
              <View style={styles.starContainer}>
                <MyImage source={icons.starIcon} />
                <View style={styles.starText}>
                  <MyText style={styles.starCount}>{item.star}</MyText>
                </View>
              </View>
              {/* )} */}
              <View style={styles.groupContainer}>
                <SvgIcon.OrangeEyeIcon />
                <MyText style={styles.valueText}>
                  {item.totalLiveUser || 0}
                </MyText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : null;
  } else if (index == 1) {
    return item?.length ? (
      <View
        style={{
          flexDirection: 'column',
          height: styles.one.height,
          width: styles.one.width,
          // justifyContent:'space-between'
        }}>
        {item.map((eachItem, eachIndex) => {
          return (
            <TouchableOpacity
              style={{
                marginTop: eachIndex == 1 ? dynamicSize(4) : 0,
                width: fileWidth,
                height: fileWidth,
              }}
              onPress={() => _joinAsAudience(eachItem)}>
              <View style={styles.absoluteImage}>
                {_renderCoverImage(eachItem, index)}
              </View>
              <View style={styles.imageSubContainer}>
                <View style={styles.topContainer}>
                  {!!eachItem?.adminBadge ? (
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#FF2E55', '#FE9E02']}
                      style={styles.myStarContainer}>
                      <View style={{bottom: 2}}>
                        <SvgIcon.PoperHeart />
                      </View>
                      <MyText style={styles.myStarValue}>
                        {eachItem?.adminBadge}
                      </MyText>
                    </LinearGradient>
                  ) : (
                    <View />
                  )}

                  <View style={styles.myStarContainer}>
                    <MyText style={styles.groupCount}>
                      {eachItem?.todayEarning}
                    </MyText>
                  </View>
                </View>
                <View style={styles.row}>
                  <View>
                    <View style={styles.nameContainer}>
                      <SvgIcon.FlameIcon />
                      <MyText style={styles.joinTextStyle}>
                        {eachItem?.letsJoin}
                      </MyText>
                    </View>

                    <MyText style={styles.nameStyle}>
                      {eachItem?.name}, {getAge(eachItem?.DateOfBirth) || 23}
                    </MyText>
                  </View>
                  <View style={styles.starContainer}>
                    {eachItem?.star != 0 && (
                      <View style={styles.starContainer}>
                        <MyImage source={icons.starIcon} />
                        <View style={styles.starText}>
                          <MyText style={styles.starCount}>
                            {eachItem?.star}
                          </MyText>
                        </View>
                      </View>
                    )}
                    <View style={styles.groupContainer}>
                      <SvgIcon.OrangeEyeIcon />
                      <MyText style={styles.valueText}>
                        {eachItem?.totalLiveUser || 0}
                      </MyText>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    ) : null;
  } else
    return item?._id ? (
      <TouchableOpacity onPress={() => _joinAsAudience(item)}>
        <View style={styles.absoluteImage}>
          {_renderCoverImage(item, index)}
        </View>
        <View style={styles.imageSubContainer}>
          <View style={styles.topContainer}>
            {!!item?.adminBadge ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF2E55', '#FE9E02']}
                style={styles.myStarContainer}>
                <View style={{bottom: 2}}>
                  <SvgIcon.PoperHeart />
                </View>
                <MyText style={styles.myStarValue}>{item?.adminBadge}</MyText>
              </LinearGradient>
            ) : (
              <View />
            )}

            <View style={styles.myStarContainer}>
              <MyText style={styles.groupCount}>{item?.todayEarning}</MyText>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <View style={styles.nameContainer}>
                <SvgIcon.FlameIcon />
                <MyText style={styles.joinTextStyle}>{item?.letsJoin}</MyText>
              </View>

              <MyText style={styles.nameStyle}>
                {item.name}, {getAge(item?.DateOfBirth) || 23}
              </MyText>
            </View>
            <View style={styles.starContainer}>
              {item.star != 0 && (
                <View style={styles.starContainer}>
                  <MyImage source={icons.starIcon} />
                  <View style={styles.starText}>
                    <MyText style={styles.starCount}>{item.star}</MyText>
                  </View>
                </View>
              )}
              <View style={styles.groupContainer}>
                <SvgIcon.OrangeEyeIcon />
                <MyText style={styles.valueText}>
                  {item.totalLiveUser || 0}
                </MyText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : null;
}
