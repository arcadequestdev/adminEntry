const domain = "http://localhost:8000";
/* const domain = "https://arcadequest-l3pj.onrender.com"; */
/* const domain = "https://testserver-fnby.onrender.com"; */
/* const statsDomain = "http://localhost:8000"; */
const statsDomain = "https://arcadequeststats.onrender.com";
/* const rescheduleDomain = "http://localhost:8000"; */

//user
export const SIGNUP = `${domain}/user/signup`;
export const SIGNUP_WITHROLE = `${domain}/user/signup_withRole`;
export const BLOCK_USER = `${domain}/user/block`;
export const BLOCK_USER_FROM_COMMUNITY =  `${domain}/user/block_from_community`;
export const UNBLOCK_USER = `${domain}/user/unblock`;
export const BLOCK_USER_BY_ID = `${domain}/user/block_by_id`;
export const SAVE_PASSWORD = `${domain}/user/save_password`;
export const FETCH_USER_EPICNAME = `${domain}/user/get_epicName`;
export const REQUEST_VERIFY_BOT = `${domain}/user/request_validationS_bot`;
export const UNLINK_EPICACCOUNT = `${domain}/user/unlink_epicId`;
export const UPDATE_FIRSTTIME = `${domain}/user/update_first_time`;
export const ADD_MODERATOR = `${domain}/user/add_moderator`;
export const REMOVE_MODERATOR = `${domain}/user/remove_moderator`;
export const EDIT_MODERATOR = `${domain}/user/edit_moderator`;
export const CHECK_BLOCK = `${domain}/user/check_block`;
export const CHANGE_NAME = `${domain}/user/change_name`;
export const GIVE_COINS_TO_PLAYER = `${domain}/user/give_coins_to_player`;
export const CREATE_USER_DOC = `${domain}/user/create_doc`;
export const CREATE_USER_DOC_WITHROLE = `${domain}/user/create_doc_withRole`;
export const SAVE_USER_ROLE = `${domain}/user/select_role`;


//referral
export const REFRESH_REFERRAL = `${domain}/referral/refresh`;
export const REFERRAL_BOUNS = `${domain}/referral/giveBouns`;

//match
export const CREATE_MATCH = `${domain}/match/create`;
export const JOIN_MATCH = `${domain}/match/join`;
export const JOIN_MATCH_FORFREE = `${domain}/match/freeJoin`;
export const JOIN_AS_MEMBER = `${domain}/match/joinAsMember`;
export const JOIN_WITH_COINS = `${domain}/match/joinWithCoins`;
export const UPDATE_MATCH_STATUS = `${domain}/match/updateStatus`;
export const UPDATE_MATCH_DETAIL = `${domain}/match/updateDetail`;
export const SUBMIT_MATCH_RESULT = `${domain}/match/uploadResult`;
export const RESUBMIT_MATCH_RESULT = `${domain}/match/reuploadResult`;
export const GIVE_AND_END_MATCH = `${domain}/match/give_and_end`;
export const CALC_REVENUE = `${domain}/match/calc_revenue`;
export const ONLY_GIVE_PLACE = `${domain}/match/only_give_place`;
export const CANCEL_MATCH = `${domain}/match/cancel_match`;
export const TWITCH_SHARE_MATCH = `${domain}/match/twitch_share_match`;
export const TWITCH_SHARE_RULES = `${domain}/match/twitch_share_rules`;
export const DISCORD_SHARE_MATCH = `${domain}/match/discord_share_match`;

export const MATCH_GIVE_PRIZE = `${domain}/match/givePrize`;
export const MATCH_GIVE_TOKEN = `${domain}/match/giveToken`;

export const LEAVE_MATCH = `${domain}/match/leave_match`;
export const LEAVE_MATCH_CLUB = `${domain}/match/leave_match_club`;
export const END_MATCH_FOR_CLUB = `${domain}/match/end_match_club`;

export const JOIN_WAITLIST = `${domain}/match/join_waitlist`;
export const JOIN_FROM_WAITLIST = `${domain}/match/join_from_waitlist`;
export const JOIN_FROM_WAITLIST_COINS = `${domain}/match/join_from_waitlist_coins`;
export const LEAVE_WAITLIST = `${domain}/match/leave_waitlist`;
export const FETCH_WAITLIST_GAMES = `${domain}/match/waitlist_games`;

