import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../Utils/colors';
import { styles } from './styles';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../Component/header/Header';
import { Button, GradientBackground, MyText, Touchable } from '../../../Component/commomComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CrownIcon from '../../../Assets/Icons/crown.svg'
import LinearGradient from 'react-native-linear-gradient';
import { FONT_FAMILY } from '../../../Utils/fontFamily';
import { CustomModal } from '../../../Component/commomComponent';

const DATA = [1, 2, 3, 4]

const LiveEnded = (props) => {
    const { navigation, route } = props;
    const darkLinearStyle = {
        start: { x: 1, y: 0 },
        end: { x: 1.5, y: 0.5 },
        colors: ['#D91CD1', '#0741B4']
    }
    const renderLiveList = () => {
        return (
            <View style={[styles?.cardContainer, {
                overflow: 'visible'
            }]}>
                <View style={styles?.cardContainer}>
                    <ImageBackground
                        imageStyle={styles.liveImgContainer}
                        style={styles.liveImgContainer}
                        source={require('../../../Assets/Images/photo(1).jpg')}>
                        <Text style={{
                            fontFamily: FONT_FAMILY.POPPINS_MEDIUM
                        }}>Live</Text>
                    </ImageBackground>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.joinText}>Join</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <GradientBackground
                {...darkLinearStyle}
                style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign
                            name={'closecircle'}
                            color={COLORS.MID_LIGHT_GREY}
                            size={wp(7)}
                            style={{
                                alignSelf: 'flex-end',
                                opacity: 0.6
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyContainer}>
                    <LinearGradient colors={['#FFD5FD', '#FFC5FD', '#5E94FF']}
                        style={styles.imgContainer}>
                        <Image source={require('../../../Assets/Images/girl.png')}
                            style={styles.userImg} />
                    </LinearGradient>
                    <TouchableOpacity style={styles.followContainer}>
                        <Text style={styles.follow}>FOLLOW</Text>
                        <MaterialIcons
                            name={'add'}
                            color={COLORS.WHITE}
                            size={wp(5)}
                            style={{
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.title, props?.dark && {
                        color: COLORS.WHITE
                    }]}>Alisa Morgan</Text>
                    <View style={styles.flagContainer}>
                        <View style={styles.crownContainer}>
                            <CrownIcon width={hp(2)} height={hp(2)} marginRight={wp(1)} />
                            <Text style={{
                                color: 'white'
                            }}>9</Text>
                        </View>
                        <Image source={require('../../../Assets/countryImages/bl.png')}
                            style={styles.flag} />
                        <View style={[styles.crownContainer, {
                            backgroundColor: COLORS.LIGHT_VIOLET
                        }]}>
                            <CrownIcon width={hp(2)} height={hp(2)} marginRight={wp(1)} />
                            <Text style={{
                                color: 'white'
                            }}>9</Text>
                        </View>
                    </View>
                    <Text style={[styles.endedText, props?.dark && {
                        color: COLORS.WHITE
                    }]}>Live Ended</Text>
                    <View style={styles.durationContainer}>
                        <Text style={[styles.endedText, { marginTop: 0, marginBottom: 0 }]}>Live Duration</Text>
                        <Text style={[styles.endedText, { marginTop: 0, marginBottom: 0 }]}>02:08:26</Text>
                    </View>
                </View>
                <View style={{
                    flex: 0.4
                }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={DATA}
                        renderItem={renderLiveList}
                        contentContainerStyle={{
                            paddingLeft: wp(2)
                        }}
                    />
                </View>
            </GradientBackground>
        </>
    );
};

export default LiveEnded;
