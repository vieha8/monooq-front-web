import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import Form from './Form';

const Container = styled.div`
  background: ${Colors.yellow};
  margin-top: -60px;
  padding: 80px 0;
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
