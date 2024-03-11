import * as TYPES from '../Redux/Action/type';
import {CommonTypes} from '../Store/Common/Actions';
import {all, takeEvery, takeLatest} from 'redux-saga/effects';
import ProfileSaga from './ProfileSaga/ProfileSaga';
import GameSaga from './Game/GameSaga';
import ChatPriceSaga from './MyChatPrice/ChatPriceSaga';

import {
  followerListSaga,
  followingListSaga,
  followUserSaga,
  getFriendsList,
  getGrpDetailsSaga,
  inviteToGroupSaga,
  makeGrpAdminSaga,
  removeGrpMemberSaga,
  allowFreeChat,
  shareLiveLinkWithFriends,
  getReceivedGiftDataSaga,
  getSendGiftDataSaga,
  shareLiveLinkWithGroups,
} from './userSaga';

import {
  getChatListSaga,
  visitorListSaga,
  createChatRoomSaga,
  recentChatListSaga,
  getChatMessagesSaga,
  deleteRecentChatListSaga,
  uploadChatMediaFileSaga,
  grpChatCreation,
  getGroupChats,
  getGroupMessagesSaga,
  grpChatUpdateSaga,
  uploadChatVideoFileSaga,
} from './chatSaga';

import {
  leaveCallRoomSaga,
  createIncomeCallSaga,
  getCallingDetailSaga,
  viewedProfileUserSaga,
  deleteAllRecentCallSaga,
} from './callingSaga';

import {
  sentOtp,
  userLogin,
  getLanguage,
  getUserVideo,
  social_login,
  getUserFilter,
  forgotPassword,
  getUserProfile,
  getUserGallary,
  videoUploadSaga,
  userRegistration,
  updateUserProfile,
  forgotPasswordSendOtp,
  tradeUserExisting,
  tradeTransactionInitializer,
  getTradeTransactionsList,
  getTradeTransfer,
  getUserStats,
  userLogOut,
  deleteImgVideoSaga,
  imageUploadSaga,
  getUserAgreementSaga,
  getAboutWeechaSaga,
  getPrivacyPolicySaga,
  getWeechaLevelSaga,
  rechargeUserBalanceSaga,
  getRechargeAgencySaga,
  getCustomerMsgsSaga,
  getCustomerSendMsgSaga,
} from './CommonSaga';

import {
  getGiftDataSaga,
  getLiveUserList,
  sendGiftDataSaga,
  goLiveStreamingSaga,
  getInterestListSaga,
  endLiveStreamingSaga,
  getHostExtraDetailApi,
  likeStreamUsingApiSaga,
  joinNewUserStreamingSaga,
  activeUsersInStreamingSaga,
  liveUserMute,
  liveUserKickout,
  liveUserBlock,
  makeRemoveUserAdmin,
  reportUserSaga,
  getGalleryListSaga,
  getAnotherUserProfileSaga,
  getUserVideoSaga,
  unBlockUserSaga,
  getDeleteOneMsgSaga,
  getDeleteSelectedChat,
  liveSessionUserBlock,
  getHelpCenter,
  getSearchUser,
  getHostGiftDataSaga,
  deleteVisitorSaga,
  clearVisitorSaga,
  updateNotificationStatusSaga,
} from './LiveStreaming';

import {
  claimFreeCardSaga,
  getAgencyListSaga,
  getBlockListSaga,
  getDiamondListSaga,
  getEarningDetailSaga,
  getFreeCardsListSaga,
  getMyEarningListSaga,
  getSettlementDetailSaga,
  linkMailSaga,
  linkPhoneSaga,
  updateMailSaga,
  updatePhoneSaga,
} from './myBalanceSaga';

