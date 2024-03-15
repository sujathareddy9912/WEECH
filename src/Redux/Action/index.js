import * as TYPES from './type';

export const getLanguageAction = callBack => ({
  type: TYPES.GET_LANGUAGE_ACTION,
  callBack,
});

export const getLanguageSuccessAction = payload => ({
  type: TYPES.GET_LANGUAGE_SUCCESS_ACTION,
  payload,
});

export const loginAction = (payload, callBack) => ({
  type: TYPES.USER_LOGIN,
  payload,
  callBack,
});

export const logOutAction = () => ({
  type: TYPES.USER_LOGOUT,
});

export const loginSuccessAction = payload => ({
  type: TYPES.LOGIN_SUCCESS_ACTION,
  payload,
});

export const getUserStatsAction = (payload, callBack) => ({
  type: TYPES.GET_USER_STATS,
  callBack,
  payload,
});

export const sendOtpAction = (payload, callBack) => ({
  type: TYPES.SENT_OTP,
  payload,
  callBack,
});

export const userRegistration = (payload, callBack) => ({
  type: TYPES.USER_REGISTRATION,
  payload,
  callBack,
});

export const forgotPasswordSendOtpAction = (payload, callBack) => ({
  type: TYPES.FORGOT_PASSWORD_SEND_OTP_ACTION,
  payload,
  callBack,
});

export const forgotPasswordAction = (payload, callBack) => ({
  type: TYPES.FORGOT_PASSWORD_ACTION,
  payload,
  callBack,
});

export const socialLoginAction = (payload, callBack) => ({
  type: TYPES.SOCIAL_LOGIN_TYPE,
  payload,
  callBack,
});

export const profleSetupAction = (payload, callBack) => ({
  type: TYPES.UPDATE_USER_PROFILE,
  payload,
  callBack,
});

export const profleSetupSuccessAction = payload => ({
  type: TYPES.UPDATE_USER_PROFILE_SUCCESS_ACTION,
  payload,
});

export const getUserProfileAction = callBack => ({
  type: TYPES.GET_USER_PROFILE,
  callBack,
});

export const uploadVideoAction = (payload, callBack) => ({
  type: TYPES.VIDEO_UPLOAD_ACTION,
  payload,
  callBack,
});

export const uploadImageAction = (payload, callBack) => ({
  type: TYPES.IMAGE_UPLOAD_ACTION,
  payload,
  callBack,
});

export const deleteImgVideoAction = (payload, callBack) => ({
  type: TYPES.DELETE_IMAGE_VIDEO_ACTION,
  payload,
  callBack,
});

export const getLiveUserListAction = (payload, callBack) => ({
  type: TYPES.GET_LIVE_USER_LIST_ACTION,
  payload,
  callBack,
});

export const getinterestListAction = callBack => ({
  type: TYPES.GET_INTEREST_LIST,
  callBack,
});

export const goLiveStreamingAction = (payload, callBack) => ({
  type: TYPES.GO_LIVE_STREAMING,
  payload,
  callBack,
});

export const endLiveStreamingAction = payload => ({
  type: TYPES.END_LIVE_STREAMING,
  payload,
});

export const getGiftDataAction = (payload, callBack) => ({
  type: TYPES.GET_GIFT_DATA,
  payload,
  callBack,
});

export const joinUserOnLiveStreamAction = payload => ({
  type: TYPES.JOIN_USER_DATA_ON_LIVE_STREAM,
  payload,
});

export const commentOnLiveStreamAction = payload => ({
  type: TYPES.COMMENT_ON_LIVE_STREAM,
  payload,
});

export const clearCommentOnDuringCall = () => ({
  type: TYPES.CLEAR_COMMENT_ON_CALL,
});

export const commentOnDuringCall = payload => ({
  type: TYPES.COMMENT_ON_CALL,
  payload,
});
export const likeLiveStreamAction = payload => ({
  type: TYPES.LIKE_LIVE_STREAM,
  payload,
});

export const updateLikedStatusAction = () => ({
  type: TYPES.UPDATE_LIKED_STATUS_ON_STREAM,
});

