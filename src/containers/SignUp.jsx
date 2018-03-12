import React from 'react';
import {connect} from 'react-redux';
import path from '../config/path';

import SignUp from 'components/SignUp';

class SignUpContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  onClickSignUpEmail = () => {
    this.setState({step: 4});
  };

  onClickRegisterProfile = () => {
    this.setState({step: 5});
  };

  onClickGuest = () => {
    this.props.history.push(`${path.search()}?location=東京都`);
  };

  onClickHost = () => {
    this.props.history.push(`${path.createSpaceInfo()}`);
  };

  render() {
    return (
      <SignUp
        step={this.state.step}
        onClickSignUpEmail={this.onClickSignUpEmail}
        onClickRegisterProfile={this.onClickRegisterProfile}
        onClickGuest={this.onClickGuest}
        onClickHost={this.onClickHost}
      />
    );
  }
}

export default connect()(SignUpContainer);
