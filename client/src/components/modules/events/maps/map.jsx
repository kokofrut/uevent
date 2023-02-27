import Geocode from "react-geocode";
const API_KEY = "AIzaSyDgTj47ECOh0Q0-lGOvERZgsflcA8DMizo"
Geocode.setApiKey(API_KEY);
Geocode.setRegion("ua");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();




export async function reverseGeocode(lat, lng) {
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const addressLabel = response.results[0].formatted_address;
      return addressLabel
    },
    (error) => {
      console.error(error);
    }
  );
}