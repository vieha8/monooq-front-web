import React from 'react';
import { ContentContainer } from 'components/Page';
import ReservationInfo from './ReservationInfo';
import dummySpaceImage from 'images/dummy_space.png';

const dateFormat = (date) => {
  return date.toLocaleDateString('ja-JP-u-ca-japanese', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

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
          imageUrl={request.Space.ImageUrl || dummySpaceImage}
          startDate={dateFormat(new Date(request.StartDate))}
          endDate={dateFormat(new Date(request.EndDate))}
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
          imageUrl={request.Space.ImageUrl || dummySpaceImage}
          startDate={dateFormat(new Date(request.StartDate))}
          endDate={dateFormat(new Date(request.EndDate))}
          price={request.Price}
        />
      ))}
    </ContentContainer>
  );
};
