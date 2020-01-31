import React, { Component, Fragment } from 'react';
import moment from 'moment';
import Path from 'config/path';
import { loggerActions } from 'redux/modules/logger';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';
import { requestActions } from 'redux/modules/request';
import { ErrorMessages } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { receiptTypeList } from 'helpers/receiptTypes';
import { isAvailableLocalStorage } from 'helpers/storage';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import Meta from 'components/LV1/Meta';
import SpaceMap from 'components/LV1/SpaceMap';
import SendMessageOnlyTabletSp from 'components/LV2/Space/SendMessage';
import Detail from 'components/LV3/Space/Detail';
import LoadingPage from 'components/LV3/LoadingPage';
import dummySpaceImage from 'images/img-dummy-space.png';
import connect from '../connect';

moment.locale('ja');

const Validate = {
  PackageContents: {
    Max: 1000,
  },
  Notes: {
    Max: 1000,
  },
};

class SpacePage extends Component {
  constructor(props) {
    super(props);
    this.init();

    this.state = {
      meta: {
        title: '',
        description: '',
        url: '',
        imageUrl: '',
      },
      isOverTopView: false,
      isBottom: false,
      isModalOpen: false,
      isModalOpenSP: false,
      usage: 0,
      breadth: 0,
      packageContents: '',
      notes: '',
      startDate: {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date(),
      },
      endDate: {
        year: moment().year(),
        month: moment().month() + 2,
        day: 1,
      },
      error: {},
    };

    if (isAvailableLocalStorage() && localStorage.getItem('request_params')) {
      const params = JSON.parse(localStorage.getItem('request_params'));
      const { usage, breadth, packageContents, notes, startDate, endDate } = params;

      this.state = {
        usage: usage || 0,
        breadth: breadth || 0,
        packageContents: packageContents || '',
        notes: notes || '',
        startDate: {
          year: startDate.year || moment().year(),
          month: startDate.month || moment().month() + 1,
          day: startDate.day || moment().date(),
        },
        endDate: {
          year: endDate.year || moment().year(),
          month: endDate.month || moment().month() + 2,
          day: endDate.day || 1,
        },
        error: {},
      };
    }
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
    this.setState({ isModalOpen: false, isModalOpenSP: false });
  }

