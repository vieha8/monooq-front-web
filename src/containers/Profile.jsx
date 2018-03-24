import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from 'components/Profile/Profile';
import { Colors } from 'variables';
import { userActions } from 'redux/modules/user';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    const userId = this.props.match.params.user_id;
    this.props.dispatch(userActions.fetchUser({ userId }));
    this.props.dispatch(userActions.fetchUserSpaces({ userId }));
  }

  componentDidMount = () => {
    document.body.style.background = Colors.lightGray1Bg;
  }

  render() {
    if (!this.props.user) {
      return null;
    }
    return (
      <Profile
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  spaces: state.user.spaces,
});

export default connect(mapStateToProps)(ProfileContainer);
