// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import DefaultContainer from 'components/atomic/LV1/DefaultContainer';
import Text from 'components/atomic/LV1/StaticText';

const StyledContainer = styled(DefaultContainer)`
  margin-bottom: ${Dimens.large_60}px;
  ${media.phone`
    margin-bottom: ${Dimens.medium3_40}px;
  `};
`;

const Art = styled.div`
  font-size: ${FontSizes.medium1}px;
  line-height: ${FontSizes.medium1 * 1.5}px;
  margin-bottom: ${Dimens.medium2}px;
  ${media.phone`
    font-size: 6vw;
    line-height: ${6 * 1.5}vw;
    margin-bottom: 20px;
  `};
`;

const Para = styled(Text)`
  text-align: ${props => (props.isRight ? 'right' : 'left')};
`;

const ParaText = props => (
  <Fragment>
    {props.text}
    {props.customText}
  </Fragment>
);

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
      {paraList.map((item, i) =>
        i !== 0 ? (
          <Fragment key={i.toString()}>
            <br />
            <ParaText {...item} />
          </Fragment>
        ) : (
          <Fragment key={i.toString()}>
            <ParaText {...item} />
          </Fragment>
        ),
      )}
    </Para>
  </StyledContainer>
);
