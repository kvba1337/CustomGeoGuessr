import React from 'react';
import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api';
import './StreetViewMap.scss';

const StreetViewMap = ({ isLoaded, currentLocation, getStreetViewOptions, streetViewRef }) => {
  return (
    isLoaded && currentLocation && (
      <GoogleMap mapContainerStyle={{ width: "100%", height: "100vh" }}>
        <StreetViewPanorama
          onLoad={(panorama) => (streetViewRef.current = panorama)}
          position={currentLocation}
          visible={true}
          options={getStreetViewOptions}
        />
      </GoogleMap>
    )
  );
};

export default StreetViewMap;