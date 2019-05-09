// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, ZIndexes } from 'variables';

const Page = styled.div`
  padding: 128px 0;
  ${media.phone`
    padding: 60px 0;
  `};
`;

const HeaderContainer = styled.div`
  position: fixed;
  ${props =>
    props.stories &&
    `
    position: relative;
    margin: auto auto 80px;
  `} top: 0;
  left: 0;
  right: 0;
  z-index: ${ZIndexes.nav};
`;

const Container = styled.div`
  width: 480px;
  margin: 0 auto;

  background: ${Colors.white};
  padding: ${Dimens.medium2}px;
  border-radius: 3px;
  border: 1px solid ${Colors.lightGray1};
  ${props =>
    props.err &&
    `
    margin-top: ${Dimens.medium3_40}px;
  `};
  ${media.phone`
    width: 100%;
    padding: ${Dimens.medium}px;
    border: none;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  form: React.Element<*>,
  stories?: boolean,
};

export default class AccountTemplate extends Component<PropTypes> {
  componentDidMount() {
    this.prevBg = document.body.style.background;
    document.body.style.background = Colors.lightGray1Bg;
  }

  componentWillUnmount() {
    document.body.style.background = this.prevBg;
  }

  render() {
    return (
      <Page>
        <HeaderContainer stories={this.props.stories}>{this.props.header}</HeaderContainer>
        <Container err={this.props.err}>{this.props.form}</Container>
      </Page>
    );
  }
}
