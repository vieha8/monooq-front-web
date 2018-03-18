const HOST_ID = ':host_id';
const USER_ID = ':user_id';
const SPACE_ID = ':space_id';
const MESSAGE_ROOM_ID = ':message_room_id';
const SCHEDULE_ID = ':schedule_id';
const REQUEST_ID = ':request_id';

export default {
  // トップ
  top: () =>
    '/',
  // 検索
  search: () =>
    `/search`,
  // スペース一覧
  spaces: (userId = USER_ID) =>
    `/user/${userId}/spaces`,
  // スペース詳細
  space: (spaceId = SPACE_ID) =>
    `/space/${spaceId}`,
  // スペース作成
  createSpaceInfo: () =>
    `/space/new/info`,
  createSpaceBaggage: () =>
    `/space/new/baggage`,
  createSpaceReceive: () =>
    `/space/new/receive`,
  createSpaceAreaSize: () =>
    `/space/new/areasize`,
  createSpaceAreaPrice: () =>
    `/space/new/areaprice`,
  createSpaceAllPrice: () =>
    `/space/new/allprice`,
  createSpaceCompletion: () =>
    `/space/new/completion`,
  // スケジュール
  schedule: () =>
    `/schedule`,
  // キャンセル確認
  confirmCancel: (scheduleId = SCHEDULE_ID) =>
    `/schedule/${scheduleId}/cancel`,
  // メッセージ一覧
  messages: () =>
    `/messages`,
  // メッセージ詳細
  message: (messageRoomId = MESSAGE_ROOM_ID) =>
    `/message/${messageRoomId}`,
  // 見積もり
  estimate: (messageRoomId = MESSAGE_ROOM_ID) =>
    `/message/${messageRoomId}/estimate`,
  // 決済
  payment: (messageRoomId = MESSAGE_ROOM_ID, requestId = REQUEST_ID) =>
    `/message/${messageRoomId}/payment/${requestId}`,
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
  // 退会
  unsubscribe: () =>
    `/unsubscribe`,
  // 違反報告
  report: () =>
    '/report',
  // 静的ページ
  about: () =>
    '/about',
  insurance: () =>
    '/insurance',
  rule: () =>
    '/rule',
  maintenance: () =>
    '/maintenance',
  notFound: () =>
    '/404',
  cancellationPolicies: () =>
    '/cancellationPolicies',
  asct: () =>
    '/asct',
  company: () =>
    '/company',
  privacy: () =>
    '/privacy',
  terms: () =>
    '/terms',
  helpTop: () =>
    '/help',
  helpAboutService: () =>
    '/help/aboutService',
};
