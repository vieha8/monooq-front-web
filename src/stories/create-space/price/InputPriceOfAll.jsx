import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import Title from '../shared/Title';
import { Colors, FontSizes, Dimens } from '../../../variables';

const Container = styled.div`
  width: 100%;
`;

const PriceWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Unit = styled.span`
  display: inline-block;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  margin-left: ${Dimens.small}px;
`;

export default () => (
  <Container>
    <Title
      title="荷物を預かる料金目安（スペースまるごと）"
      subTitle="スペースの全体を使用する荷物の場合の料金"
    />
    <PriceWrapper>
      <Input
        placeholder="20000"
        style={{ width: '70%' }}
      />
      <Unit>円／30日間</Unit>
    </PriceWrapper>
  </Container>
);
