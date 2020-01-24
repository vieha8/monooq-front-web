import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { H1 } from 'components/LV1/Texts/Headline';

const Page = styled.div`
  padding: 85px 0;
  ${media.phone`
    padding: 54px 0;
  `};
`;

const Spacer = styled.div`
  margin-top: 54px;
  ${media.tablet`
    margin-top: 24px;
  `};
  ${media.phone`
    margin-top: 54px;
  `};
`;

const Title = styled(H1)`
  padding: ${Dimens.medium_20}px 0px;
  text-align: center;
  ${media.phone`
    font-size: ${FontSizes.medium_18}px;
    border-bottom: 1px solid ${Colors.borderGray};
  `};
`;

const Header = styled.div`
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
  ${media.phone`
    width: 100%;
    padding: ${Dimens.medium}px;
    border: none;
  `};
`;

export default class AccountTemplate extends Component {
  render() {
    const { errorHeader, title, stories, header, form } = this.props;
    return (
      <Page>
        {errorHeader && <Spacer />}
        <Title bold>{title}</Title>
        <Header stories={stories}>{header}</Header>
        <Container>{form}</Container>
      </Page>
    );
  }
}
