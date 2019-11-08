import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import Text from 'components/LV1/Texts/TextStatic';

const ContentContainer = styled.div`
  width: 100%;
  padding: ${Dimens.medium_20}px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: ${FontSizes.small_15}px;
  border-bottom: 1px solid #dbdbdb;
  ${media.phone`
    padding: ${Dimens.medium_20}px 0 ${Dimens.xsmall}px;
  `};
`;

const Header = styled(Text)`
  width: 25%;
  font-weight: bold;
  margin-right: ${Dimens.medium_20}px;
  ${media.phone`
    width: 100%;
  `};
`;

const Data = styled(Text)`
  width: calc(75% - ${Dimens.medium_20}px);
  ${media.phone`
    width: 100%;
    line-height: ${Dimens.medium2}px;
  `};
`;

export default ({ asctList }) => (
  <Fragment>
    {asctList.map((item, i) => (
      <ContentContainer key={i.toString()}>
        <Header>{item.header}</Header>
        <Data>{item.data}</Data>
      </ContentContainer>
    ))}
  </Fragment>
);