export const sendGiftAction = (payload, callBack) => ({
  type: TYPES.SEND_GIFT_ACTION,
  payload,
  callBack,
});

export const hostSendGiftAction = (payload, callBack) => ({
  type: TYPES.HOST_GIFT_INCOME_ACTION,
  payload,
  callBack,
});

export const refreshDataAction = payload => ({
  type: TYPES.REFRESH_DATA_ACTION,
  payload,
});

export const hostDetailAction = payload => ({
  type: TYPES.HOST_USER_DETAIL_ACTION,
  payload,
});

export const updateHostPointAction = payload => ({
  type: TYPES.UPDATE_HOST_POINTS_ACTION,
  payload,
});

export const clearLiveStreamDataAction = () => ({
  type: TYPES.CLEAR_LIVE_STREAM_DATA_ACTION,
});

export const activeLiveUserListInStreamingAction = (payload, callBack) => ({
  type: TYPES.ACTIVE_LIVE_USERS_IN_STREAMING_ACTION,
  payload,
  callBack,
});

export const joinUserAction = () => ({
  type: TYPES.JOIN_USER_LIVE_STREAM,
});

export const removeUserAction = () => ({
  type: TYPES.REMOVE_USER_LIVE_STREAM,
});

export const getListOfJoinedUser = payload => ({
  type: TYPES.GET_JOIN_USER_LIST,
  payload,
});

export const saveListOfJoinedUserData = payload => ({
  type: TYPES.SAVE_JOIN_USER_LIST_DATA,
  payload,
});

export const joinNewUserApiAction = payload => ({
  type: TYPES.JOIN_NEW_USER_ACTION,
  payload,
});

export const likeStreamApiAction = payload => ({
  type: TYPES.LIKE_LIVE_STREAM_API,
  payload,
});

export const changeAnimationTypeAction = payload => ({
  type: TYPES.CHANGE_ANIMATION_TYPE,
  payload,
});

export const clearJoinedUserDataAction = () => ({
  type: TYPES.CLEAR_JOINED_USER_LIST_ACTION,
});

export const getHostExtraDetailAction = payload => ({
  type: TYPES.GET_HOST_EXTRA_DETAIL_ACTION,
  payload,
});

export const getHostDetailSuccessAction = payload => ({
  type: TYPES.GET_HOST_EXTRA_DETAIL_SUCCESS_ACTION,
  payload,
});

export const agoraInitialisedStatusAction = payload => ({
  type: TYPES.AGORA_INITIALISED_ACTION,
  payload,
});

export const joinHostPeerIdAction = payload => ({
  type: TYPES.JOIN_HOST_PEER_ID_ACTION,
  payload,
});

export const joinAudiencePeerIdAction = payload => ({
  type: TYPES.JOIN_AUDIENCE_PEER_ID_ACTION,
  payload,
});

export const updateCallPeerIdAction = payload => ({
  type: TYPES.UPDATE_CALL_PEER_ID_ACTION,
  payload,
});

export const incomingCallPopupAction = payload => ({
  type: TYPES.INCOMING_CALL_POPUP_ACTION,
  payload,
});

export const isLiveActiveAction = payload => ({
  type: TYPES.IS_LIVE_ACTIVE_ACTION,
  payload,
});

export const incomingCallDataAction = payload => ({
  type: TYPES.INCOMING_CALL_POPUP_DATA_ACTION,
  payload,
});

export const getCAllingDetailAction = (payload, callBack) => ({
  type: TYPES.GET_CALLING_DETAIL_ACTION,
  payload,
  callBack,
});

export const leaveCallingRoomAction = payload => ({
  type: TYPES.LEAVE_CALLING_ROOM_ACTION,
  payload,
});

export const createIncomeCallAction = (payload, callBack) => ({
  type: TYPES.CREATE_INCOME_CALL_ACTION,
  payload,
  callBack,
});

export const showGiftComponentOnCallAction = payload => ({
  type: TYPES.SHOW_GIFTS_ON_CALL_ACTION,
  payload,
});

export const followUserAction = (payload, callBack) => ({
  type: TYPES.FOLLOW_USER_ACTION,
  payload,
  callBack,
});

