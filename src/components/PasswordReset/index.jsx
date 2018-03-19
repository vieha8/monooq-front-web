import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import Form from './Form';

const Container = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${Colors.yellow};
`;

export default class PasswordReset extends Component {
  componentDidMount() {
    document.body.style.background = Colors.yellow;
  }

  componentWillUnmount() {
    document.body.style.background = Colors.white;
  }

  render() {
    return (
      <Container>
        <Form
          {...this.props}
        />
      </Container>
    );
  }
}