export const SEND_BOT = `${domain}/match/send_bot`;
export const RECORD_JOIN_BOUNS = `${domain}/match/record_join_bouns`;

//prize 
export const REDEEM_PRIZE = `${domain}/prize/redeem`;
export const ADD_CODE = `${domain}/prize/add_code`;
export const GIVE_PRIZE = `${domain}/prize/give`;
export const ARCHIVE_ORDER = `${domain}/prize/archive`;
export const DELETE_CODE = `${domain}/prize/delete_code`;
export const CREATE_EXCHANGE_ORDER= `${domain}/prize/create_exchange_order`;
export const CONFIRM_EXCHANGE_ORDER = `${domain}/prize/confirm_exchange_order`;
export const ARCHIEVE_EXCHANGE_ORDER = `${domain}/prize/archieve_exchange_order`;

//admin
export const ADMIN_GIVE_TOKEN = `${domain}/admin/giveToken`;
export const ADMIN_CHANGE_PERMISSION = `${domain}/admin/changePermission`;
export const ADMIN_UPGRADE_TO_STREAMER = `${domain}/admin/upgrade`;

//bot
export const REQUEST_BOT = `${domain}/user/request_bot`;
export const REQUEST_BOT_AGAIN = `${domain}/user/request_bot_again`;

//reward
export const REWARD_CONFIRM_PRIZE = `${domain}/reward/confirm_prize`;
export const REWARD_ADD_PRIZE = `${domain}/reward/add_prize`;
export const REWARD_REMOVE_PRIZE = `${domain}/reward/remove_prize`;

//chat
export const SEND_CHAT_MESSAGE = `${domain}/chat/send`;

// stripe
export const STRIPE_CHECKOUT = `${domain}/stripe/create_checkout_session`;
export const STRIPE_CHECKOUT_TICKETS = `${domain}/stripe/buy_tickets`;
export const STRIPE_GET_STATUS = `${domain}/stripe/get_session_status`;
export const STRIPE_CHECKOUT_MATCH = `${domain}/stripe/create_match_checkout`;
export const STRIPE_SUB = `${domain}/stripe/sub`;
export const STRIPE_SUB_TRIAL = `${domain}/stripe/sub_start_trial`;
export const STRIPE_UNSUB = `${domain}/stripe/unSub`;
export const STRIPE_REACTIVE = `${domain}/stripe/reactive`;
export const STRIPE_RENEW = `${domain}/stripe/renew`;
export const STRIPE_MULTIPLIER_SUB = `${domain}/stripe/multiplierSub`;
export const STRIPE_UNSUB_MULTIPLIER = `${domain}/stripe/unSubMultiplier`;
export const STRIPE_REACTIVE_MULTIPLIER = `${domain}/stripe/reactiveMultiplier`;

//community
export const JOIN_COMMUNITY = `${domain}/community/join`;
export const COMMUNITY_CHANGE_COVER = `${domain}/community/change_cover_image`;
export const JOIN_COMMUNITY_BOUNS = `${domain}/community/join_bouns`;

// leadeboard 
export const LEADER_MONTHLY_TOKENS = `${domain}/leaderboard/monthly/tokens`;
export const LEADER_MONTHLY_WINS = `${domain}/leaderboard/monthly/wins`;
export const LEADER_GLOBAL_TOKENS = `${domain}/leaderboard/global/tokens`;
export const LEADER_GLOBAL_WINS = `${domain}/leaderboard/global/wins`;

export const LEADER_STREAMER_MONTHLY = `${domain}/leaderboard/streamerMonthly`;
export const LEADER_STREAMER_GLOBAL = `${domain}/leaderboard/streamerGlobal`;

export const SEND_MONTHLY_CHAT = `${domain}/leaderboard/chat`;

// profile
export const FETCH_USER_PROFILE = `${domain}/profile`;
export const FETCH_USER_PROFILE_BASIC = `${domain}/profile/basic`;
export const FETCH_USER_PROFILE_EPIC = `${domain}/profile/epic`;
export const FOLLOW_USER = `${domain}/profile/follow`;
export const UNFOLLOW_USER = `${domain}/profile/unfollow`;

