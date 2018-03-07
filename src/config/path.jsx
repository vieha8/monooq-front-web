const HOST_ID = ':host_id';
const USER_ID = ':user_id';
const SPACE_ID = ':space_id';
const MESSAGE_ID = ':message_id';
const SCHEDULE_ID = ':schedule_id';

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
  // 決済
  payment: (spaceId = SPACE_ID) =>
    `/space/${spaceId}/payment`,
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
  schedule: (hostId = HOST_ID) =>
    `/host/${hostId}/schedule`,
  // キャンセル確認
  confirmCancel: (scheduleId = SCHEDULE_ID) =>
    `/schedule/${scheduleId}/cancel`,
  // メッセージ一覧
  messages: (hostId = HOST_ID) =>
    `/host/${hostId}/messages`,
  // メッセージ詳細
  message: (messageId = MESSAGE_ID) =>
    `/message/${messageId}`,
  // 見積もり
  estimate: (messageId = MESSAGE_ID) =>
    `/message/${messageId}/estimate/new`,
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
