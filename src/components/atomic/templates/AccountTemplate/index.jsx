// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';

const Page = styled.div`
  padding: 80px 0;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Container = styled.div`
  width: 420px;
  margin: 0 auto;

  background: ${Colors.white};
  padding: ${Dimens.medium3}px;
  border-radius: 6px;

  ${media.tablet`
    width: 320px;
    padding: ${Dimens.medium}px;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  form: React.Element<*>,
};

export default class AccountTemplate extends Component {
  componentDidMount() {
    this.prevBg = document.body.style.background;
    document.body.style.background = Colors.yellow;
  }

  componentWillUnmount() {
    document.body.style.background = this.prevBg;
  }

  render() {
    return (
      <Page>
        <HeaderContainer>{this.props.header}</HeaderContainer>
        <Container>{this.props.form}</Container>
      </Page>
    );
  }
}
