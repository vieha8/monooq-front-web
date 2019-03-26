// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import StyledDefaultContainer from 'components/LV1/DefaultContainer/StyledDefaultContainer';
import CatchPhrase from 'components/LV1/CatchPhrase';
import SubCatchPhrase from 'components/LV1/SubCatchPhrase';

const PickGoContainer = styled(StyledDefaultContainer)`
  display: flex;
  color: ${Colors.white};
`;

const PickGoWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PickGoSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 294px;
  color: ${Colors.darkGray1};
  text-align: center;
  margin-left: 181px;
  margin-top: 87px;
  ${media.phone`
    margin: ${Dimens.medium2}px auto;
    position: relative;
    width: 84vw;
  `};
`;

const LinkToPickGo = styled.a`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.medium * 2}px;
  color: ${Colors.white};
  text-decoration: underline;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const SubCatchPhrasePickGo = styled(SubCatchPhrase)`
  margin-bottom: ${Dimens.medium_20}px;
`;

type PropTypes = {
  catchPhrase: React.Element<*>,
  serviceUrl: string,
  serviceImage: React.Element<*>,
  description?: React.Element<*>,
  serviceName: string,
  subDescription: React.Element<*>,
};

export default ({
  catchPhrase,
  serviceUrl,
  serviceImage,
  description,
  serviceName,
  subDescription,
}: PropTypes) => (
  <PickGoContainer>
    <PickGoWrapper>
      <CatchPhrase>{catchPhrase}</CatchPhrase>
      <PickGoSection>
        <LinkToPickGo component={Link} href={serviceUrl} target="_blank" rel="noopener noreferrer">
          {serviceImage}
        </LinkToPickGo>
        {description}
      </PickGoSection>
      <SubCatchPhrasePickGo>
        <LinkToPickGo component={Link} href={serviceUrl} target="_blank" rel="noopener noreferrer">
          {serviceName}
        </LinkToPickGo>
        {subDescription}
      </SubCatchPhrasePickGo>
    </PickGoWrapper>
  </PickGoContainer>
);
