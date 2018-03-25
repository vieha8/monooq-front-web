import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';
import { ContentContainer } from 'components/Page';
import dummySpaceImage from 'images/dummy_space.png';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ReservationInfo from './ReservationInfo';

const Empty = styled.div`
  line-height: 1.5;
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const dateFormat = (date) => {
  return date.toLocaleDateString('ja-JP-u-ca-japanese', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default (props) => {
  const { isLoading, schedule } = props;
  const { user, host } = schedule;

  return (
    <ContentContainer>
      {isLoading ? (
        <Loader active inline="centered" size="medium">読み込み中...</Loader>
      ) : (
        <Fragment>
          {(user.length === 0 && host.length === 0) ? <Empty>取引が成立したスペースの利用はまだありません。</Empty> : null}
          {user.map((request, i) => (
            <ReservationInfo
              key={i}
              isHost={false}
              userName={request.Space.Host.Name}
              place={request.Space.AddressPref}
              title={request.Space.Title}
              imageUrl={request.Space.Images.length !== 0 ? request.Space.Images[0].ImageUrl : dummySpaceImage}
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
        </Fragment>
      )}
    </ContentContainer>
  );
};
