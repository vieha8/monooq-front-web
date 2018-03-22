import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';

const Container = styled.div`
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
    const {
      step,
      registerEmail,
      authTelForm,
      inputPinForm,
      confirmedForm,
      profileForm,
      registeredForm,
    } = this.props;

    const forms = [
      registerEmail,
      authTelForm,
      inputPinForm,
      confirmedForm,
      profileForm,
      registeredForm,
    ];
    const form = forms[step];

    return (
      <Container>
        {form}
      </Container>
    );
  }
}
