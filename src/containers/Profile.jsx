import React, { Component } from 'react';
import { authConnect } from "../components/Auth";
import Profile from 'components/Profile/Profile';
import { Colors } from 'variables';

class ProfileContainer extends Component {
  componentDidMount = () => {
    document.body.style.background = Colors.lightGray1Bg;
  };

  render() {
    return (
      <Profile
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user, //TODO 本来はGET /users/{userId} のAPI叩く
});

export default authConnect(mapStateToProps)(ProfileContainer);
