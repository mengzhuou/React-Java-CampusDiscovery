import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

export default function LoadMapApi() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== undefined? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : '',
    libraries: ["places"],
  });

  console.log("mapehere ")
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}