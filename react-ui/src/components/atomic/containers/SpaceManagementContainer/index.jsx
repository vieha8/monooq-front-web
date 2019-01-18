// @flow

import React, { Component } from 'react';
import numeral from 'numeral';
import Path from 'config/path';

import { userActions } from 'redux/modules/user';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import ManageSpaceList from 'components/atomic/LV3/ManageSpaceList';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import NoDataView from 'components/atomic/LV3/NoDataView';

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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickEdit: Function;
  onClickEdit = space => {
    const { dispatch, history } = this.props;
    dispatch(spaceActions.setSpace({ space }));
    dispatch(uiActions.setUiState({ space }));
    history.push(Path.editSpaceInfo(space.ID));
  };

  onClickRemove: Function;
  onClickRemove = space => {
    const { dispatch } = this.props;
    dispatch(spaceActions.deleteSpace({ space }));
  };

  render() {
    const { isLoading, spaces, history } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <div>
        <MenuPageTemplate
          header={<Header />}
          headline="スペースの管理"
          leftContent={
            Array.isArray(spaces) && spaces.length > 0 ? (
              <ManageSpaceList
                spaces={spaces.map(space => ({
                  image: {
                    src: (space.Images[0] || {}).ImageUrl,
                    alt: '',
                  },
                  address: `${space.Address}`,
                  content: space.Title,
                  furniture: space.IsFurniture,
                  prices: [
                    numeral(space.PriceFull).format('0,0'),
                    numeral(space.PriceHalf).format('0,0'),
                    numeral(space.PriceQuarter).format('0,0'),
                  ],
                  link: Path.space(space.ID),
                  status: space.Status,
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
      </div>
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
