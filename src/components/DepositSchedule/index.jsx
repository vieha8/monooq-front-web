import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { ContentContainer } from 'components/Page';
import { media } from 'helpers/style/media-query';
import ReservationInfo from './ReservationInfo';

export default () => (
  <ContentContainer>
    <ReservationInfo
      username="YUKI HASHIDA"
      place="東京都"
      title="東京タワーに近くて便利！"
    />
  </ContentContainer>
);
