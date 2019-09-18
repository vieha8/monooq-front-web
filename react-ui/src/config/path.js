const HOST_ID = ':host_id';
const USER_ID = ':user_id';
const SPACE_ID = ':space_id';
const MESSAGE_ROOM_ID = ':message_room_id';
const SCHEDULE_ID = ':schedule_id';
const REQUEST_ID = ':request_id';

export default {
  // トップ
  top: () => '/',
  // 検索
  search: () => '/search',
  // 検索条件
  searchCondition: () => '/search/condition',
  // スペース詳細
  space: (spaceId = SPACE_ID) => `/space/${spaceId}`,
  // スペース作成
  createSpaceInfo: () => '/space/new/info',
  createSpaceBaggage: () => '/space/new/baggage',
  createSpaceReceive: () => '/space/new/receive',
  createSpacePrice: () => `/space/new/price/about`,
  createSpaceConfirm: () => `/space/new/confirm`,
  createSpaceCompletion: () => '/space/new/completion',
  spaceEditInfo: (spaceId = SPACE_ID) => `/space/${spaceId}/edit/info`,
  spaceEditBaggage: (spaceId = SPACE_ID) => `/space/${spaceId}/edit/baggage`,
  spaceEditReceive: (spaceId = SPACE_ID) => `/space/${spaceId}/edit/receive`,
  spaceEditPrice: (spaceId = SPACE_ID) => `/space/${spaceId}/edit/price/about`,
  spaceEditConfirm: (spaceId = SPACE_ID) => `/space/${spaceId}/edit/confirm`,
  spaceEditCompletion: (spaceId = SPACE_ID) => `/space/${spaceId}/edit/completion`,
  // スケジュール
  schedule: () => '/schedule',
  // キャンセル確認
  confirmCancel: (scheduleId = SCHEDULE_ID) => `/schedule/${scheduleId}/cancel`,
  // メッセージ一覧
  messageList: () => '/messages',
  // メッセージ詳細
  message: (messageRoomId = MESSAGE_ROOM_ID) => `/messages/${messageRoomId}`,
  // 見積もり
  estimate: (messageRoomId = MESSAGE_ROOM_ID) => `/messages/${messageRoomId}/estimate`,
  // 決済
  payment: (messageRoomId = MESSAGE_ROOM_ID, requestId = REQUEST_ID) =>
    `/messages/${messageRoomId}/payment/${requestId}`,
  // プロフィール
  profile: (userId = USER_ID) => `/user/${userId}`,
  // プロフィール編集
  profileEdit: () => '/profile/edit',
  // スペース一覧
  spaces: () => '/user/spaces',
  // レビュー投稿
  hostReview: (hostId = HOST_ID, scheduleId = SCHEDULE_ID) =>
    `/host/${hostId}/schedule/${scheduleId}/review/new`,
  // 支払い一覧
  paid: () => '/paid',
  // 売上一覧
  sales: () => '/sales',
  // 口座編集
  editBankAccount: () => '/bank/edit',
  // お問い合わせ
  inquiry: () => `/inquiry`,
  // 登録
  signUp: () => '/signup',
  signUpProfile: () => '/signup/profile',
  signUpPurpose: () => '/signup/purpose',
  // ログイン
  login: () => '/login',
  // 退会
  unsubscribe: () => '/unsubscribe',
  resetPassword: () => '/password/reset',
  // 違反報告
  reportUser: () => '/report/user',
  reportSpace: () => '/report/space',
  // 静的ページ
  about: () => '/about',
  insurance: () => '/insurance',
  rule: () => '/rule',
  pageNotFound: () => '/notfound',
  error: (status = ':status') => `/error/${status}`,
  cancelPolicy: () => '/cancel/policy',
  asct: () => '/asct',
  privacy: () => '/privacy',
  terms: () => '/terms',
};
