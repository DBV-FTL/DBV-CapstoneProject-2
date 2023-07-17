import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo, useEffect, useState } from "react";
import "./GoogleMaps.css";

export default function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });
  if (!isLoaded) return <div className="loading">Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 37.789744, lng: -122.397234 }), []);
  return (
    <GoogleMap zoom={17} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
