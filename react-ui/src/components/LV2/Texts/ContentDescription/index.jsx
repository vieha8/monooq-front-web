import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import Text from 'components/LV1/Texts/TextStatic';

const ContentWrap = styled.div``;

const Title = styled(Text)`
  font-size: ${FontSizes.medium1}px;
  line-height: normal;
  font-weight: bold;
  margin: ${Dimens.medium1}px auto ${Dimens.small2}px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const ItemSub = styled(Text)`
  margin-left: ${Dimens.medium}px;
  line-height: normal;
`;

const TextWrapper = styled.div`
  margin-bottom: ${Dimens.small2}px;
`;

export default ({ title, dontActionList }) => (
  <ContentWrap>
    <Title>{title}</Title>
    {dontActionList.map((item, i) => (
      <TextWrapper key={i.toString()}>
        <Text>{`・${item.text}`}</Text>
        {item.textSubList &&
          item.textSubList.map((itemSub, j) => (
            <ItemSub key={j.toString()}>
              {!item.textSubListNoBar && '- '}
              {itemSub}
            </ItemSub>
          ))}
      </TextWrapper>
    ))}
  </ContentWrap>
);
