import React from 'react';

import RequestDialog from './RequestDialog';
import SpaceMenu from '../Search/SpaceMenu';

import {
  Card,
  Map,
  PlaceText,
  HeaderTitle,
  SlideImage,
  Caption,
  DetailTitle,
  DetailContainer,
  DetailContent,
  HostInfo,
} from '../../stories/space';

export default () => (
  <Card>
    {/* TODO マップのprops調整 */}
    <Map
      containerElement={<div style={{ height: '300px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      loadingElement={<div style={{ height: '100%' }} />}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrHQDZXZI21cMEW8FIYYWKyvI2kLUDsbA&v=3.exp&libraries=geometry,drawing,places"
    />
  </Card>
);
