import React, { Component } from 'react';
import { authConnect } from "../components/Auth";
import Profile from 'components/Profile/Profile';
import { Colors } from 'variables';
import { userActions } from "../redux/modules/user";

class ProfileContainer extends Component {
  componentDidMount = () => {
    document.body.style.background = Colors.lightGray1Bg;
  };

  constructor(props){
    super(props);
    const userId = this.props.match.params.user_id;
    this.props.dispatch(userActions.fetchUser({userId}));
    //TODO スペース情報も取得する
  }

  render() {
    return (
      <Profile
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  spaces: []
});

export default authConnect(mapStateToProps)(ProfileContainer);
