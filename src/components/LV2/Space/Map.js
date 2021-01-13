import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Address from 'components/LV2/Space/Address';
import { SectionTitle } from './Section';

const Wrap = styled.div``;

const MapWrap = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default ({ address, map }) => (
  <Wrap>
    <SectionTitle text="アクセスマップ" />
    <MapWrap>
      <Address content={address} />
      {map}
    </MapWrap>
  </Wrap>
);