export const getFollowerListAction = (payload, callBack) => ({
  type: TYPES.GET_FOLLOWER_LIST_ACTION,
  payload,
  callBack,
});

export const getFollowingListAction = (payload, callBack) => ({
  type: TYPES.GET_FOLLOWING_LIST_ACTION,
  payload,
  callBack,
});

export const getFriendsListAction = (payload, callBack) => ({
  type: TYPES.GET_FRIENDS_LIST_ACTION,
  payload,
  callBack,
});

export const getVisitorListAction = (payload, callBack) => ({
  type: TYPES.GET_VISITOR_LIST_ACTION,
  payload,
  callBack,
});

export const getRecentChatListAction = (payload, callBack) => ({
  type: TYPES.GET_RECENT_CHAT_LIST_ACTION,
  payload,
  callBack,
});

export const deleteRecentCallAction = (payload, callBack) => ({
  type: TYPES.DELETE_RECENT_CALL_ACTION,
  payload,
  callBack,
});

export const viewedProfileAction = payload => ({
  type: TYPES.VIEWED_PROFILE_USER_ACTION,
  payload,
});

export const deleteAllRecentCallAction = (payload, callBack) => ({
  type: TYPES.DELETE_ALL_RECENT_CALL_ACTION,
  payload,
  callBack,
});

export const createChatRoomAction = (payload, callBack) => ({
  type: TYPES.CREATE_CHAT_ROOM_ACTION,
  payload,
  callBack,
});

export const getChatHistoryAction = (payload, page, callBack) => ({
  type: TYPES.GET_CHAT_HISTORY_ACTION,
  payload,
  page,
  callBack,
});

export const getGrpMsgsAction = (payload, page, callBack) => ({
  type: TYPES.GET_GROUP_CHAT_HISTORY_ACTION,
  payload,
  page,
  callBack,
});

export const getChatHistorySuccessAction = payload => ({
  type: TYPES.GET_CHAT_HISTORY_SUCCESS_ACTION,
  payload,
});

export const getGroupChatHistorySuccessAction = payload => ({
  type: TYPES.GET_GROUP_CHAT_HISTORY_SUCCESS_ACTION,
  payload,
});

export const appendSocketChatDataAction = payload => ({
  type: TYPES.APPEND_SOCKET_CHAT_DATA_ACTION,
  payload,
});

export const appendSocketGroupChatDataAction = payload => ({
  type: TYPES.APPEND_SOCKET_GRP_CHAT_DATA_ACTION,
  payload,
});

export const updateChatHistoryAction = payload => ({
  type: TYPES.UPDATE_CHAT_HISTORY_ACTION,
  payload,
});

export const updateGrpChatHistoryAction = payload => ({
  type: TYPES.UPDATE_GRP_CHAT_HISTORY_ACTION,
  payload,
});

export const getChatListAction = (payload, callBack) => ({
  type: TYPES.GET_CHAT_LIST_ACTION,
  payload,
  callBack,
});

export const followingListModalAction = payload => ({
  type: TYPES.FOLLOWING_LIST_MODAL_ACTION,
  payload,
});

export const deleteRecentChatModalAction = payload => ({
  type: TYPES.DELETE_RECENT_CHAT_MODAL_ACTION,
  payload,
});

export const uploadChatMediaFileAction = (payload, callBack) => ({
  type: TYPES.UPLOAD_CHAT_MEDIA_FILE_ACTION,
  payload,
  callBack,
});

export const uploadChatVideoFileAction = (payload, callBack) => ({
  type: TYPES.UPLOAD_CHAT_VIDEO_FILE_ACTION,
  payload,
  callBack,
});

export const tradeUserExistingAction = (payload, callBack) => ({
  type: TYPES.CHECK_USER_TRADE_EXISTING_ACTION,
  payload,
  callBack,
});

export const tradeInitializerAction = (payload, callBack) => ({
  type: TYPES.TRADE_TRANSACTION_INITIALIZER,
  payload,
  callBack,
});

export const getTradeTransactionListAction = (payload, callBack) => ({
  type: TYPES.GET_TRADE_LIST_ACTION,
  payload,
  callBack,
});

