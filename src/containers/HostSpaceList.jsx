import React, { Component } from 'react';
import Page from 'components/Page';
import HostSpaceList from 'components/HostSpaceList';
import Menu from 'containers/Menu';
import { authConnect } from 'components/Auth';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';
import Path from 'config/path';

class HostSpaceListContainer extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.fetchUserSpaces());
  }

  onClickEdit = (space) => {
    const { dispatch, history } = this.props;
    dispatch(spaceActions.setSpace({ space }));
    dispatch(uiActions.setUiState({ space: {} }));
    history.push(Path.editSpaceInfo(space.ID));
  };

  onClickDelete = (space) => {
    this.props.dispatch(spaceActions.deleteSpace({ space }));
  };

  render() {
    return (
      <Page title="スペースの管理" subTitle="登録しているスペースの管理をします">
        <Menu />
        <HostSpaceList
          {...this.props}
          onClickEdit={this.onClickEdit}
          onClickDelete={this.onClickDelete}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    spaces: state.user.spaces,
    isLoading: state.user.isLoading,
  };
};

export default authConnect(mapStateToProps)(HostSpaceListContainer);
