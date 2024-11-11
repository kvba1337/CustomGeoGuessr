import React from "react";
import { Marker } from "@react-google-maps/api";

const CustomMarker = ({ location, icon }) => {
  if (!location || !icon) return null;

  return (
    <Marker
      position={{ lat: location.lat, lng: location.lng }}
      icon={{
        url: icon,
        scaledSize: new window.google.maps.Size(30, 30),
        anchor: new window.google.maps.Point(15, 15),
      }}
    />
  );
};

export default CustomMarker;
