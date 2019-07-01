// @flow

import React from 'react';
import styled from 'styled-components';

import { H2 } from 'components/LV1/Headline';
import InlineText from 'components/LV1/InlineText';

import { Dimens } from 'variables';

const Content = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.large}px;
  }
`;

const List = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

type PropTypes = {
  sales: Array<{}>,
  transfer: Array<{}>,
};

export default ({ sales, transfer }: PropTypes) => (
  <div>
    <Content>
      <H2>売上の詳細</H2>
      <InlineText.EmphasisSmall>
        売上は手数料を引いた金額が表示されています。
      </InlineText.EmphasisSmall>
      <List>
        {sales.length > 0 ? null : <InlineText.Base>売上履歴はまだありません</InlineText.Base>}
      </List>
    </Content>
    <Content>
      <H2>振込履歴</H2>
      <List>
        {transfer.length > 0 ? null : <InlineText.Base>振込履歴はまだありません</InlineText.Base>}
      </List>
    </Content>
  </div>
);
