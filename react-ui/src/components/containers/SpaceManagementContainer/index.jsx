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

class SpaceManagementContainer extends Component {
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

    if (!Array.isArray(spaces)) {
      return (
        <SpaceDataNone
          captionHead="スペース情報の取得に失敗しました。"
          caption="画面を再読み込みするか、時間をおいてから再度アクセスをお願いいたします。"
          buttonText="画面を再読み込みする"
          onClick={() => window.location.reload()}
        />
      );
    }

    if (spaces.length === 0) {
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
            numeral(space.priceTatami).format('0,0'),
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
  ContentPageMenu(connect(SpaceManagementContainer, mapStateToProps), {
    headline: 'スペースの管理',
  }),
);
