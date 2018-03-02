import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { ContentContainer } from 'components/Page';
import { media } from 'helpers/style/media-query';
import ListItem from './ListItem';

const Content = styled.div`
  margin-top: -${Dimens.medium2}px;
  margin-left: -${Dimens.medium2}px;
  ${media.phone`
    margin: 0;
  `}
`;

export default () => (
  <ContentContainer>
    <Content>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </Content>
  </ContentContainer>
);
