// @flow

import React, { Component, Fragment } from 'react';
import numeral from 'numeral';
import Path from 'config/path';

import { userActions } from 'redux/modules/user';
import { spaceActions } from 'redux/modules/space';
import { uiActions } from 'redux/modules/ui';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import InlineText from 'components/atomic/LV1/InlineText';
import Footer from 'components/atomic/LV2/Footer';
import ManageSpaceList from 'components/atomic/LV3/ManageSpaceList';
import LoadingPage from 'components/atomic/LV3/LoadingPage';

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

  hostEntry: Function;
  hostEntry = () => {
    const { history } = this.props;
    history.push(Path.createSpaceInfo());
  };

  render() {
    const { isLoading, spaces } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <div>
        <MenuPageTemplate
          header={<Header />}
          headline="スペースの管理"
          caption="登録しているスペースの管理をします"
          leftContent={<ServiceMenu />}
          rightContent={
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
                  onClickEdit: () => this.onClickEdit(space),
                  onClickRemove: () => this.onClickRemove(space),
                }))}
                onClickHostEntry={this.hostEntry}
              />
            ) : (
              <Fragment>
                <InlineText.Base>スペースはありません。スペースを登録しましょう。</InlineText.Base>
                <ManageSpaceList spaces={[]} onClickHostEntry={this.hostEntry} />
              </Fragment>
            )
          }
          footer={<Footer />}
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

export default connect(SpaceManagementContainer, mapStateToProps);
