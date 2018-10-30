// @flow

import React from 'react';
import styled from 'styled-components';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { media } from 'helpers/style/media-query';
import mapMarkerIcon from 'images/space_map_marker@2x.svg';

const MapContainer = styled.div`
  height: 360px;
  ${media.tablet`
    height: 240px;  
  `};
`;

type PropTypes = {
  lat: number,
  lng: number,
};

const Map = withScriptjs(
  withGoogleMap((props: PropTypes) => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: props.lat + 0.003, lng: props.lng }}>
      <Marker
        position={{ lat: props.lat - 0.003, lng: props.lng }}
        icon={{
          url: mapMarkerIcon,
        }}
      />
    </GoogleMap>
  )),
);

const KEY = 'AIzaSyAF1kxs-DsZJHW3tX3eNi88tKixy-zbGtk';
Map.defaultProps = {
  containerElement: <MapContainer />,
  mapElement: <div style={{ height: '100%' }} />,
  loadingElement: <div style={{ height: '100%' }} />,
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`,
};

export default Map;
