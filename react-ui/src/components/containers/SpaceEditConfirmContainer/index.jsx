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
import { breadths } from 'helpers/breadths';
import { spaceActions } from '../../../redux/modules/space';

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
      isUpdate: !!props.match.params.space_id,
      isOverTopView: false,
      isPriceTatami: false,
    };
  }

  componentDidMount() {
    const { space, dispatch, match } = this.props;
    switch (space.breadth) {
      case 1:
      case 2:
      case 3:
        this.setState({ isPriceTatami: true });
        break;
      default:
    }

    const { isUpdate } = this.state;

    const spaceId = match.params.space_id;
    if (isUpdate && !space.id) {
      dispatch(spaceActions.prepareUpdateSpace(spaceId));
    }

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

  onKeyDownButtonDraft = e => {
    if (iskeyDownEnter(e)) {
      this.onClickDraft();
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

    const nextPath = isUpdate ? Path.spaceEdit3(space.id) : Path.spaceCreate3();
    history.push(nextPath);
  };

  onClickDraft = () => {
    // TODO:【API連携】下書き処理
    console.log('onClickDraft');
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
    const { isPriceTatami, isUpdate, isOverTopView } = this.state;

    if (isLoading || !space.id) {
      return null;
    }

    if (isUpdate) {
      if (!space.id) {
        return <Redirect to={Path.spaceCreate1()} />;
      }
    } else if (space.images === undefined) {
      return <Redirect to={Path.spaceCreate1()} />;
    }

    if (!isLoading && isComplete) {
      if (isUpdate) {
        return <Redirect to={Path.spaceEditCompletion(space.id)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
    }

    let tagList = space.tags.map(v => v.name);
    if (space.tagList) {
      tagList = space.tagList
        .filter(value => {
          return value.isChecked === true;
        })
        .map(item => item.text)
        .concat(space.tagCustomList);
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
                loading={isLoading}
                onClick={this.onClickDraft}
                onKeyDown={this.onKeyDownButtonDraft}
              >
                下書き保存する
              </Button>
            </ConfirmMessageRight>
          </ConfirmMessageInner>
        </ConfirmMessage>
        <Spacer />
        <Detail
          isPriceTatami={isPriceTatami}
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
          statusAvailability={space.status}
          // TODO: 【API連携】パンくずリスト。町域を表示する。
          breadcrumbsList={[
            {
              text: space.addressPref,
            },
            {
              text: space.addressCity,
            },
            {
              text: space.addressTown,
            },
            {
              text: '下沼部',
            },
          ]}
          description={space.introduction}
          breadth={breadths[space.breadth - 1]}
          tagList={tagList}
          address={`${space.addressPref}${space.addressCity}${space.addressTown}`}
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
          priceTatami={numeral(space.priceTatami).format('0,0')}
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
