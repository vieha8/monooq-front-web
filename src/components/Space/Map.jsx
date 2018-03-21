import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import mapMarkerIcon from 'images/space_map_marker@2x.svg';

export default withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.lat + 0.003, lng: props.lng }}
  >
    <Marker
      position={{ lat: props.lat - 0.003, lng: props.lng }}
      icon={{
        url: mapMarkerIcon,
      }}
    />
  </GoogleMap>
)));
