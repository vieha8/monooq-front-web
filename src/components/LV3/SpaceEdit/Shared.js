import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import { H1 } from 'components/LV1/Texts/Headline';

const PageHeaderWrap = styled.div`
  text-align: center;
`;

const TopImage = styled.img`
  width: 100%;
  max-width: 330px;
  margin: 0 auto ${Dimens.medium3_40}px;
  ${media.phone`
    margin: 0 auto ${Dimens.medium}px;
    padding: 0 ${Dimens.medium}px;
  `};
`;

export const PageHeader = property => {
  return (
    <PageHeaderWrap>
      <TopImage src={property.optionItem.src} alt="image-edit-status" />
      <H1 bold>{`スペース${property.optionItem.edit ? '編集' : '登録'}`}</H1>
    </PageHeaderWrap>
  );
};

export const Section = styled.div`
  max-width: 540px;
  margin: auto;
  margin-top: ${props => props.marginTop || Dimens.medium2}px;
  ${media.phone`
    ${props =>
      props.marginTopSp &&
      `
        margin-top: ${props.marginTopSp}px;
      `};
  `};
`;

export default {};
