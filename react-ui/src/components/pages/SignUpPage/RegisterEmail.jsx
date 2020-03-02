import React, { Component, Fragment } from 'react';
import RegisterEmail from 'components/LV3/RegisterEmail';

export default class RegisterPage extends Component {
  render() {
    const { errorMessage, isRegistering } = this.props;
    return (
      <Fragment>
        <RegisterEmail
          isRegisterChecking={isRegistering}
          gaLabel="Signup Page"
          errorMessage={errorMessage}
        />
      </Fragment>
    );
  }
}
