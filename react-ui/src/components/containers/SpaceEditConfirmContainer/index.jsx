import React, { Component, Fragment } from 'react';
import numeral from 'numeral';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import SpaceMap from 'components/LV1/SpaceMap';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import Detail from 'components/LV3/Space/Detail';
import { Height as HeaderHeight, HeightPhone as HeaderHeightPhone } from 'components/LV3/Header';

import styled from 'styled-components';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import dummySpaceImage from 'images/dummy_space.png';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';
import { formatRemoveComma } from '../../../helpers/string';

const SPACE_TYPES = ['', 'クローゼット・押入れ', '', '部屋', '屋外倉庫', 'その他'];
const ReceiptType = {
  Both: 1,
  Meeting: 2,
  Delivery: 3,
};

const ConfirmMessage = styled.div`
  width: 100%;
  height: 86px;
  display: block;
  position: fixed;
  left: 0px;
  top: ${HeaderHeight}px;
  z-index: ${ZIndexes.frontParts};
  text-align: left;
  padding: ${Dimens.medium_17}px;
  line-height: normal;
  font-size: ${FontSizes.medium_18}px;
  color: ${Colors.white};
  background-color: ${Colors.green};
  ${media.tablet`
    top: ${HeaderHeightPhone}px;
    height: 76px;
    padding: ${Dimens.small2_14}px ${Dimens.medium}px;
  `};
`;

const ConfirmMessageInner = styled.div`
  max-width: 1022px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const ConfirmMessageLeft = styled.div`
  width: 100%;
  max-width: 400px;
  ${media.tablet`
    margin-right: ${Dimens.small_10}px;
  `};
`;

const OnlyPcTab = styled.div`
  display: block;
  ${media.tablet`
    display: none;
  `};
`;

const BrOnlySP = styled.br`
  display: none;
  ${media.phone`
    display: block;
  `};
`;

const ConfirmMessageRight = styled.div`
  width: 100%;
  max-width: 320px;
  ${media.tablet`
    max-width: 240px;
  `};
  ${media.phone`
    max-width: 140px;
  `};
  ${media.phoneSmall`
    max-width: 130px;
  `};
`;

const EntryButtonWrap = styled.div`
  width: 100%;
  max-width: 100%;
  display: block;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.frontParts};
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
`;

const Spacer = styled.div`
  margin: ${Dimens.huge_86}px auto 0;
  ${media.tablet`
    margin: ${Dimens.large3_76}px auto 0;
  `};
