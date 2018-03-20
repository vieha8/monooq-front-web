import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import mapMarkerIcon from 'images/monooq_logo_mark.svg';

export default withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    <Marker
      position={{ lat: props.lat, lng: props.lng }}
      icon={{
        url: mapMarkerIcon,
      }}
    />
  </GoogleMap>
)));
