import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens } from 'variables';

moment.locale('ja');

const Wrap = styled.div`
  width: 100%;
`;

const Label = styled.span`
  display: block;
  margin-bottom: ${Dimens.small2}px;
  margin: 5px auto 7px;
`;

const Text = styled.div`
  margin: ${Dimens.small}px auto 0;
`;

export default ({ value }) => (
  <Wrap>
    <Label>
      <InlineText.Bold>終了予定日</InlineText.Bold>
    </Label>
    {moment()
      .add(value, 'months')
      .subtract(1, 'days')
      .format('YYYY年MM月DD日（dd）')}
    <Text>
      <InlineText.EmphasisTiny>
        終了予定日を変更する場合は、利用開始日・利用期間を変更してください。
      </InlineText.EmphasisTiny>
    </Text>
  </Wrap>
);
