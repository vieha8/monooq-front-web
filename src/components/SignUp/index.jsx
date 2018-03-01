import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import SignUpForm from './Form';
import AuthTelForm from './AuthTelForm';
import InputPinForm from './InputPinForm';
import ConfirmedForm from './ConfirmedForm';
import ProfileForm from './ProfileForm';
import RegisteredForm from './RegisteredForm';

const Container = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${Colors.yellow};
`;

export default class SignUp extends Component {
  componentDidMount() {
    document.body.style.background = Colors.yellow;
  }

  componentWillUnmount() {
    document.body.style.background = Colors.white;
  }

  render() {
    const { step } = this.props;
    const Form = (() => {
      switch (step) {
        case 0:
          return SignUpForm;
        case 1:
          return AuthTelForm;
        case 2:
          return InputPinForm;
        case 3:
          return ConfirmedForm;
        case 4:
          return ProfileForm;
        case 5:
          return RegisteredForm;
        default:
          return null;
      }
    })();

    return (
      <Container>
        <Form
          {...this.props}
        />
      </Container>
    );
  }
}
