const USER_ID = ':user_id';
const SPACE_ID = ':space_id';
const MESSAGE_ROOM_ID = ':message_room_id';
const REQUEST_ID = ':request_id';
const PREFECTURE = ':pref_code';
const CITY_CODE = ':city_code';
const TOWN_CODE = ':town_code';

export default {
  top: () => '/', // トップ
  search: () => '/search', // 検索結果
  searchCondition: () => '/search/condition', // 検索条件
  spacesByPrefecture: (prefecture = PREFECTURE) => `/spaces/pref${prefecture}`, // 都道府県別スペース一覧
  spacesByCity: (prefecture = PREFECTURE, cityCode = CITY_CODE) =>
    `/spaces/pref${prefecture}/city${cityCode}`, // 市区町村別スペース一覧
  spacesByTown: (prefecture = PREFECTURE, cityCode = CITY_CODE, townCode = TOWN_CODE) =>
    `/spaces/pref${prefecture}/city${cityCode}/town${townCode}`, // 町域別スペース一覧
  space: (spaceId = SPACE_ID) => `/space/${spaceId}`, // スペース詳細
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
  // 支払い一覧
  paid: () => '/paid',
  // 売上一覧
  sales: () => '/sales',
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
  // 静的ページ
  about: () => '/about',
  howtouse: () => '/howtouse',
  insurance: () => '/insurance',
  rule: () => '/rule',
  pageNotFound: () => '/notfound',
  error: (status = ':status') => `/error/${status}`,
  cancelPolicy: () => '/cancel/policy',
  asct: () => '/asct',
  privacy: () => '/privacy',
  terms: () => '/terms',
  // LP
  // lp1Host: () => '/lp1/host',
  lp1Guest: () => '/lp1/guest',
  lp1Guest2: () => '/lp1_2/guest',
  lp2Guest: () => '/lp2/guest',
  lp3Guest: () => '/lp3/guest',
};
