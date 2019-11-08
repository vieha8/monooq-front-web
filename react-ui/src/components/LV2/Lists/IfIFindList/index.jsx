import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import Text from 'components/LV1/Texts/TextStatic';

const IfIFindContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 508px;
  margin-bottom: ${Dimens.medium_20}px;
  ${media.phone`
    width: 100%;
    flex-direction: column;
    align-items: center;
  `};
`;

const Oval = styled.div`
  height: 100px;
  width: 100px;
  border: 2px solid ${Colors.brandPrimary};
  border-radius: 50%;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  color: ${Colors.brandPrimary};
  padding: ${Dimens.medium2}px 0;
  margin-right: ${Dimens.medium_20}px;
  box-sizing: border-box;
  ${media.phone`
    margin: 0 0 ${Dimens.medium_20}px;
  `};
`;

const LabelNumber = styled.div`
  font-size: ${FontSizes.xsmall}px;
  font-weight: bold;
  margin-bottom: ${Dimens.small_10}px;
`;

const LabelText = styled.div`
  font-size: ${FontSizes.medium}px;
  font-weight: bold;
`;

const IfIFindContentText = styled(Text)`
  width: 70%;
  margin-right: ${Dimens.medium2}px;
  ${media.phone`
    width: 100%;
    margin-right: 0;
  `};
`;

export default ({ list }) => (
  <IfIFindContentWrapper>
    {list.map((item, i) => (
      <ContentContainer key={i.toString()}>
        <Oval>
          <LabelNumber>
            Step.
            {i + 1}
          </LabelNumber>
          <LabelText>{item.label}</LabelText>
        </Oval>
        <IfIFindContentText>{item.text}</IfIFindContentText>
      </ContentContainer>
    ))}
  </IfIFindContentWrapper>
);
