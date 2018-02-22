import React from 'react';
import styled from 'styled-components';
import { SpacePage } from '../../stories/create-space';

const Page = styled.div`
  padding: 80px 10%;
`;

export default () => (
  <Page>
    <SpacePage />
  </Page>
);
