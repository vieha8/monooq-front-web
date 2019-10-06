// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import ContainerDefault from 'components/LV1/ContainerDefault';
import Text from 'components/LV1/Texts/TextStatic';

const StyledContainer = styled(ContainerDefault)`
  margin-bottom: ${Dimens.large_60}px;
  ${media.tablet`
    margin-bottom: ${Dimens.medium3_40}px;
    padding: 0px;
  `};
`;

const Art = styled.div`
  font-size: ${FontSizes.medium1}px;
  line-height: ${FontSizes.medium1 * 1.5}px;
  margin-bottom: ${Dimens.small2}px;
  ${media.tablet`
    font-size: ${FontSizes.medium1}px;
    line-height: normal;
    margin-bottom: ${Dimens.small}px;
  `};
`;

const Para = styled(Text)`
  text-align: ${props => (props.isRight ? 'right' : 'left')};
`;

export type PropTypes = {
  title?: string,
  paraList: Array<{
    text?: string,
    customText?: React.Element<*>,
  }>,
  isRight?: boolean,
};

export default ({ title, paraList, isRight }: PropTypes) => (
  <StyledContainer>
    <Art>{title}</Art>
    <Para isRight={isRight}>
      {paraList.map((item, i) => (
        <Fragment key={i.toString()}>
          {i !== 0 && <br />}
          {item.text}
          {item.customText}
        </Fragment>
      ))}
    </Para>
  </StyledContainer>
);
