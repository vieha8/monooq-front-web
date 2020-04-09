import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import MenuItemTop from 'components/LV1/MenuItemTop';

const Wrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${Dimens.large2}px auto;
  padding: 0 ${Dimens.medium}px;
`;

const Caption = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium1}px;
`;

const ListWrap = styled.div`
  display: flex;
  margin: ${Dimens.medium1_28}px auto;
  ${media.tablet`
    display: block;
    margin: ${Dimens.small_10}px auto ${Dimens.medium1_28}px;
  `};
`;

export default ({ list }) => (
  <Wrap>
    <Caption>はじめての方</Caption>
    <ListWrap>
      {list.map((item, i) => (
        <MenuItemTop
          key={i.toString()}
          link={item.link}
          bgImage={item.bgImage}
          type={item.type}
          titleSub={item.titleSub}
          titleMain={item.titleMain}
          isLinkBlank={item.isLinkBlank}
        />
      ))}
    </ListWrap>
  </Wrap>
);
