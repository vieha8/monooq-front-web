// @flow

import React, { Component } from 'react';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import numeral from 'numeral';
import Path from 'config/path';

import { userActions } from 'redux/modules/user';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';

import SpaceManageList from 'components/LV3/SpaceManageList';
import LoadingPage from 'components/LV3/LoadingPage';
import SpaceDataNone from 'components/LV3/SpaceDataNone';

import authRequired from 'components/containers/AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  spaces: Array<{
    id: number,
    user: {
      id: number,
      firebaseUid: string,
      imageUrl: string,
      name: string,
      profile: string,
    },
    addressPref: string,
    addressCity: string,
    addressTown: string,
    title: string,
    images: Array<{
      imageUrl: string,
    }>,
    introduction: string,
    type: number,
    isFurniture: boolean,
    about: string,
    receiptAbout: string,
    priceFull: number,
    priceHalf: number,
    priceQuarter: number,
    location: {
      lat: number,
      lng: number,
    },
    status: string,
  }>,
  isLoading: boolean,
};

class SpaceManagementContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    dispatch(userActions.fetchUserSpaces());
  }

  onClickEdit = space => {
    const { dispatch, history } = this.props;
    dispatch(uiActions.setUiState({ space }));
    history.push(Path.spaceEditInfo(space.id));
  };

  onClickRemove = space => {
    const { dispatch } = this.props;
    dispatch(spaceActions.deleteSpace({ space }));
  };

  render() {
    const { isLoading, spaces, history } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    if (Array.isArray(spaces) && spaces.length === 0) {
      return (
        <SpaceDataNone
          captionHead="登録したスペースがありません"
          caption="スペースの登録がありません。以下のボタンからスペースを登録して荷物を預る準備をしましょう。"
          buttonText="スペースを登録する"
          onClick={() => history.push(Path.createSpaceInfo())}
        />
      );
    }

    return (
      <SpaceManageList
        spaces={spaces.map(space => ({
          image: {
            src: (space.images[0] || {}).imageUrl,
            alt: '',
          },
          address: `${space.address}`,
          content: space.title,
          furniture: space.isFurniture,
          prices: [
            numeral(space.priceFull).format('0,0'),
            numeral(space.priceHalf).format('0,0'),
            numeral(space.priceQuarter).format('0,0'),
          ],
          link: Path.space(space.id),
          status: space.status,
          onClickEdit: () => this.onClickEdit(space),
          onClickRemove: () => this.onClickRemove(space),
        }))}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  spaces: state.user.spaces,
  isLoading: state.user.isLoading,
});

export default authRequired(
  ContentPageMenu(
    connect(
      SpaceManagementContainer,
      mapStateToProps,
    ),
    {
      headline: 'スペースの管理',
    },
  ),
);
