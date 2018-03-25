import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';

const Container = styled.div`
  padding: 30px;
  background: #f7f7f7;
  margin-top: 30px;
  ${media.phone`
    padding: 0;
    margin-top: ${Dimens.medium};
    background: none;
    border-bottom: 1px solid ${Colors.borderGray};
  `}
`;

const Label = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 2px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 32px;
  margin-bottom: 10px;
`;

const EstimateInfoHr = styled.hr`
  margin-bottom: 15px;
  margin-top: 0;
  border: 0;
  height: 1px;
  background-color: #dbdbdb;
`;

const NoticeText = styled.div`
  color: #888787;
  font-size: 12px;
  line-height: 18px;
  ${media.tablet`
    display: none;
  `};
`;

export default props => (
  <Container>
    <Label>日時</Label>
    <Content>{moment(props.startDate).format('YYYY/MM/DD')}から{moment(props.endDate).format('YYYY/MM/DD')}まで</Content>
    <EstimateInfoHr />
    <Label>期間</Label>
    <Content>{moment(props.endDate).diff(props.startDate, 'days') + 1}日間</Content>
    <EstimateInfoHr />
    <Label>お支払い金額</Label>
    <Content>{props.price}円（税込み）</Content>
    <NoticeText>
      ※引き取り日に連絡がつかないなどの延長があった際は、見積もり料金×25％×延長日数が加算されホストへ支払われます。
    </NoticeText>
  </Container>
);
