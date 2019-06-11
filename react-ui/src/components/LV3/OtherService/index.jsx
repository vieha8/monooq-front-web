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
  ${media.phone`
    text-align: center;
  `};
`;

const PickGoSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  color: ${Colors.darkGray1};
  text-align: center;
  display: inline-block;
  margin: auto;
  ${media.phone`
    margin: ${Dimens.medium2}px auto;
    position: relative;
    width: 84vw;
  `};
`;

const CampanyRelation = styled.p`
  font-size: 4px;
`;

const OtherServiceExplain = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
  margin-left: 30%;
  ${media.phone`
    width: 84vw;
    margin-left: 0;
  `};
`;

const LinkToPickGo = styled.a`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.medium * 2}px;
  color: ${Colors.black};
  text-decoration: underline;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const CatchPhraseOtherService = styled(CatchPhrase)`
  text-align: center;
  height: 50px;
`;

const SubCatchPhrasePickGo = styled(SubCatchPhrase)`
  margin-bottom: ${Dimens.medium_20}px;
`;

type PropTypes = {
  catchPhraseOtherService: React.Element<*>,
  serviceUrl: string,
  serviceImage: React.Element<*>,
  description?: React.Element<*>,
  serviceName: string,
  subDescription: React.Element<*>,
  campanyRelation: React.Element<*>,
  otherServiceExplain: React.Element<*>,
  campanyRelation: React.Element<*>,
};

export default ({
  catchPhraseOtherService,
  serviceUrl,
  serviceImage,
  description,
  serviceName,
  subDescription,
}: PropTypes) => (
  <PickGoContainer>
    <PickGoWrapper>
      <CampanyRelation />
      <PickGoSection>
        <LinkToPickGo component={Link} href={serviceUrl} target="_blank" rel="noopener noreferrer">
          {serviceImage}
        </LinkToPickGo>
        {description}
      </PickGoSection>
      <OtherServiceExplain>
        <CatchPhraseOtherService>{catchPhraseOtherService}</CatchPhraseOtherService>
        <SubCatchPhrasePickGo>
          <LinkToPickGo
            component={Link}
            href={serviceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {serviceName}
            {subDescription}
          </LinkToPickGo>
        </SubCatchPhrasePickGo>
      </OtherServiceExplain>
    </PickGoWrapper>
  </PickGoContainer>
);