//post
export const CREATE_POST = `${domain}/posts/create`;
export const THUMBS_UP_POST = `${domain}/posts/thumbsUp`;
export const UNTHUMBS_UP_POST = `${domain}/posts/remove_thumbsUp`;
export const GIVE_TIPS_POST = `${domain}/posts/give_tips`;
export const ADD_COMMENT_TO_POST = `${domain}/posts/add_comment`;
export const ADD_REPLY_TO_COMMENT = `${domain}/posts/add_reply`;
export const THUMBS_UP_COMMENT = `${domain}/posts/comment_thumbsUp`;
export const REMOVE_THUMBS_UP_COMMENT = `${domain}/posts/remove_comment_thumbsUp`;
export const THUMBS_UP_REPLY = `${domain}/posts/reply_thumbsUp`;
export const REMOVE_THUMBS_UP_REPLY = `${domain}/posts/remove_reply_thumbsUp`;
export const DELETE_POST = `${domain}/posts/delete`;


//sub
export const STORE_SUB = `${domain}/subs/webSubStore`;
export const STROE_SUB_TRIAL =  `${domain}/subs/webSubTrialStore`;
export const STORE_MULTIPLIER_SUB = `${domain}/subs/webMultiplierStore`;


//perdiction

export const FETCH_PREDICT_PLAYERS = `${domain}/prediction/players`;
export const MAKE_PREDICTION = `${domain}/prediction/make`;
export const CONFIRM_PREDICT_RESULT = `${domain}/prediction/confirm`;

//epicService

export const LINK_ACCOUNT = `${domain}/epicService/link`;
export const CHECK_ACCOUNT_PRIVATE = `${domain}/epicService/checkAccount`;


//kill status
export const KILL_LEADER = `${statsDomain}/kills`;
export const KILL_PROFILE = `${statsDomain}/kills/profile`;
export const KILL_HISTORY = `${statsDomain}/kills/user-stats`;
export const FETCH_KILLID = `${statsDomain}/kills/getKillsId`;
export const CLAIM_CHECKIN_COINS = `${statsDomain}/kills/claimCoins`;


// notification
export const FETCH_NOTIFICATION = `${domain}/notifications`;

// digital Prize
export const CREATE_DIGITAL_PRIZE = `${domain}/digitalPrize/create`;
export const BUY_DIGITAL_PRIZE = `${domain}/digitalPrize/buy`;

//companies
export const CREATE_PARTNER= `${domain}/partner/create`;
export const CREATE_PRODUCT = `${domain}/partner/createProduct`;
export const EDIT_PARTNER = `${domain}/partner/edit`;
export const ADD_PARTNER_TEAMMEMBER = `${domain}/partner/add_member`;
export const REMOVE_BRAND_TEAMMEMBER = `${domain}/partner/remove_member`;
export const UPDATE_PRODUCT = `${domain}/partner/updateProduct`;
export const CREATE_GAME = `${domain}/partner/create_game`;
export const ADD_GAME_CODE = `${domain}/partner/add_game_code`;
export const ADD_SALE_GAME_CODE_ARRAY = `${domain}/partner/add_sale_game_code_array`;
export const DELETE_GAME_SALE_CODE = `${domain}/partner/delete_game_sale_code`;
export const REDEEM_GAME_CODE = `${domain}/partner/redeem_game_code`;
export const DELETE_GAME_CODE = `${domain}/partner/delete_game_code`;
export const UPDATE_GAME = `${domain}/partner/update_game`;
export const PUBLISH_GAME = `${domain}/partner/publish_game`;
export const SUBMIT_GAME_REVIEW = `${domain}/partner/submit_game_review`;
export const GET_GAME_SHORTLIST = `${domain}/partner/get_game_shortlist`;
export const GET_GAME_ALLLIST = `${domain}/partner/get_game_allList`;
export const CHANGE_GAME_STATUS = `${domain}/partner/change_game_status`;
export const SET_GAME_PRICE = `${domain}/partner/set_game_price`;
export const CHECK_GAME = `${domain}/partner/check_game`;

