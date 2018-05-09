// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Attribute from './Attribute';

const Container = styled.div`
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `};
`;

const IconWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.i`
  font-size: ${FontSizes.medium2}px;
`;

const Column = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-left: ${Dimens.small}px;
`;

type PropTypes = {
  delivery: boolean,
  meeting: boolean,
};

export default (props: PropTypes) => (
  <Attribute
    title="受取り方法"
    content={
      <Container>
        {props.delivery && (
          <div>
            <IconWrapper>
              <Icon className="fal fa-truck" />
            </IconWrapper>
            <Column>
              <InlineText.Base>配送</InlineText.Base>
            </Column>
            <Column>
              <InlineText.EmphasisTiny>Pickgo・ヤマト運輸など配送サービス</InlineText.EmphasisTiny>
            </Column>
          </div>
        )}
        {props.meeting && (
          <div>
            <IconWrapper>
              <Icon className="fal fa-users" />
            </IconWrapper>
            <Column>
              <InlineText.Base>対面</InlineText.Base>
            </Column>
            <Column>
              <InlineText.EmphasisTiny>直接本人から荷物を受け取ります</InlineText.EmphasisTiny>
            </Column>
          </div>
        )}
      </Container>
    }
  />
);