export default function* root() {
  yield all([
    takeLatest(TYPES.GET_LANGUAGE_ACTION, getLanguage),
    takeLatest(TYPES.SENT_OTP, sentOtp),
    takeLatest(TYPES.USER_LOGIN, userLogin),
    takeLatest(TYPES.USER_LOGOUT, userLogOut),
    takeLatest(TYPES.FORGOT_PASSWORD_SEND_OTP_ACTION, forgotPasswordSendOtp),
    takeLatest(TYPES.USER_REGISTRATION, userRegistration),
    takeLatest(TYPES.FORGOT_PASSWORD_ACTION, forgotPassword),
    takeLatest(TYPES.UPDATE_USER_PROFILE, updateUserProfile),
    takeLatest(TYPES.GET_USER_PROFILE, getUserProfile),
    takeLatest(TYPES.GET_USER_STATS, getUserStats),
    takeLatest(TYPES.VIDEO_UPLOAD_ACTION, videoUploadSaga),
    takeLatest(TYPES.IMAGE_UPLOAD_ACTION, imageUploadSaga),
    takeLatest(TYPES.DELETE_IMAGE_VIDEO_ACTION, deleteImgVideoSaga),
    takeLatest(CommonTypes.GET_USER_GALLARY, getUserGallary),
    takeLatest(CommonTypes.GET_USER_VIDEO, getUserVideo),
    takeLatest(CommonTypes.GET_USER_FILTER, getUserFilter),
    takeLatest(TYPES.SOCIAL_LOGIN_TYPE, social_login),
    takeEvery(TYPES.GET_LIVE_USER_LIST_ACTION, getLiveUserList),
    takeLatest(TYPES.GET_INTEREST_LIST, getInterestListSaga),
    takeLatest(TYPES.GO_LIVE_STREAMING, goLiveStreamingSaga),
    takeLatest(TYPES.END_LIVE_STREAMING, endLiveStreamingSaga),
    takeLatest(TYPES.GET_GIFT_DATA, getGiftDataSaga),
    takeLatest(TYPES.SEND_GIFT_ACTION, sendGiftDataSaga),
    takeLatest(
      TYPES.ACTIVE_LIVE_USERS_IN_STREAMING_ACTION,
      activeUsersInStreamingSaga,
    ),
    takeLatest(TYPES.JOIN_NEW_USER_ACTION, joinNewUserStreamingSaga),
    takeLatest(TYPES.LIKE_LIVE_STREAM_API, likeStreamUsingApiSaga),
    takeLatest(TYPES.GET_HOST_EXTRA_DETAIL_ACTION, getHostExtraDetailApi),
    takeLatest(TYPES.GET_CALLING_DETAIL_ACTION, getCallingDetailSaga),
    takeLatest(TYPES.LEAVE_CALLING_ROOM_ACTION, leaveCallRoomSaga),
    takeLatest(TYPES.CREATE_INCOME_CALL_ACTION, createIncomeCallSaga),
    takeLatest(TYPES.FOLLOW_USER_ACTION, followUserSaga),
    takeLatest(TYPES.GET_RECENT_CHAT_LIST_ACTION, recentChatListSaga),
    takeLatest(TYPES.GET_VISITOR_LIST_ACTION, visitorListSaga),
    takeLatest(TYPES.GET_FOLLOWER_LIST_ACTION, followerListSaga),
    takeLatest(TYPES.CHECK_USER_TRADE_EXISTING_ACTION, tradeUserExisting),
    takeLatest(
      TYPES.TRADE_TRANSACTION_INITIALIZER,
      tradeTransactionInitializer,
    ),
    takeLatest(TYPES.GET_TRADE_LIST_ACTION, getTradeTransactionsList),
    takeLatest(TYPES.GET_TRADE_TRANSFER, getTradeTransfer),
    takeLatest(TYPES.GET_FOLLOWING_LIST_ACTION, followingListSaga),
    takeLatest(TYPES.DELETE_RECENT_CALL_ACTION, deleteRecentChatListSaga),
    takeLatest(TYPES.VIEWED_PROFILE_USER_ACTION, viewedProfileUserSaga),
    takeLatest(TYPES.DELETE_ALL_RECENT_CALL_ACTION, deleteAllRecentCallSaga),
    takeLatest(TYPES.CREATE_CHAT_ROOM_ACTION, createChatRoomSaga),
    takeLatest(TYPES.GET_CHAT_HISTORY_ACTION, getChatMessagesSaga),
    takeLatest(TYPES.GET_CHAT_LIST_ACTION, getChatListSaga),
    takeLatest(TYPES.UPLOAD_CHAT_MEDIA_FILE_ACTION, uploadChatMediaFileSaga),
    takeLatest(TYPES.UPLOAD_CHAT_VIDEO_FILE_ACTION, uploadChatVideoFileSaga),
    takeLatest(TYPES.GET_DIAMOND_LIST_ACTION, getDiamondListSaga),
    takeLatest(TYPES.GET_AGENCY_LIST_ACTION, getAgencyListSaga),
    takeLatest(TYPES.LIVE_USER_MUTE, liveUserMute),
    takeLatest(TYPES.LIVE_USER_KICKOUT, liveUserKickout),
    takeLatest(TYPES.LIVE_USER_BLOCK, liveUserBlock),
    takeLatest(TYPES.UNBLOCK_USER, unBlockUserSaga),
    takeLatest(TYPES.MAKE_USER_ADMIN, makeRemoveUserAdmin),
    takeLatest(TYPES.REPORT_USER, reportUserSaga),
    takeLatest(TYPES.GET_GALLERY_LIST, getGalleryListSaga),
    takeLatest(TYPES.ANOTHER_USER_PROFILE, getAnotherUserProfileSaga),
    takeLatest(TYPES.UPDATE_NOTIFICATION_STATUS, updateNotificationStatusSaga),
    takeLatest(TYPES.DELETE_VISITOR, deleteVisitorSaga),
    takeLatest(TYPES.CLEAR_VISITOR, clearVisitorSaga),
    takeLatest(TYPES.GET_VIDEO_LIST, getUserVideoSaga),
    takeLatest(TYPES.GET_USER_EARNING, getMyEarningListSaga),
    takeLatest(TYPES.GET_FREE_CARDS, getFreeCardsListSaga),
    takeLatest(TYPES.CLAIM_FREE_CARD, claimFreeCardSaga),
    takeLatest(TYPES.GET_USER_EARNING_DETAIL, getEarningDetailSaga),
    takeLatest(TYPES.GET_USER_SETTLEMENT_DETAIL, getSettlementDetailSaga),
    takeLatest(TYPES.GET_BLOCK_LIST, getBlockListSaga),
    takeLatest(TYPES.LINK_MAIL, linkMailSaga),
    takeLatest(TYPES.UPDATE_MAIL, updateMailSaga),
    takeLatest(TYPES.UPDATE_PHONE, updatePhoneSaga),
    takeLatest(TYPES.LINK_PHONE, linkPhoneSaga),
    takeLatest(TYPES.DELETE_ONE_MSG, getDeleteOneMsgSaga),
    takeLatest(TYPES.DELETE_SELECTED_CHAT, getDeleteSelectedChat),
    takeLatest(TYPES.LIVE_SESSION_USER_BLOCK, liveSessionUserBlock),
    takeLatest(TYPES.GET_HELP_CENTER, getHelpCenter),
    takeLatest(TYPES.GRP_CHAT_CREATION, grpChatCreation),
    takeLatest(TYPES.GRP_CHAT_UPDATE, grpChatUpdateSaga),
    takeLatest(TYPES.GET_GROUP_CHATS, getGroupChats),
    takeLatest(TYPES.GET_FRIENDS_LIST_ACTION, getFriendsList),
    takeLatest(TYPES.INVITE_TO_GROUP, inviteToGroupSaga),
    takeLatest(TYPES.ALLOW_FREE_CHAT, allowFreeChat),
    takeLatest(TYPES.SHARE_LIVE_LINK_IN_CHAT, shareLiveLinkWithFriends),
    takeLatest(TYPES.SHARE_LIVE_LINK_IN_GROUP_CHAT, shareLiveLinkWithGroups),
    takeLatest(TYPES.GET_GRP_DETAILS, getGrpDetailsSaga),
    takeLatest(TYPES.MAKE_GRP_ADMIN, makeGrpAdminSaga),
    takeLatest(TYPES.REMOVE_GRP_MEMBER, removeGrpMemberSaga),
    takeLatest(TYPES.GET_GROUP_CHAT_HISTORY_ACTION, getGroupMessagesSaga),
    takeLatest(TYPES.GET_USER_AGREEMENT, getUserAgreementSaga),
    takeLatest(TYPES.GET_ABOUT_WEECHA, getAboutWeechaSaga),
    takeLatest(TYPES.GET_PRIVACY_POLICY, getPrivacyPolicySaga),
    takeLatest(TYPES.GET_WEECHA_LEVEL_ACTION, getWeechaLevelSaga),
    takeLatest(TYPES.GET_SEARCH_USER, getSearchUser),
    takeLatest(TYPES.RECHARGE_USER_BALANCE, rechargeUserBalanceSaga),
    takeLatest(TYPES.GET_RECHARGE_AGENCY, getRechargeAgencySaga),
    takeLatest(TYPES.GET_CUSTOMER_SUPPORT_MSG_ACTION, getCustomerMsgsSaga),
    takeLatest(TYPES.GET_CUSTOMER_MSG_SEND_ACTION, getCustomerSendMsgSaga),
    takeLatest(TYPES.HOST_GIFT_INCOME_ACTION, getHostGiftDataSaga),
    takeLatest(TYPES.GET_RECEIVED_GIFT_LIST_ACTION, getReceivedGiftDataSaga),
    takeLatest(TYPES.GET_SEND_GIFT_LIST_ACTION, getSendGiftDataSaga),

    //new
    ProfileSaga(),
    GameSaga(),
    ChatPriceSaga(),
  ]);
}
