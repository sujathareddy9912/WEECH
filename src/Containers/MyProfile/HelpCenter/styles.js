import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

import { COLORS } from '../../../Utils/colors';
import { FONT_FAMILY } from '../../../Utils/fontFamily';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'space-between',
        paddingBottom: wp(10),
    },
    header: {
        backgroundColor: 'transparent',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5)
    },
    itemText: {
        fontSize: 16,
        fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    },
    list: {
        marginTop: wp(10),
        paddingHorizontal: wp(3),
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: COLORS.BLACK,
    },
    buttonStyle: {
        position: 'absolute',
        bottom: hp(5),
        backgroundColor: COLORS.BABY_PINK,
        alignSelf: 'center',
        height: hp(7),
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        paddingBottom: wp(10)
      },
      webViewContent: {
        flex: 1,
        padding: 10,
      },
});
