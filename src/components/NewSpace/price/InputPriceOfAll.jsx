import React from 'react';
import styled from 'styled-components';
import Input from 'components/Shared/Input';
import { Colors, FontSizes, Dimens } from 'variables';
import ErrorText from 'components/Shared/ErrorText';
import Title from '../shared/Title';

const Container = styled.div`
  width: 100%;
`;

const PriceWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Unit = styled.span`
  display: inline-block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.small}px;
  margin-left: ${Dimens.small}px;
`;

export default props => (
  <Container>
    <Title
      title="荷物を預かる料金目安（スペースまるごと）"
      subTitle="スペースの全体を使用する荷物の場合の料金"
    />
    <PriceWrapper>
      <Input
        type="number"
        value={props.ui.space.priceFull}
        onChange={e => props.handleChangeText(e.target.value)}
        placeholder="20000"
        style={{ width: '70%' }}
        invalid={(props.error.errors.priceFull || []).length > 0}
      />
      <Unit>円／30日間</Unit>
    </PriceWrapper>
    {props.error.errors.priceFull && <ErrorText errors={props.error.errors.priceFull} />}
  </Container>
);
