import { useMemo, useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./GoogleMaps.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxButton,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) return <div className="loading">Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 37.789744, lng: -122.397234 }), []);
  const [selected, setSelected] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete
          setSelected={setSelected}
          setDirectionsResponse={setDirectionsResponse}
          setDistance={setDistance}
          setDuration={setDuration}
        />
      </div>
      <GoogleMap
        zoom={17}
        center={selected ? selected : center}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {selected && <Marker position={selected} />}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  );
}

function PlacesAutocomplete({
  setSelected,
  setDirectionsResponse,
  setDistance,
  setDuration,
}) {
  const orgRef = useRef();

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };
  return (
    <div className="address-searchbar">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          name="user"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an Address"
          ref={orgRef}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
        <ComboboxButton className="buttonmap"
          onClick={() =>
            calculateRoute({
              setDirectionsResponse,
              setDuration,
              setDistance,
              orgRef,
            })
          }
        >
          Search

          
        </ComboboxButton>
        <ComboboxButton className="buttonmap" onClick={() => clearRoute({setDirectionsResponse, setDistance, setDuration, orgRef})}>Clear</ComboboxButton>
      </Combobox>
    </div>
  );
}

async function calculateRoute({
  setDirectionsResponse,
  setDistance,
  setDuration,
  orgRef,
}) {
  console.log('o')
  if (orgRef.current.value === '') return
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: orgRef.current.value,
    destination: { lat: 38.13741, lng: -120.463965 },
    travelMode: google.maps.TravelMode.DRIVING,
  });
  setDirectionsResponse(results);
  setDistance(results.routes[0].legs[0].distance.text);
  setDuration(results.routes[0].legs[0].duration.text);
}

function clearRoute({setDirectionsResponse, setDistance, setDuration, orgRef}) {
  console.log('clearing')
  setDirectionsResponse(null)
  setDistance('')
  setDuration('')
  orgRef.current.value = ''
}