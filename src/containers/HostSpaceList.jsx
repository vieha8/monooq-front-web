import React, { Component } from 'react';
import Page from 'components/Page';
import HostSpaceList from 'components/HostSpaceList';
import Menu from 'containers/Menu';
import { authConnect } from "../components/Auth";
import {userActions} from "../redux/modules/user";

class HostSpaceListContainer extends Component {

  constructor(props){
    super(props);
    this.props.dispatch(userActions.fetchUserSpaces({userId: null}));
  }

  render() {
    return (
      <Page title="スペースの管理" subTitle="登録しているスペースの管理をします">
        <Menu />
        <HostSpaceList {...this.props} />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    spaces: state.user.spaces,
  };
};

export default authConnect(mapStateToProps)(HostSpaceListContainer);
