const HOST_ID = ':host_id';
const USER_ID = ':user_id';
const SPACE_ID = ':space_id';
const MESSAGE_ROOM_ID = ':message_room_id';
const SCHEDULE_ID = ':schedule_id';
const ESTIMATE_ID = ':estimate_id';

export default {
  // トップ
  top: () =>
    '/',
  // 検索
  search: () =>
    '/search',
  // スペース一覧
  spaces: (hostId = HOST_ID) =>
    `/host/${hostId}/spaces`,
  // スペース詳細
  space: (spaceId = SPACE_ID) =>
    `/space/${spaceId}`,
  // スペース作成
  createSpaceInfo: (hostId = HOST_ID) =>
    `/host/${hostId}/space/new/info`,
  createSpaceBaggage: (hostId = HOST_ID) =>
    `/host/${hostId}/space/new/baggage`,
  createSpaceReceive: (hostId = HOST_ID) =>
    `/host/${hostId}/space/new/receive`,
  createSpaceAreaSize: (hostId = HOST_ID) =>
    `/host/${hostId}/space/new/areasize`,
  createSpaceAreaPrice: (hostId = HOST_ID) =>
    `/host/${hostId}/space/new/areaprice`,
  createSpaceAllPrice: (hostId = HOST_ID) =>
    `/host/${hostId}/space/new/allprice`,
  createSpaceCompletion: (hostId = HOST_ID) =>
    `/host/${hostId}/space/new/completion`,
  // スケジュール
  schedule: (userId = USER_ID) =>
    `/user/${userId}/schedule`,
  // キャンセル確認
  confirmCancel: (scheduleId = SCHEDULE_ID) =>
    `/schedule/${scheduleId}/cancel`,
  // メッセージ一覧
  messages: (userId = USER_ID) =>
    `/host/${userId}/messages`,
  // メッセージ詳細
  message: (messageRoomId = MESSAGE_ROOM_ID) =>
    `/message/${messageRoomId}`,
  // 見積もり
  estimate: (messageRoomId = MESSAGE_ROOM_ID) =>
    `/message/${messageRoomId}/estimate/new`,
  // 決済
  payment: (estimateId = ESTIMATE_ID) =>
    `/estimate/${estimateId}/payment`,
  // プロフィール
  profile: (userId = USER_ID) =>
    `/user/${userId}`,
  // プロフィール編集
  editProfile: (userId = USER_ID) =>
    `/user/${userId}/edit`,
  // レビュー投稿
  hostReview: (hostId = HOST_ID, scheduleId = SCHEDULE_ID) =>
    `/host/${hostId}/schedule/${scheduleId}/review/new`,
  // 支払い一覧
  paid: (userId = USER_ID) =>
    `/user/${userId}/paid`,
  // 売上・振込一覧
  salesTransfers: (hostId = HOST_ID) =>
    `/host/${hostId}/sales-transfers`,
  requestTransfer: (hostId = HOST_ID) =>
    `/${hostId}/transfer/new`,
  // 口座編集
  editBankAccount: (hostId = HOST_ID) =>
    `/host/${hostId}/bankaccount/edit`,
  // お問い合わせ
  inquiry: (userId = USER_ID) =>
    `/user/${userId}/inquiry`,
  // ホストモード切り替え
  hostMode: (userId = USER_ID) =>
    `/user/${userId}/hostmode`,
  // ユーザーモード切り替え
  userMode: (hostId = HOST_ID) =>
    `/host/${hostId}/usermode`,
  // 登録
  signup: () =>
    '/signup',
  // ログイン
  login: () =>
    '/login',
  // ログアウト
  logout: (userId = USER_ID) =>
    `/user/${userId}/logout`,
  // 退会
  unsubscribe: (userId = USER_ID) =>
    `/user/${userId}/unsubscribe`,
};
