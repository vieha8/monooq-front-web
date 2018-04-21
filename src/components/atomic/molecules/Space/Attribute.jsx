// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  display: table;
  width: 100%;
  min-height: 20px;
  padding: ${Dimens.medium}px 0;
  &:not(:first-child) {
    border-top: 1px solid ${Colors.borderGray};
  }
  &::after {
    clear: both;
    content: '';
    display: block;
  }

  ${media.phone`
    display: block;
  `};
`;

const TitleCell = styled.span`
  display: table-cell;
  width: 100px;
  vertical-align: middle;
  text-align: left;

  ${media.phone`
    display: block;
    width: 100%;
  `};
`;

const ContentContainer = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-left: ${Dimens.medium2}px;
  ${media.phone`
    display: block;
    padding-left: 0;
    margin-top: ${Dimens.small}px;
  `};
`;

type PropTypes = {
  title: string,
  headContent?: React.Element<*>,
  content: React.Element<*>,
};

export default (props: PropTypes) => (
  <Container>
    <TitleCell>
      {props.headContent ? props.headContent : <InlineText.Base>{props.title}</InlineText.Base>}
    </TitleCell>
    <ContentContainer>{props.content}</ContentContainer>
  </Container>
);
