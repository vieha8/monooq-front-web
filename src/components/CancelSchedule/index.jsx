import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { ContentContainer } from 'components/Page';
import { media } from 'helpers/style/media-query';
import ReservationInfo from '../DepositSchedule/ReservationInfo';
import ConfirmCancel from './ConfirmCancel';
import Cancelled from './Cancelled';

const Title = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: inherit;
    padding: 0 ${Dimens.medium}px;
  `}
`;

export default props => (
  <ContentContainer>
    {props.confirm && <Title>この予定をキャンセルしますか？</Title>}
    <ReservationInfo
      username="YUKI HASHIDA"
      place="東京都"
      title="東京タワーに近くて便利！"
      salesAmount={4000}
      cancel
    />
    {props.confirm ? <ConfirmCancel onClickCancel={props.onClickCancel} /> : <Cancelled />}
  </ContentContainer>
);
