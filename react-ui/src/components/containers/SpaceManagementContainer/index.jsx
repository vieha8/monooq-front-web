// @flow

import React, { Component } from 'react';
import numeral from 'numeral';
import Path from 'config/path';

import { userActions } from 'redux/modules/user';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';

import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Header from 'components/containers/Header';
import ManageSpaceList from 'components/LV3/ManageSpaceList';
import LoadingPage from 'components/LV3/LoadingPage';
import NoDataView from 'components/LV3/NoDataView';

import type { SpaceType } from 'types/Space';

import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  spaces: Array<SpaceType>,
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
    history.push(Path.editSpaceInfo(space.id));
  };

  onClickRemove = space => {
    const { dispatch } = this.props;
    dispatch(spaceActions.deleteSpace({ space }));
  };

  render() {
    const { isLoading, spaces, history } = this.props;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="スペースの管理"
        leftContent={
          isLoading ? (
            <LoadingPage />
          ) : Array.isArray(spaces) && spaces.length > 0 ? (
            <ManageSpaceList
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
          ) : (
            <NoDataView
              captionHead="登録したスペースがありません"
              caption="スペースの登録がありません。以下のボタンからスペースを登録して荷物を預る準備をしましょう。"
              buttonText="スペースを登録する"
              onClick={() => history.push(Path.createSpaceInfo())}
            />
          )
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    spaces: state.user.spaces,
    isLoading: state.user.isLoading,
  };
}

export default connect(
  SpaceManagementContainer,
  mapStateToProps,
);
