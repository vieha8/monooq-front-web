import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import PageDefault from 'components/LV1/PageDefault';
import Text from 'components/LV1/Texts/TextStatic';

const StyledWrap = styled(PageDefault)`
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

export default ({ title, paraList, isRight }) => (
  <StyledWrap>
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
  </StyledWrap>
);
