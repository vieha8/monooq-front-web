import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import {Colors, FontSizes, Dimens} from 'variables';
import {ContentContainer} from 'components/Page';
import ReservationInfo from './ReservationInfo';

const AutoDeleteCaption = styled.span`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.lightGray1};
  margin-top: ${Dimens.large}px;
  text-align: center;
`;

export default props => {

  const { user, host } = props.schedule;

  return (
    <ContentContainer>
      {user.map((request, i) => {
        console.log(request);
        return (
          <ReservationInfo
            key={i}
            username={request.Space.Host.Name}
            place={request.Space.AddressPref}
            title={request.Space.Title}
            startDate={request.StartDate}
            endDate={request.EndDate}
            otherText="キャンセルする"
            otherLink={Path.confirmCancel('scheduleHOGEHOGE')}
            salesAmount={request.Price}
          />
        );
      })}
      <AutoDeleteCaption>取引完了後、40日が経過した取引履歴は自動的に削除されます。</AutoDeleteCaption>
    </ContentContainer>
  )
};
