import {SCREEN_HEIGHT} from './helper';
import {getFontSize} from './responsive';

export enum FONT_FAMILY {
  AVENIER_BLACK = 'AvenirLTStd-Black',
  AVENIER_BOOK = 'AvenirLTStd-Book',
  // AVENIER_ROMAN = 'AvenirLTStd-Roman',

  GILROY_BOLD = 'Gilroy-Bold',
  // GILROY_HEAVY = 'Gilroy-Heavy',
  // GILROY_LIGHT = 'Gilroy-Light',
  GILROY_MEDIUM = 'Gilroy-Medium',
  GILROY_REGULAR = 'Gilroy-Regular',
  GILROY_SEMIBOLD = 'Gilroy-Semibold',

  LATO_REGULAR = 'Lato-Regular',

  MULISH_REGULAR = 'Mulish-Regular',

  // POPPINS_BLACK = 'Poppins-Black',
  POPPINS_BOLD = 'Poppins-Bold',
  // POPPINS_EXTRABOLD = 'Poppins-ExtraBold',
  // POPPINS_ECTRA_LIGHT = 'Poppins-ExtraLight',
  // POPPINS_LIGHT = 'Poppins-Light',
  POPPINS_MEDIUM = 'Poppins-Medium',
  POPPINS_REGULAR = 'Poppins-Regular',
  POPPINS_SEMIBOLD = 'Poppins-SemiBold',
  // POPPINS_THIN = 'Poppins-Thin',

  ROBOTO_BLACK = 'Roboto-Black',
  // ROBOTO_BLACK_ITALIC = 'Roboto-BlackItalic',
  ROBOTO_BOLD = 'Roboto-Bold',
  // ROBOTO_BOLD_ITALIC = 'Roboto-BoldItalic',
  // ROBOTO_ITALIC = 'Roboto-Italic',
  // ROBOTO_LIGHT = 'Roboto-Light',
  // ROBOTO_LIGHT_ITALIC = 'Roboto-LightItalic',
  ROBOTO_MEDIUM = 'Roboto-Medium',
  // ROBOTO_MEDIUM_ITALIC = 'Roboto-MediumItalic',
  ROBOTO_REGULAR = 'Roboto-Regular',
  // ROBOTO_THIN = 'Roboto-Thin',
  // ROBOTO_THIN_ITALIC = 'Roboto-ThinItalic',

  SF_PRO_REGULAR = 'SFProDisplay-Regular',
  SF_PRO_BOLD = 'SFProDisplay-Bold',
  SF_PRO_MEDIUM = 'SFProDisplay-Medium',
  SF_PRO_SEMIBOLD = 'SFProDisplay-Semibold',
  SF_PRO_Light = 'SFProDisplay-Light',
  SFProText_Medium = 'SFProText-Medium',
  
  Inter_Medium = 'Inter-Medium'

}

export enum FONT_SIZE {
  SMALL = SCREEN_HEIGHT * 0.013,
  REGULAR = SCREEN_HEIGHT * 0.015,
  REGULAR_MEDIUM = SCREEN_HEIGHT * 0.017,
  MEDIUM = getFontSize(14),
  SEMI_MEDIUM = getFontSize(15),
  SEMI = SCREEN_HEIGHT * 0.02,
  SEMI_LARGE = getFontSize(17),
  LARGE = SCREEN_HEIGHT * 0.022,
  EXTRA_LARGE = SCREEN_HEIGHT * 0.025,
  BOLD = getFontSize(22),
  MID_BOLD = getFontSize(24),
  EXTRA_BOLD = getFontSize(28),
  SEMI_BLACK = SCREEN_HEIGHT * 0.03,
  BLACK = SCREEN_HEIGHT * 0.04,
}
