import React, { memo } from "react";
import { Polyline } from "@react-google-maps/api";

const CustomPolyline = memo(({ location, location2 }) => (
  <Polyline
    path={[location, location2]}
    options={{
      geodesic: false,
      strokeColor: "#FFFFF",
      strokeOpacity: 0,
      strokeWeight: 1,
      icons: [
        {
          icon: {
            path: "M 0 0 L 0 5 L 2 5 L 2 0 z",
            fillOpacity: 1,
            strokeOpacity: 1,
            scale: 1,
          },
          offset: "0",
          repeat: "10px",
        },
      ],
    }}
  />
));

export default CustomPolyline;
