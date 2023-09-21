import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { REACT_APP_GOOGLE_MAPS_KEY } from '../keymaps.js';

const containerStyle = {
  width: '750px',
  height: '300px',
  margin: '20px'
};

const center = {
  lat: -31.4135000,
  lng: -64.1810500,
};

const Maps = () => {
  return (
    <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAPS_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}></GoogleMap>
    </LoadScript>
  );
};

export default Maps;