export const getTradeTransactionTransfer = (payload, callBack) => ({
  type: TYPES.GET_TRADE_TRANSFER,
  payload,
  callBack,
});

export const getDiamondList = callBack => ({
  type: TYPES.GET_DIAMOND_LIST_ACTION,
  callBack,
});

export const getAgencyList = (payload, callBack) => ({
  type: TYPES.GET_AGENCY_LIST_ACTION,
  callBack,
  payload,
});

export const userMute = (payload, callBack) => ({
  type: TYPES.LIVE_USER_MUTE,
  payload,
  callBack,
});

export const userKickoutFromLive = (payload, callBack) => ({
  type: TYPES.LIVE_USER_KICKOUT,
  payload,
  callBack,
});

export const userBlockFromLive = (payload, callBack) => ({
  type: TYPES.LIVE_USER_BLOCK,
  payload,
  callBack,
});
export const unBlockUserAction = (payload, callBack) => ({
  type: TYPES.UNBLOCK_USER,
  payload,
  callBack,
});

export const makeUserAdmin = (payload, callBack) => ({
  type: TYPES.MAKE_USER_ADMIN,
  payload,
  callBack,
});

export const userLiveMuteFlag = payload => ({
  type: TYPES.LIVE_USER_MUTE_FLAG,
  payload,
});

export const reportUserAction = (payload, callBack) => ({
  type: TYPES.REPORT_USER,
  payload,
  callBack,
});

export const getGalleryListAction = (payload, callBack) => ({
  type: TYPES.GET_GALLERY_LIST,
  payload,
  callBack,
});

export const getAnotherUserProfile = (payload, callBack) => ({
  type: TYPES.ANOTHER_USER_PROFILE,
  payload,
  callBack,
});

export const deleteVisitor = (payload, callBack) => ({
  type: TYPES.DELETE_VISITOR,
  payload,
  callBack,
});

export const clearVisitor = callBack => ({
  type: TYPES.CLEAR_VISITOR,
  callBack,
});

export const getUserVideoListAction = (payload, callBack) => ({
  type: TYPES.GET_VIDEO_LIST,
  payload,
  callBack,
});

export const getUserEarningListAction = callBack => ({
  type: TYPES.GET_USER_EARNING,
  callBack,
});

export const getFreeCardListAction = (payload, callBack) => ({
  type: TYPES.GET_FREE_CARDS,
  callBack,
  payload,
});

export const claimFreeCardAction = (payload, callBack) => ({
  type: TYPES.CLAIM_FREE_CARD,
  callBack,
  payload,
});

export const getUserEarningDetailAction = (payload, callBack) => ({
  type: TYPES.GET_USER_EARNING_DETAIL,
  callBack,
  payload,
});

export const getUserSettlementDetailAction = (payload, callBack) => ({
  type: TYPES.GET_USER_SETTLEMENT_DETAIL,
  callBack,
  payload,
});

export const getBlockListAction = (payload, callBack) => ({
  type: TYPES.GET_BLOCK_LIST,
  callBack,
  payload,
});

export const linkMailAction = (payload, callBack) => ({
  type: TYPES.LINK_MAIL,
  callBack,
  payload,
});

export const linkPhoneAction = (payload, callBack) => ({
  type: TYPES.LINK_PHONE,
  callBack,
  payload,
});

export const updateMailAction = (payload, callBack) => ({
  type: TYPES.UPDATE_MAIL,
  callBack,
  payload,
});

export const updatePhoneAction = (payload, callBack) => ({
  type: TYPES.UPDATE_PHONE,
  callBack,
  payload,
});

export const deleteOneMessage = (payload, callBack) => ({
  type: TYPES.DELETE_ONE_MSG,
  payload,
  callBack,
});

export const updatingChatOnRemoveOneMsg = payload => ({
  type: TYPES.UPDATE_CHAT_AFTER_DEL_ONE_MESSAGE,
  payload,
});

export const updateClearChatFlag = payload => ({
  type: TYPES.UPDATE_CLEAR_CHAT_FLAG,
  payload,
});

