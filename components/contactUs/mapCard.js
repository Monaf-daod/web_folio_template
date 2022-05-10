import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { env } from "process";
export default function MapCard(props) {
  const { lat, lng } = props;
  const containerStyle = {
    width: "100%",
    height: "50vh",
  };
  const handleChooseMarker = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const mapCenter = { lat: parseFloat(lat), lng: parseFloat(lng) };
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={7}
        //onClick={handleChooseMarker}
      >
        <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
}
