import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Path from 'config/path';
import { Colors, Dimens, ZIndexes } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { spaceActions } from 'redux/modules/space';
import BaseTemplate from 'components/templates/BaseTemplate';
import { withAuthRequire, withHandleBeforeUnload } from 'components/hooks';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import Detail from 'components/LV3/Space/Detail';

const dummySpaceImage =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-dummy-space.png?alt=dummy&auto=format&auto=compress';

const EntryButtonWrap = styled.div`
  width: 100%;
  max-width: 100%;
  display: block;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.frontPartsOverFooter};
  text-align: center;
  padding: ${Dimens.medium}px;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
`;

class SpaceEditConfirmPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: !!props.match.params.space_id,
      isOverTopView: false,
      isBottom: false,
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
    if (window.parent.screen.width > 768 && this._isMounted) {
      const positionScroll = this.scrollTop();
      this.setState({
        isOverTopView: positionScroll > 485,
        isBottom: positionScroll > 2036,
      });
    }
  }

  render() {
    const { space, isLoading, isComplete } = this.props;
    const { isUpdate, isOverTopView, isBottom } = this.state;

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
      <BaseTemplate maxWidth={1440} noMargin>
        <Detail
          loading={isLoading}
          confirm
          space={space}
          images={space.images.map(image => ({
            original: image.imageUrl || image.tmpUrl || image.preview || dummySpaceImage,
            thumbnail: image.imageUrl || image.tmpUrl || image.preview || dummySpaceImage,
          }))}
          tagList={tagList}
          loginUser={user}
          user={{
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
            profile: user.profile,
            prefCode: user.prefCode,
          }}
          isOverTopView={isOverTopView}
          isBottom={isBottom}
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
      </BaseTemplate>
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

export default withAuthRequire(
  withHandleBeforeUnload(connect(mapStateToProps)(SpaceEditConfirmPage)),
);
