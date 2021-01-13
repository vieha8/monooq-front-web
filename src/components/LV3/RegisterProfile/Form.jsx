import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import ErrorList from 'components/LV2/Lists/ErrorList';

const SectionWrap = styled.div`
  margin-top: ${props => (props.noMarginTop ? 0 : Dimens.medium)}px;
  ${media.phone`
    margin-bottom: ${props => (props.marginBottomSp ? props.marginBottomSp : 0)}px;
  `};
`;

const Button = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: ${Dimens.medium}px;
    border-top: 1px solid ${Colors.borderGray};
    background-color: rgba(255, 255, 255, 1);
  `};
`;

export default ({ errors, image, name, phoneNumber, prefCode, buttonPurpose, button }) => (
  <Fragment>
    <SectionWrap noMarginTop>
      {image}
      <ErrorList keyName="image_errors" errors={errors.image} />
    </SectionWrap>
    <SectionWrap>
      {name}
      <ErrorList keyName="name_errors" errors={errors.name} />
    </SectionWrap>
    <SectionWrap>
      {phoneNumber}
      <ErrorList keyName="name_errors" errors={errors.phoneNumber} />
    </SectionWrap>
    <SectionWrap>
      {prefCode}
      <ErrorList keyName="prefCode_errors" errors={errors.prefCode} />
    </SectionWrap>
    <SectionWrap marginBottomSp={100}>{buttonPurpose}</SectionWrap>
    <Button>{button}</Button>
  </Fragment>
);
