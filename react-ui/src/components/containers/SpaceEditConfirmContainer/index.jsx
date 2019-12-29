import React, { Component, Fragment } from 'react';
import Path from 'config/path';
import { Redirect } from 'react-router-dom';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import SpaceMap from 'components/LV1/SpaceMap';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import Detail from 'components/LV3/Space/Detail';
import styled from 'styled-components';
import { Colors, Dimens, ZIndexes } from 'variables';
import dummySpaceImage from 'images/dummy_space.png';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from '../../../redux/modules/space';

const ReceiptType = {
  Both: 1,
  Delivery: 2,
  Meeting: 3,
};

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

class SpaceEditConfirmContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: !!props.match.params.space_id,
      isOverTopView: false,
    };
  }

  componentDidMount() {
    const { space, dispatch, match } = this.props;
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

  onClickNext = () => {
    const { dispatch, space, user } = this.props;
    const { isUpdate } = this.state;

    const saveSpace = Object.assign(space);
    if (space.tagList) {
      saveSpace.tags = space.tagList
        .filter(value => {
          return value.isChecked === true;
        })
        .map(item => item.text)
        .concat(space.tagCustomList);
    } else {
      saveSpace.tags = space.tags.map(v => v.name);
    }

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

    if (!isLoading && isUpdate && !space.id) {
      return null;
    }

    if (!isLoading && isComplete) {
      if (isUpdate) {
        return <Redirect to={Path.spaceEditCompletion(space.id)} />;
      }
      return <Redirect to={Path.createSpaceCompletion()} />;
    }

    let tagList;
    if (space.tagList) {
      tagList = space.tagList
        .filter(value => {
          return value.isChecked === true;
        })
        .map(item => item.text)
        .concat(space.tagCustomList);
    } else {
      tagList = space.tags.map(v => v.name);
    }

    const { user } = this.props;
    return (
      <Fragment>
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
          status={space.status}
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
          ]}
          description={space.introduction}
          sizeType={space.sizeType}
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
            prefCode: user.prefCode,
          }}
          priceFull={space.priceFull}
          priceTatami={space.priceTatami}
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
