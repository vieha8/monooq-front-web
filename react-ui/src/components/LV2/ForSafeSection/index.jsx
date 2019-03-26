// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import Button from 'components/atomic/LV1/Button';

const StyledContainer = styled.div`
  width: 32%;
  ${media.phone`
    width: 100%;
    margin-bottom: ${Dimens.medium2}px;
  `};
`;

const StyledTitle = styled.div`
  height: ${Dimens.large_60}px;
  margin-bottom: ${Dimens.medium_20}px;
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  height: 54%;
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
  margin-bottom: ${Dimens.medium2}px;
  ${media.phone`
    height: auto;
  `};
`;

const TitleIcon = styled.span`
  margin-right: ${Dimens.medium_20}px;
  font-size: ${FontSizes.custom2large}px;
`;

const CircleIcon = styled.i`
  && {
    color: ${Colors.brandPrimary};
  }
`;

const InnerIcon = styled.i`
  && {
    color: ${Colors.white};
  }
`;

const TitleText = styled.span`
  font-size: ${FontSizes.medium1}px;
`;

type PropTypes = {
  iconClass: string,
  title: string,
  description: string,
  buttonText: string,
  onClick: Function,
};

export default ({ iconClass, title, description, buttonText, onClick }: PropTypes) => (
  <StyledContainer>
    <StyledTitle>
      <TitleIcon className="fa-layers fa-fw">
        <CircleIcon className="fas fa-circle" />
        <InnerIcon className={iconClass} data-fa-transform="shrink-6" />
      </TitleIcon>
      <TitleText>{title}</TitleText>
    </StyledTitle>
    <Description>{description}</Description>
    <Button secondary center fontbold borderbold onClick={onClick}>
      {buttonText}
    </Button>
  </StyledContainer>
);
