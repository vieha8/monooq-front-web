import React from 'react';
import styled from 'styled-components';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { media } from 'helpers/style/media-query';
import mapMarkerIcon from 'images/img-space-map-marker.svg';

const MapContainer = styled.div`
  height: 360px;
  ${media.tablet`
    height: 240px;  
  `};
`;

const Map = withScriptjs(
  withGoogleMap(({ lat, lng }) => {
    if (lat === null || lng === null || lat === undefined || lng === undefined) {
      return null;
    }

    const latFloat = parseFloat(lat);
    const lngFloat = parseFloat(lng);

    return (
      <GoogleMap defaultZoom={14} defaultCenter={{ lat: latFloat + 0.003, lng: lngFloat }}>
        <Marker
          position={{ lat: latFloat - 0.003, lng: lngFloat }}
          icon={{
            url: mapMarkerIcon,
          }}
        />
      </GoogleMap>
    );
  }),
);

const KEY = 'AIzaSyAF1kxs-DsZJHW3tX3eNi88tKixy-zbGtk';
Map.defaultProps = {
  containerElement: <MapContainer />,
  mapElement: <div style={{ height: '100%' }} />,
  loadingElement: <div style={{ height: '100%' }} />,
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`,
};

export default Map;