  componentDidUpdate(prevProps) {
    // おすすめから遷移した時はconstructorが発火しないのでここで
    const spaceId = this.props.match.params.space_id;
    if (prevProps.space && prevProps.space.id !== Number(spaceId) && !this.props.isLoading) {
      this.init();
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(spaceActions.clearSpace());
    this._isMounted = false;
    window.removeEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  static getDerivedStateFromProps(nextProps) {
    const { space } = nextProps;
    if (space && space.id) {
      const { title, addressPref, addressCity, introduction, id } = space;

      const { imageUrl } = space.images[0];
      const ogImageUrl = imageUrl.includes('data:image/png;base64,')
        ? null
        : space.images[0].imageUrl;

      const meta = {
        title: `${title} ${addressPref}${addressCity}の空きスペース - モノオク`,
        description: introduction,
        url: `space/${id}`,
        imageUrl: ogImageUrl,
      };

      return { meta };
    }
    return null;
  }

  init = () => {
    const { dispatch, match } = this.props;
    const spaceId = match.params.space_id;

    dispatch(spaceActions.clearSpace());
    dispatch(spaceActions.fetchSpace({ spaceId }));
    dispatch(spaceActions.addSpaceAccessLog({ spaceId }));
    dispatch(spaceActions.getRecommendSpaces({ spaceId }));

    dispatch(
      loggerActions.recordEvent({
        event: 'space_views',
        detail: { spaceId },
      }),
    );
  };

  onClickSendMessage = async () => {
    const { dispatch, location, user, space, history } = this.props;
    const { usage, breadth, packageContents, notes, startDate, endDate } = this.state;
    // 未ログインの場合はログイン画面へ
    if (!user.id) {
      dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      history.push(Path.login());
      return;
    }
    dispatch(
      requestActions.request({
        user,
        space,
        body: {
          usage,
          breadth,
          packageContents,
          notes,
          startDate,
          endDate,
        },
      }),
    );
  };

  onKeyDownButtonMessage = e => {
    if (iskeyDownEnter(e)) {
      this.onClickSendMessage();
    }
  };

  makeBreadCrumbs = ({ addressPref, prefCode, addressCity, cityCode, addressTown, townCode }) => {
    const breadcrumbs = [];

    breadcrumbs.push({
      text: addressPref,
      link: Path.spacesByPrefecture(prefCode),
    });

    breadcrumbs.push({
      text: addressCity,
      link: Path.spacesByCity(prefCode, cityCode),
    });

    breadcrumbs.push({
      text: addressTown,
      link: Path.spacesByTown(prefCode, cityCode, townCode),
    });

    return breadcrumbs;
  };

  makeMetaBreadcrumbs = space => {
    const { addressPref, addressCity, addressTown, prefCode, cityCode, townCode } = space;

    const baseUrl = 'https://monooq.com';
    const itemList = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'トップ',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${addressPref}のスペース`,
        item: `${baseUrl}/pref${prefCode}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${addressCity}のスペース`,
        item: `${baseUrl}/pref${prefCode}/city${cityCode}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${addressTown}のスペース`,
        item: `${baseUrl}/pref${prefCode}/city${cityCode}/town${townCode}`,
      },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemList,
    };
  };

  showLeftContent = () => {
    const { space, user, isRequesting, recommendSpaces } = this.props;
    const {
      meta: { title, description, url, imageUrl },
      isOverTopView,
      isBottom,
      isModalOpen,
      isModalOpenSP,
      usage,
      breadth,
      startDate,
      endDate,
      packageContents,
      notes,
      error,
    } = this.state;
    const isSelfSpace = user.id === (space.user || {}).id;

    const isNoIndex = space.status === 'draft';

    const recommend = recommendSpaces
      ? recommendSpaces.map(s => ({
          id: s.id,
          image: (s.images[0] || {}).imageUrl,
          title: s.title,
          address: `${s.addressPref}${s.addressCity}`,
          priceFull: s.priceFull,
          priceTatami: s.priceTatami,
          onClick: () => this.onClickSpace(s),
        }))
      : null;

    return (
      <Fragment>
        <Meta
          title={title}
          description={description}
          ogUrl={url}
          ogImageUrl={imageUrl}
          noindex={isNoIndex}
          jsonLd={this.makeMetaBreadcrumbs(space)}
        />
        <Detail
          isModalOpen={isModalOpen}
          handleModalOpen={() => this.setState({ isModalOpen: true })}
          handleModalClose={() => this.setState({ isModalOpen: false })}
          isOverTopView={isOverTopView}
          isBottom={isBottom}
          id={space.id}
          map={<SpaceMap lat={space.lat} lng={space.lng} />}
          pref={space.addressPref}
          name={space.title}
          images={space.images.map(image => ({
            original: image.imageUrl || dummySpaceImage,
            thumbnail: image.imageUrl || dummySpaceImage,
          }))}
          status={space.status}
          breadcrumbsList={this.makeBreadCrumbs(space)}
          description={space.introduction}
          isRoom={space.sizeType > 0 && space.sizeType < 4}
          sizeType={space.sizeType}
          tagList={space.tags.map(v => v.name)}
          address={`${space.addressPref}${space.addressCity}${space.addressTown}`}
          delivery={
            space.receiptType === receiptTypeList.Both ||
            space.receiptType === receiptTypeList.Delivery
          }
          meeting={
            space.receiptType === receiptTypeList.Both ||
            space.receiptType === receiptTypeList.Meeting
          }
          supplement={space.receiptAbout}
          user={{
            id: space.user.id,
            name: space.user.name,
            imageUrl: space.user.imageUrl,
            profile: space.user.profile,
            prefCode: space.user.prefCode,
          }}
          priceFull={space.priceFull}
          priceTatami={space.priceTatami}
          recommend={recommend}
          buttonRequestCreatedisabled={isSelfSpace}
          loading={isRequesting}
          onClick={isSelfSpace ? null : this.onClickSendMessage}
          onKeyDownButtonMessage={isSelfSpace ? null : this.onKeyDownButtonMessage}
          errors={error}
          usage={usage}
          onChangeUsage={value => this.handleChangeUI('usage', value)}
          breadth={breadth}
          onChangeBreadth={value => this.handleChangeUI('breadth', value)}
          startDate={startDate}
          onChangeStartDateYear={value => this.handleChangeDate('startDate', 'year', value)}
          onChangeStartDateMonth={value => this.handleChangeDate('startDate', 'month', value)}
          onChangeStartDateDay={value => this.handleChangeDate('startDate', 'day', value)}
          endDate={endDate}
          onChangeEndDateYear={value => this.handleChangeDate('endDate', 'year', value)}
          onChangeEndDateMonth={value => this.handleChangeDate('endDate', 'month', value)}
          onChangeEndDateDay={value => this.handleChangeDate('endDate', 'day', value)}
          packageContents={packageContents}
          onChangePackageContents={value => this.handleChangeUI('packageContents', value)}
          notes={notes}
          onChangeNotes={value => this.handleChangeUI('notes', value)}
          buttonRequestDisabled={!this.validate()}
        />
        <SendMessageOnlyTabletSp
          isModalOpenSP={isModalOpenSP}
          handleModalOpenSP={() => this.setState({ isModalOpenSP: true })}
          handleModalCloseSP={() => this.setState({ isModalOpenSP: false })}
          isRoom={space.sizeType > 0 && space.sizeType < 4}
          priceFull={space.priceFull}
          priceTatami={space.priceTatami}
          buttonRequestCreatedisabled={isSelfSpace}
          loading={isRequesting}
          onClick={isSelfSpace ? null : this.onClickSendMessage}
          onKeyDownButtonMessage={isSelfSpace ? null : this.onKeyDownButtonMessage}
          errors={error}
          usage={usage}
          onChangeUsage={value => this.handleChangeUI('usage', value)}
          breadth={breadth}
          onChangeBreadth={value => this.handleChangeUI('breadth', value)}
          startDate={JSON.parse(JSON.stringify(startDate))}
          onChangeStartDateYear={value => this.handleChangeDate('startDate', 'year', value)}
          onChangeStartDateMonth={value => this.handleChangeDate('startDate', 'month', value)}
          onChangeStartDateDay={value => this.handleChangeDate('startDate', 'day', value)}
          endDate={endDate}
          onChangeEndDateYear={value => this.handleChangeDate('endDate', 'year', value)}
          onChangeEndDateMonth={value => this.handleChangeDate('endDate', 'month', value)}
          onChangeEndDateDay={value => this.handleChangeDate('endDate', 'day', value)}
          packageContents={packageContents}
          onChangePackageContents={value => this.handleChangeUI('packageContents', value)}
          notes={notes}
          onChangeNotes={value => this.handleChangeUI('notes', value)}
          buttonRequestDisabled={!this.validate()}
        />
      </Fragment>
    );
  };

  setStateOverTopView = (isOverTopView, isBottom) => {
    if (this._isMounted) {
      this.setState({ isOverTopView, isBottom });
    }
  };

  scrollTop = () => {
    const isWebKit = this.browser ? this.browser.isWebKit : false;
    let tgt;

    if ('scrollingElement' in document) {
      tgt = document.scrollingElement;
    } else if (isWebKit) {
      tgt = document.body;
    } else {
      tgt = document.documentElement;
    }
    const scrollTop = (tgt && tgt.scrollTop) || 0;
    return Math.max(window.pageYOffset, scrollTop);
  };

  watchCurrentPosition() {
    if (window.parent.screen.width > 768) {
      const positionScroll = this.scrollTop();
      this.setStateOverTopView(false, false);

      if (positionScroll > 485) {
        const { body } = window.document;
        const html = window.document.documentElement;

        const scrollTop = body.scrollTop || html.scrollTop;
        const scrollBottom = html.scrollHeight - html.clientHeight - scrollTop;

        if (scrollBottom > 450) {
          this.setStateOverTopView(true, false);
        } else {
          this.setStateOverTopView(true, true);
        }
      }
    }
  }

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'packageContents':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.PackageContents.Max) {
          errors.push(ErrorMessages.LengthMax('自己紹介', Validate.PackageContents.Max));
        }
        break;
      case 'notes':
        if (value.length > Validate.Notes.Max) {
          errors.push(ErrorMessages.LengthMax('自己紹介', Validate.Notes.Max));
        }
        break;

      case 'usage':
      case 'breadth':
        if (value.length === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        }
        break;

      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  getDateFormated = num => {
    return `0${num}`.slice(-2);
  };

  handleChangeDate = (type, propName, value) => {
    const { state } = this;

    state[type][propName] = value;

    const { error, startDate, endDate } = state;
    const errors = [];
    const todayDate = moment().format('YYYYMMDD');

    const startDateAll =
      startDate.year.toString() +
      this.getDateFormated(startDate.month.toString()) +
      this.getDateFormated(startDate.day.toString());

    const endDateAll =
      endDate.year.toString() +
      this.getDateFormated(endDate.month.toString()) +
      this.getDateFormated(endDate.day.toString());

    if (moment(startDateAll).isValid() && moment(endDateAll).isValid()) {
      if (moment(startDateAll).isBefore(moment(todayDate))) {
        errors.push(ErrorMessages.InvalidStartDate);
      }

      if (moment(startDateAll).isSameOrAfter(moment(endDateAll))) {
        errors.push(ErrorMessages.InvalidDateReverse);
      }
    } else {
      errors.push(ErrorMessages.InvalidDate);
    }

    state[type][propName] = value;
    error.desiredPeriod = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { usage, breadth, packageContents, notes, startDate, endDate } = this.state;
    const todayDate = moment().format('YYYYMMDD');

    const startDateAll =
      startDate.year.toString() +
      this.getDateFormated(startDate.month.toString()) +
      this.getDateFormated(startDate.day.toString());

    const endDateAll =
      endDate.year.toString() +
      this.getDateFormated(endDate.month.toString()) +
      this.getDateFormated(endDate.day.toString());

    return (
      usage &&
      breadth &&
      packageContents &&
      (packageContents === undefined
        ? false
        : packageContents.trim().length > 0 &&
          packageContents.trim().length <= Validate.PackageContents.Max) &&
      notes.trim().length <= Validate.Notes.Max &&
      moment(startDateAll).isValid() &&
      moment(endDateAll).isValid() &&
      !moment(startDateAll).isBefore(moment(todayDate)) &&
      !moment(startDateAll).isSameOrAfter(moment(endDateAll))
    );
  };

  render() {
    const { space } = this.props;
    return !space ? <LoadingPage /> : this.showLeftContent();
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  space: state.space.space,
  isLoading: state.space.isLoading,
  recommendSpaces: state.space.recommendSpaces,
  isRequesting: state.request.isLoading,
});

export default ContentPageMenu(connect(SpacePage, mapStateToProps), {
  bottomMarginOnlySP: true,
  maxWidth: 1440,
  noMargin: true,
});
