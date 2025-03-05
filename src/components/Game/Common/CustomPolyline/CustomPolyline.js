import { Polyline } from "@react-google-maps/api"
import React from "react"

const CustomPolyline = ({ location, location2 }) => {
  if (!location || !location2) return null

  const polylineOptions = {
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
  }

  return <Polyline path={[location, location2]} options={polylineOptions} />
}

export default React.memo(CustomPolyline)