export const updateSelectAllChat = payload => ({
  type: TYPES.UPDATE_SELECT_ALL_CHAT,
  payload,
});

export const updateDeleteChat = payload => ({
  type: TYPES.UPDATE_DELETE_CHAT,
  payload,
});

export const deleteSelectedChat = (payload, callBack) => ({
  type: TYPES.DELETE_SELECTED_CHAT,
  payload,
  callBack,
});

export const userBlockFromLiveSession = (payload, callBack) => ({
  type: TYPES.LIVE_SESSION_USER_BLOCK,
  payload,
  callBack,
});

export const getHelpCenter = callBack => ({
  type: TYPES.GET_HELP_CENTER,
  callBack,
});

export const putInKickoutRoom = payload => ({
  type: TYPES.PUT_IN_KICKOUT_ROOM,
  payload,
});

export const putInBlockRoom = payload => ({
  type: TYPES.PUT_IN_BLOCK_ROOM,
  payload,
});

export const grpChatCreation = (payload, callBack) => ({
  type: TYPES.GRP_CHAT_CREATION,
  payload,
  callBack,
});

export const grpChatUpdate = (payload, callBack) => ({
  type: TYPES.GRP_CHAT_UPDATE,
  payload,
  callBack,
});

export const getChatGroups = (payload, callBack) => ({
  type: TYPES.GET_GROUP_CHATS,
  payload,
  callBack,
});

export const inviteToGroupAction = (payload, callBack) => ({
  type: TYPES.INVITE_TO_GROUP,
  payload,
  callBack,
});

export const allowFreeChat = (payload, callBack) => ({
  type: TYPES.ALLOW_FREE_CHAT,
  payload,
  callBack,
});

export const shareLiveLinkFriends = (payload, callBack) => ({
  type: TYPES.SHARE_LIVE_LINK_IN_CHAT,
  payload,
  callBack,
});

export const getGroupDetails = (payload, callBack) => ({
  type: TYPES.GET_GRP_DETAILS,
  payload,
  callBack,
});

export const makeGroupAdmin = (payload, callBack) => ({
  type: TYPES.MAKE_GRP_ADMIN,
  payload,
  callBack,
});

export const removeGrpMember = (payload, callBack) => ({
  type: TYPES.REMOVE_GRP_MEMBER,
  payload,
  callBack,
});

export const getUserAgreement = callBack => ({
  type: TYPES.GET_USER_AGREEMENT,
  callBack,
});

export const getAboutWeecha = callBack => ({
  type: TYPES.GET_ABOUT_WEECHA,
  callBack,
});

export const getPrivacyPolicy = callBack => ({
  type: TYPES.GET_PRIVACY_POLICY,
  callBack,
});

export const getSearchUserAction = (payload, callBack) => ({
  type: TYPES.GET_SEARCH_USER,
  payload,
  callBack,
});

export const getWeechaLevelAction = (payload, callBack) => ({
  type: TYPES.GET_WEECHA_LEVEL_ACTION,
  payload,
  callBack,
});

export const rechargeUserBalanceAction = (payload, callBack) => ({
  type: TYPES.RECHARGE_USER_BALANCE,
  callBack,
  payload,
});

export const getRechargeAgency = callBack => ({
  type: TYPES.GET_RECHARGE_AGENCY,
  callBack,
});

export const reconnectLiveStreamAction = payload => ({
  type: TYPES.RECONNECT_LIVE_STREAM,
  payload,
});

export const getCustomerMsgsAction = (payload, callBack) => ({
  type: TYPES.GET_CUSTOMER_SUPPORT_MSG_ACTION,
  payload,
  callBack,
});

export const getCustomerMsgSendAction = (payload, callBack) => ({
  type: TYPES.GET_CUSTOMER_MSG_SEND_ACTION,
  payload,
  callBack,
});

export const getReceivedGiftListAction = (payload, callBack) => ({
  type: TYPES.GET_RECEIVED_GIFT_LIST_ACTION,
  payload,
  callBack,
});

export const getSendGiftListAction = (payload, callBack) => ({
  type: TYPES.GET_SEND_GIFT_LIST_ACTION,
  payload,
  callBack,
});
