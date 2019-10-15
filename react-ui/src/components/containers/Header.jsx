// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/LV3/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';

const PATH_TOP = '/';
const PATH_ABOUT = '/about';
const PATH_HOWTOUSE = '/howtouse';

// TODO: 以下はサンプルデータなので、APIとのつなぎ込み時に削除しちゃってください。
const AreaAroundList = () => [
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
];

const TownAreaList1 = () => [
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
];

const SearchConditionSPList = () => [
  {
    title: '東北・北海道',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '北陸・甲信越',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関東',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '東海',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '関西',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '四国',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
  {
    title: '九州・沖縄',
    areaAroundList: AreaAroundList(),
    collapsibleItemList: [
      {
        to: '123',
        text: '東京',
      },
      {
        to: '123',
        text: '神奈川',
      },
      {
        to: '123',
        text: '千葉',
      },
      {
        to: '123',
        text: '埼玉',
      },
    ],
  },
];

type PropTypes = {
  isChecking: boolean,
  isLogin: boolean,
  user: {
    id: string,
    name: string,
    imageUrl: string,
  },
};

class HeaderContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const targetUrl = props.match ? props.match.url : '';
    let pagePathScrollPage = '';
    let isLinkRed = false;

    if (targetUrl === PATH_ABOUT || targetUrl === PATH_HOWTOUSE) {
      isLinkRed = true;
    }

    if (targetUrl && (props.top || isLinkRed)) {
      pagePathScrollPage = targetUrl;
    }

    this.state = {
      pagePathScrollPage,
      isOverTopView: false,
      isLinkRed: !!isLinkRed,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  componentWillUnmount() {
    this.state = {};
    window.removeEventListener('scroll', () => this.watchCurrentPosition(), true);
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
  }

  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
    const { dispatch } = this.props;
    dispatch(authActions.logout());
  };

  scrollTop = () => {
    let tgt;
    if ('scrollingElement' in document) {
      tgt = document.scrollingElement;
    } else if (this.browser.isWebKit) {
      tgt = document.body;
    } else {
      tgt = document.documentElement;
    }
    const scrollTop = (tgt && tgt.scrollTop) || 0;
    return Math.max(window.pageYOffset, scrollTop);
  };

  watchCurrentPosition() {
    const { pagePathScrollPage } = this.state;
    let positionScrollPC = 0;
    let positionScrollSP = 0;

    if (pagePathScrollPage) {
      const positionScroll = this.scrollTop();
      this.setState({ isOverTopView: false });

      switch (pagePathScrollPage) {
        case PATH_TOP:
          positionScrollPC = 450;
          positionScrollSP = 290;
          break;
        case PATH_ABOUT:
        case PATH_HOWTOUSE:
          positionScrollPC = 540;
          positionScrollSP = 320;
          break;
        default:
      }

      if (window.parent.screen.width > 480) {
        if (positionScroll > positionScrollPC) {
          this.setState({ isOverTopView: true });
        }
      } else if (positionScroll > positionScrollSP) {
        this.setState({ isOverTopView: true });
      }
    }
  }

  render() {
    const {
      top,
      isLogin,
      isChecking,
      noHeaderButton,
      user,
      unreadRooms,
      schedule,
      dispatch,
      history,
    } = this.props;

    const { isOverTopView, pagePathScrollPage, isLinkRed } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    return (
      <Header
        top={top}
        isOverTopView={isOverTopView}
        isScrollPage={pagePathScrollPage}
        isLinkRed={isLinkRed}
        topUrl={Path.top()}
        isCheckingLogin={isChecking}
        noHeaderButton={noHeaderButton}
        user={
          isLogin
            ? {
                id: user.id,
                name: user.name,
                image: user.imageUrl,
                isHost: user.isHost,
              }
            : null
        }
        messageUrl={Path.messageList()}
        messageCount={unreadRooms}
        searchConditionUrl={Path.searchCondition()}
        spMenu={<ServiceMenu userName={user.name} userImage={user.imageUrl} />}
        loginUrl={Path.login()}
        onClickSignup={() => history.push(Path.signUp())}
        aboutUrl={Path.about()}
        howtouseUrl={Path.howtouse()}
        helpUrl="https://help.monooq.com/"
        addSpace={{
          to: Path.createSpaceInfo(),
          onClick: () => dispatch(uiActions.setUiState({ space: {} })),
        }}
        spaces={{ to: Path.spaces() }}
        schedule={{ to: Path.schedule() }}
        isSchedule={isSchedule}
        sales={{ to: Path.sales() }}
        logoutEvent={{
          onClick: e => {
            e.preventDefault();
            this.logout();
          },
        }}
        searchConditionCurrentList={[
          {
            title: '都道府県',
            value: '東京都',
          },
          {
            title: '市区町村',
            value: '渋谷区,新宿区,目黒区,千代田区,文京区,港区',
          },
          {
            title: '町域・エリア',
            value: '上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷',
          },
        ]}
        searchConditionSPList={SearchConditionSPList()}
        cityTownAreaList={[
          {
            cityName: '目黒区',
            areaAroundList: AreaAroundList(),
            townAreaList: TownAreaList1(),
          },
          {
            cityName: '港区',
            areaAroundList: AreaAroundList(),
            townAreaList: TownAreaList1(),
          },
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  user: state.auth.user,
  unreadRooms: state.messages.unreadRooms,
  schedule: state.request.schedule,
});

export default withRouter(connect(mapStateToProps)(HeaderContainer));