// influencers
export const CREATE_INFLUENCERS = `${domain}/influencer/create`;
export const ADD_INFLUENCER_RECORD = `${domain}/influencer/add_record`;
export const INFLUENCER_LINK_ACCOUNT = `${domain}/influencer/link_account`;
export const EDIT_INFLUENCER = `${domain}/influencer/edit`;
export const ADD_INFLUENCER_TEAMMEMBER = `${domain}/influencer/add_member`;
export const REMOVE_INFLUENCER_TEAMMEMBER = `${domain}/influencer/remove_member`;
export const ARCHIEVE_INFLUENCER = `${domain}/influencer/archieve`;

// investment
export const CREATE_INVESTMENT =`${domain}/investment/create`;
export const PUBLISH_INVESTMENT = `${domain}/investment/publish`;
export const ARCHIVED_INVESTMENT = `${domain}/investment/archive`;
export const END_INVESTMENT = `${domain}/investment/end`;
export const CONFIRM_INVEST = `${domain}/investment/confirmInvest`;
export const LINK_MATCH_WITH_INVESTMENT = `${domain}/investment/link`;
export const CANCEL_INVESTMENT = `${domain}/investment/cancel`;


//quest
export const GET_QUESTS_IDS = `${domain}/quests/ids`;
export const GET_DAILY_QUESTS_IDS = `${domain}/quests/daily_ids`;
export const JOIN_QUEST = `${domain}/quests/join`;
export const JOIN_DAILYQUEST = `${domain}/quests/join_daily`;
export const LEAVE_QUEST= `${domain}/quests/leave`;
export const LEAVE_QUEST_DAILY = `${domain}/quests/leave_daily`;
export const GET_QUESTS_LEADER =`${domain}/quests/leaderboard`;
export const GET_RECOMMEND_QUESTS = `${domain}/quests/recommends`;
export const CLAIM_FREE_TICKERS = `${domain}/quests/claimTickets`;

// creatorQuest 
export const CREATE_CREATORQUEST = `${domain}/creatorQuest/create`;
export const CREATE_CREATORQUEST_FIXEDPOOL = `${domain}/creatorQuest/create_fixPool`;
export const CREATE_CREATORQUEST_WITHPOOL = `${domain}/creatorQuest/create_withPool`;
export const JOIN_CREATORQUEST = `${domain}/creatorQuest/join`;
export const LEAVE_CREATORQUEST = `${domain}/creatorQuest/leave`;
export const SEND_CREATORQUEST_CHAT = `${domain}/chat/createQuest_send`;
export const START_CREATORQUEST = `${domain}/creatorQuest/start`;
export const CANCEL_CREATORQUEST = `${domain}/creatorQuest/cancel`;
export const JOIN_CREATORQUEST_AS_SUB = `${domain}/creatorQuest/join_as_sub`;
export const LEAVE_CREATORQUEST_AS_SUB = `${domain}/creatorQuest/leave_as_sub`;
export const LEAVE_CREATORQUEST_WITH_TICKET = `${domain}/creatorQuest/leave_with_tickets`;
export const JOIN_CREATORQUEST_WITH_TICKETS = `${domain}/creatorQuest/join_with_tickets`;
export const JOIN_CREATORQUEST_WITH_AD = `${domain}/creatorQuest/join_with_ad`;
export const LEAVE_CREATORQUEST_WITH_AD = `${domain}/creatorQuest/leave_with_ad`;
export const GET_PROMO_BOUNS = `${domain}/creatorQuest/getPromoBouns`;

export const RESCHEDULE_QUEST = `${domain}/creatorQuest/reschedule`;

//  pro league
export const CREATE_PROLEAGUE = `${domain}/proLeague/create`;
export const CREATE_PROLEAGUE_WITHPOOL = `${domain}/proLeague/create_withPool`;
export const JOIN_PROLEAGUE =  `${domain}/proLeague/join`;
export const LEAVE_PROLEAGUE = `${domain}/proLeague/leave`;
export const RESCHEDULE_PROLEAGUE = `${domain}/proLeague/reschedule`;
export const CANCEL_PROLEAGUE = `${domain}/proLeague/cancel`;

