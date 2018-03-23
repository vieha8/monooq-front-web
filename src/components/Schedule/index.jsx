import React from 'react';
import { ContentContainer } from 'components/Page';
import ReservationInfo from './ReservationInfo';

export default (props) => {
  const { user, host } = props.schedule;

  return (
    <ContentContainer>
      {(user.length === 0 && host.length === 0) ? <div>リクエストはありません</div> : null}
      {user.map((request, i) => (
        <ReservationInfo
          key={i}
          isHost={false}
          userName={request.Space.Host.Name}
          place={request.Space.AddressPref}
          title={request.Space.Title}
          startDate={request.StartDate}
          endDate={request.EndDate}
          price={request.Price}
        />
      ))}
      {host.map((request, i) => (
        <ReservationInfo
          key={i}
          isHost
          userName={request.User.Name}
          place={request.Space.AddressPref}
          title={request.Space.Title}
          startDate={request.StartDate}
          endDate={request.EndDate}
          price={request.Price}
        />
      ))}
    </ContentContainer>
  );
};