`;

class SpaceEditConfirmContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      isOverTopView: false,
    };

    const spaceId = props.match.params.space_id;

    if (spaceId) {
      this.state.isUpdate = true;
    }
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  onKeyDownButtonNext = e => {
    if (iskeyDownEnter(e)) {
      this.onClickNext();
    }
  };

  onKeyDownButtonBack = e => {
    if (iskeyDownEnter(e)) {
      this.onClickBack();
    }
  };

  onClickNext = () => {
    const { dispatch, space, user } = this.props;
    const { isUpdate } = this.state;

    const saveSpace = Object.assign(space);

    if (isUpdate) {
      dispatch(
        spaceActions.updateSpace({
          spaceId: space.id,
          body: {
            userId: user.id,
            ...saveSpace,
          },
        }),
      );
    } else {
      dispatch(spaceActions.createSpace({ body: { userId: user.id, ...saveSpace } }));
    }
  };

  onClickBack = () => {
    const { history, space } = this.props;
    const { isUpdate } = this.state;

    const nextPath = isUpdate ? Path.spaceEditPrice(space.id) : Path.createSpacePrice();
    history.push(nextPath);
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
      if (this._isMounted) {
        this.setState({ isOverTopView: false });
      }
      if (positionScroll > 485) {
        if (this._isMounted) {
          this.setState({ isOverTopView: true });
        }
      }
    }
  }

  render() {
    const { space, isLoading, isComplete } = this.props;
    const { isUpdate, isOverTopView } = this.state;

    if (isUpdate) {
      if (!space.id) {
        return <Redirect to={Path.createSpaceInfo()} />;
      }
    } else if (space.images === undefined) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    if (!isLoading && isComplete) {
      if (isUpdate) {
        return <Redirect to={Path.spaceEditCompletion(space.id)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
    }

    const { user } = this.props;
    return (
      <Fragment>
        <ConfirmMessage>
          <ConfirmMessageInner>
            <ConfirmMessageLeft>
              <OnlyPcTab>
                <InlineText.Base color={Colors.white} fontSize={FontSizes.small} bold>
                  まだ登録が終わっていませんか？
                </InlineText.Base>
                <br />
              </OnlyPcTab>
              <InlineText.Base
                color={Colors.white}
                fontSize={FontSizes.small}
                fontSizeSp={FontSizes.xsmall_10}
              >
                まだ登録が終わってない場合は
                <BrOnlySP />
                下書き状態で保存ができます。
              </InlineText.Base>
            </ConfirmMessageLeft>
            <ConfirmMessageRight>
              <Button
                senary
                fontbold
                fill={1}
                // loading={loading}
                // onClick={onClick}
                // disabled={disabled}
                // onKeyDown={onKeyDown}
              >
                下書き保存する
              </Button>
            </ConfirmMessageRight>
          </ConfirmMessageInner>
        </ConfirmMessage>
        <Spacer />
        <Detail
          confirm
          isOverTopView={isOverTopView}
          id={space.id}
          map={<SpaceMap lat={space.lat} lng={space.lng} />}
          pref={space.addressPref}
          city={space.addressCity}
          town={space.addressTown}
          name={space.title}
          images={space.images.map(image => ({
            original: image.imageUrl || image.tmpUrl || image.preview || dummySpaceImage,
            thumbnail: image.imageUrl || image.tmpUrl || image.preview || dummySpaceImage,
          }))}
          // TODO: 【API連携】ステータス(1:満室,2:要相談,これ以外:空室)
          statusAvailability={0}
          // TODO: 【API連携】パンくずリスト
          breadcrumbsList={[
            {
              text: '神奈川県',
            },
            {
              text: '川崎市',
            },
            {
              text: '中原区',
            },
            {
              text: '下沼部',
            },
          ]}
          description={space.introduction}
          // TODO: 【API連携】スペースの広さ
          breadth="4畳以上12畳未満"
          // TODO:【API連携】タグ
          tagList={[
            '4畳以上',
            '1階',
            'ダンボール1箱〜',
            '4畳以上4畳以上4畳以上',
            '1階1階',
            'ダンボール1箱〜ダンボール1箱〜ダンボール1箱〜',
            '4畳以上',
            '1階',
            'ダンボール1箱〜',
          ]}
          address={`${space.addressPref}${space.addressCity}${space.addressTown}`}
          // type={SPACE_TYPES[space.type]}
          addressMethod={space.about}
          delivery={
            space.receiptType === ReceiptType.Both || space.receiptType === ReceiptType.Delivery
          }
          meeting={
            space.receiptType === ReceiptType.Both || space.receiptType === ReceiptType.Meeting
          }
          supplement={space.receiptAbout}
          user={{
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
            profile: user.profile,
          }}
          priceFull={numeral(space.priceFull).format('0,0')}
          // TODO: 【API連携】現状固定値なので、API連携する
          priceTatami={numeral(3123).format('0,0')}
        />
        <EntryButtonWrap>
          <ButtonEntry
            enabled
            relative
            loading={isLoading}
            backButton={{
              text: '戻って修正する',
              onClick: this.onClickBack,
              onKeyDown: this.onKeyDownButtonBack,
            }}
            enabledButton={{
              text: `登録する`,
              onClick: this.onClickNext,
              onKeyDown: this.onKeyDownButtonNext,
            }}
          />
        </EntryButtonWrap>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isComplete: state.space.isComplete,
  user: state.auth.user,
  space: state.ui.space || {},
  isLoading: state.space.isLoading,
  geocode: state.space.geocode,
});

export default authRequired(
  handleBeforeUnload(
    ContentPageMenu(connect(mapStateToProps)(SpaceEditConfirmContainer), {
      noFooter: true,
      maxWidth: 1440,
      noMargin: true,
    }),
  ),
);