//tickets
export const BUY_TICKETS_WITH_COINS = `${domain}/tickets/coins`;

// reschdule

// campaign

export const CREATE_CAMPAIGN = `${domain}/campaign/create_with_proposal`;
export const SAVE_CAMPAIGN_FOR_LATER = `${domain}/campaign/save_for_later`;
export const SEND_NEW_PROPOSALS = `${domain}/campaign/send_new_proposals`;

export const CREATE_BRAND_SESSION = `${domain}/campaign/create_session`;
export const UPDATE_BRAND_SESSION_STATUS = `${domain}/campaign/update_session_status`;
export const BRAND_SESSION_ADD_QUEST = `${domain}/campaign/session_add_quest`;
export const GET_PRIMARY_SESSION = `${domain}/campaign/primary_session`;
export const CAMPAIGN_REJECT_PROPOSAL = `${domain}/campaign/reject_proposal`;
export const CAMPAIGN_ACCEPT_PROPOSAL = `${domain}/campaign/accept_proposal`;
export const CAMPAIGN_CANCEL_PROPOSAL = `${domain}/campaign/cancel_proposal`;
export const PROPOSAL_ADD_SCHEDULE = `${domain}/campaign/proposal_add_schedule`;
export const PROPOSAL_REMOVE_SCHEDULE = `${domain}/campaign/proposal_remove_schedule`;
export const PROPOSAL_CONFIRM_SCHEDULE = `${domain}/campaign/proposal_confirm_schedule`;
export const PROPOSAL_COMPLETE = `${domain}/campaign/proposal_complete`;
export const PROPOSAL_SUBMIT_REVIEW = `${domain}/campaign/proposal_submit_review`;
// tournament
export const CREATE_TOURNAMENT = `${domain}/tournament/create`;
export const PUBLISH_TOURNAMENT = `${domain}/tournament/publish`;
export const TOURNAMENT_INVITE = `${domain}/tournament/invite`;
export const TOURNAMENT_REMOVEINVITE = `${domain}/tournament/removeInvite`;
export const TOURNAMENT_TEAMSUP = `${domain}/tournament/teamsUp`;
export const TOURNAMENT_ROUND_CREATE = `${domain}/tournament/round_create`;
export const TOURNAMENT_ROUND_ADD_PLAYER = `${domain}/tournament/round_addPlayer`;
export const TOURNAMENT_ROUND_REMOVE_PLAYER = `${domain}/tournament/round_removePlayer`;
export const TOURNAMENT_ROUND_ADDPLAN = `${domain}/tournament/round_addPlan`;
export const TOURNAMENT_ROUND_REMOVEPLAN = `${domain}/tournament/round_removePlan`;
export const TOURNAMENT_CLOSEREGISTRATION = `${domain}/tournament/close`;
export const TOURNAMENT_UPDATEROUNDINDEX = `${domain}/tournament/updateRoundIndex`;
export const TOURNAMENT_CONFIRMROUND = `${domain}/tournament/confirmRound`;
export const TOURNAMENT_CHECKIN = `${domain}/tournament/checkIn`;
export const TOURNAMENT_JOINASSUB = `${domain}/tournament/join_as_sub`;
export const TOURNAMENT_JOINWITHCOINS = `${domain}/tournament/join_with_coins`;

// twitch
export const GET_ALLGAME_STREAMING_DATA = `${domain}/twitch/all_game_streaming_data`;


/* export const RESCHEDULE_QUEST = `${rescheduleDomain}/quests/reschedule`; */

//liveshoppingEvent
export const CREATE_LIVE_SHOPPING = `${domain}/liveShoppingEvent/create`;
export const ADD_GAME_TO_EVENT = `${domain}/liveShoppingEvent/add_game`;
export const REMOVE_GAME_FROM_EVENT = `${domain}/liveShoppingEvent/remove_game`;
export const START_EVENT = `${domain}/liveShoppingEvent/start`;
export const END_EVENT = `${domain}/liveShoppingEvent/end`;
export const SELECT_EVENT_PROMOTE_GAME = `${domain}/liveShoppingEvent/select_promote_game`;
export const CLEAR_EVENT_PROMOTE_GAME = `${domain}/liveShoppingEvent/clear_promote_game`;