import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { ContentContainer } from 'components/Page';
import ReservationInfo from './ReservationInfo';

const AutoDeleteCaption = styled.span`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.lightGray1};
  margin-top: ${Dimens.large}px;
  text-align: center;
`;

export default () => (
  <ContentContainer>
    <ReservationInfo
      username="YUKI HASHIDA"
      place="東京都"
      title="東京タワーに近くて便利！"
      otherText="キャンセルする"
      otherLink="/"
      salesAmount={4000}
    />
    <ReservationInfo
      username="YUKI HASHIDA"
      place="東京都"
      title="東京タワーに近くて便利！"
      otherText="何かお困りですか？"
      otherLink="/"
      salesAmount={4000}
    />
    <AutoDeleteCaption>取引完了後、40日が経過した取引履歴は自動的に削除されます。</AutoDeleteCaption>
  </ContentContainer>
);
