import {useState, useEffect} from 'react'
import "./mainpage.css"
import Header from "../../common/header/Header"
import AllEvents from '../../modules/events/allEvents/allEvents'
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
function MainPage() {
    // function setlocation(data) {
    //     localStorage.setItem('location', data)
    // }
    // async function reverseGeoCoding(lat, lng) {
    //     // Here the coordinates are in LatLng Format
    //     // if you wish to use other formats you will have to change the lat and lng in the fetch URL
    //     await fetch(GEOCODE_URL + `${lng},${lat}`).then(response => response.json()).then(data => setlocation(data.address.Neighborhood));
    //     // const addressLabel = (data.address !== undefined) ? data.address.region : "Unknown";
    //     // return addressLabel
    //   }
    useEffect(() => {
        const successCallback = (position) => {
            console.log('code')
            reverseGeoCoding(position.coords.latitude, position.coords.longitude)
          };
          
          const errorCallback = (error) => {
            console.log(error);
          };
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }, [])
    return (
        <div className="wrapper">
            <div>
                <Header/>
                <AllEvents/>
            </div>
        </div>
    )
}

export default MainPage