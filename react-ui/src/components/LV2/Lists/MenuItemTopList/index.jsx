import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import MenuItemTop from 'components/LV1/MenuItemTop';

const Wrap = styled.div``;

const Caption = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium1}px;
  ${media.tablet`
    margin: auto ${Dimens.medium}px 0;
  `};
`;

const ListWrap = styled.div`
  margin: ${Dimens.medium1_28}px auto;
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
        />
      ))}
    </ListWrap>
  </Wrap>
);
