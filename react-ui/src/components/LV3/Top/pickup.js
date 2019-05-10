import Path from 'config/path';
import { Colors } from 'variables';

// スタッフのおすすめ
const PickupStaffSpaceList = [
  {
    large: 1,
    link: Path.space(1222),
    user: {
      image:
        'https://monooq.imgix.net/img%2Fusers%2F2575%2Fprofile%2F1527893789719.jpg?alt=media&token=a9343765-97f5-484f-8872-2b4be94eb079&fit=crop&w=44&h=44&auto=format',
      name: 'Iden',
    },
    space: {
      image:
        'https://monooq.imgix.net/img%2Fspaces%2F1222%2F1534560507154.jpg?alt=media&token=96b97e98-a107-4a65-ab43-4ab31d9b67de&fit=crop&w=260&h=200&auto=format',
      price: '12,500',
      area: '東京都豊島区',
      description:
        '広ーいスペースはなんと元銭湯！なかなか保管できない大きくて大量の荷物にもおすすめ。',
      color: Colors.pickup1,
    },
  },
  {
    large: 1,
    link: Path.space(581),
    user: {
      image:
        'https://monooq-s3.imgix.net/uploads/user/image/936/thumb_694376f3-daba-4d07-b6b8-3e02a4e7fac3.jpg?fit=crop&w=44&h=44&auto=format',
      name: 'your trunk room',
    },
    space: {
      image:
        'https://monooq.imgix.net/img%2Fspaces%2F581%2F1522855347035.jpg?alt=media&token=c656edc7-fa3d-43e2-a567-1e4b9620daca&fit=crop&w=260&h=200&auto=format',
      price: '5,000',
      area: '東京都板橋区',
      description:
        'ダンボールひとつから対応してくれます。小型や少量でちょっとだけ預けたい時にどうぞ！',
      color: Colors.pickup3,
    },
  },
  {
    large: 1,
    link: Path.space(722),
    user: {
      image:
        'https://monooq.imgix.net/img%2Fusers%2Fdefault.png?alt=media&token=e36437c2-778c-44cf-a701-2d4c8c3e0363&fit=crop&w=44&h=44&auto=format',
      name: 'イファ',
    },
    space: {
      image:
        'https://monooq.imgix.net/img%2Fspaces%2F722%2F1533355177362.jpg?alt=media&token=5a6baf8f-4f79-4713-8225-b9316df49b88&fit=crop&w=260&h=200&auto=format',
      price: '3,000',
      area: '東京都世田谷区',
      description: '三軒茶屋エリアならおすすめ！広くてきれい！',
      color: Colors.pickup3,
    },
  },
  {
    large: 1,
    link: Path.space(1340),
    user: {
      image:
        'https://monooq.imgix.net/img%2Fusers%2Fdefault.png?alt=media&token=e36437c2-778c-44cf-a701-2d4c8c3e0363&fit=crop&w=44&h=44&auto=format',
      name: 'erinpo',
    },
    space: {
      image:
        'https://monooq.imgix.net/img%2Fspaces%2F1340%2F1534164085396.jpg?alt=media&token=0efda33b-0948-4fb0-b338-49bee0ab424a&fit=crop&w=260&h=200&auto=format',
      price: '4,000',
      area: '東京都荒川区',
      description: '京成線町屋駅から2分の好立地！',
      color: Colors.pickup3,
    },
  },
  {
    large: 1,
    link: Path.space(2180),
    user: {
      image:
        'https://monooq.imgix.net/img%2Fusers%2F4703%2Fprofile%2F1541086445009.jpg?alt=media&token=c6b0e53d-feda-4896-b0f4-3d85388579ad&fit=crop&w=44&h=44&auto=format',
      name: 'るってぃ',
    },
    space: {
      image:
        'https://monooq.imgix.net/img%2Fspaces%2F2180%2F1541093231673.jpg?alt=media&token=51f70489-aba5-4b5c-82d0-3e014f8a55ca&fit=crop&w=260&h=200&auto=format',
      price: '6,000',
      area: '東京都世田谷区',
      description: '下北沢駅近く！4畳の1部屋まるごと利用可能！',
      color: Colors.pickup3,
    },
  },
  {
    large: 1,
    link: Path.space(2036),
    user: {
      image:
        'https://monooq.imgix.net/img%2Fusers%2F4429%2Fprofile%2F1539499901359.jpg?alt=media&token=43268377-25cf-4b4e-89ae-730e2cd4ba46&fit=crop&w=44&h=44&auto=format',
      name: 'TK',
    },
    space: {
      image:
        'https://monooq.imgix.net/img%2Fspaces%2F2036%2F1541294635567.jpg?alt=media&token=095dcdeb-7984-433d-abe0-1272c86d7a09&fit=crop&w=260&h=200&auto=format',
      price: '3,000',
      area: '東京都中野区',
      description: '【約1畳】今すぐ預かれます！中野駅から徒歩圏内の好アクセス、綺麗なスペース',
      color: Colors.pickup3,
    },
  },
  {
    large: 1,
    link: Path.space(1597),
    user: {
      image:
        'https://monooq.imgix.net/img%2Fusers%2F3436%2Fprofile%2F1535430824029.jpg?alt=media&token=83ba3c0a-820c-4642-a5f0-0857b2f7aa67&fit=crop&w=44&h=44&auto=format',
      name: 'ハピオク',
    },
    space: {
      image:
        'https://monooq.imgix.net/img%2Fspaces%2F1597%2F1542804123530.jpg?alt=media&token=ff7ecbe0-b2f8-4e0e-8cb4-7eb1badc2736&fit=crop&w=260&h=200&auto=format',
      price: '3,500',
      area: '東京都新宿区',
      description: '西新宿エリアならおすすめ！大きさ、期間にあわせて１畳から相談可能！',
      color: Colors.pickup3,
    },
  },
];

export default PickupStaffSpaceList;
