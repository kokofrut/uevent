import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Paper, Table, TextField, Typography, Pagination, Tooltip, Zoom } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Geocode from "react-geocode";
import Grid2 from '@mui/material/Unstable_Grid2';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import Header from '../../common/header/Header.jsx';
import Footer from '../../common/footer/Footer.jsx'
import './eventPage.scss';
// import { change} from '../../features/currEvent/currEventSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useLocation, useNavigate } from 'react-router';

import { darkTheme, lightTheme } from '../../../assets/theme'
import { ThemeProvider } from '@mui/material'
import FormatTheme from '../../common/format-theme/FormatTheme.jsx';
import MapPreview from '../../common/map/Map.jsx';
import { Link } from 'react-router-dom'
import Comments from '../../modules/events/comments/Comments.jsx'
// import GoogleMap from 'google-map-react';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import $api from '../../../api';
const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";
const GEOCODE_ADRESS = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?f=pjson&addresses="

Geocode.setRegion("ua");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import { GOOGLE_API_KEY } from '../../../env.js';
Geocode.setApiKey(GOOGLE_API_KEY);
function LeafletControlGeocoder() {
  const map = useMap();

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng)
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);

  return null;
}
function DenseTable({ users }) {
  const rows = users
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {/* <TableHead>
          <TableRow>
            <TableCell></TableCell>
            
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name + ' ' + row.surname}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SimilarEvent(event) {

  const navigate = useNavigate()
  function handleClick() {

  }
  return (
    <Grid2 item xs={12} sm={12} md={12} onClick={handleClick}>
      <Card sx={{ minHeight: '200px', margin: '0 auto', minWidth: '50px', width: 'auto', backgroundColor: 'white', borderRadius: '15px', padding: '10px', cursor: 'pointer' }}>
        <CardActionArea>
          <CardContent sx={{ minHeight: '70%', margin: '0 auto', }}>
            <Typography gutterBottom variant="body1" color="text.secondary">
              {event.event.title}
            </Typography>
          </CardContent>
          <CardMedia>
            {event.event.poster ?
              <img src={"/" + event.event.poster} className="simCardImg"></img> :
              <img src={"/no_photo.svg"} className="simCardImg"></img>
            }
          </CardMedia>
        </CardActionArea>
      </Card>
    </Grid2>
  )
}

export function EventPreview(props) {
  const { eventData, lat, lng, address } = props
  return (

    <Card sx={{ maxWidth: "80vw", width: '100%', margin: "0 auto", cursor: "default", textAlign: "initial" }}>
      <CardContent sx={{ maxWidth: "80vw", margin: "0 auto", cursor: "default" }}>
        <Typography gutterBottom variant="h5" component="h2" align="left" sx={{ margin: "1.5em 0.5em 0.5em 0.5em", whiteSpace: "pre-line" }}>
          {eventData.title ? eventData.title : 'Choose title...'}
        </Typography>
        <FormatTheme eventData={eventData} />
        <Grid2 container sx={{ minHeight: "300px" }}>
          <Grid2 item xs={8} sm={8} md={8} sx={{ display: "flex", justifyContent: "center", padding: "0 10px", backgroundColor: "transparent", maxHeight: '400px', borderRadius: '15px' }}>
            {eventData.poster ?
              <img src={"/" + eventData.poster} className="event-img-big" alt="Event Image" /> :
              <img src={"/no_photo.svg"} className="event-img-big" alt="Event Image" />}

          </Grid2>
          <Grid2 item xs={4} sm={4} md={4}>
            <MapPreview fly={false} lat={lat} lng={lng} address={address} />
          </Grid2>
        </Grid2>
        <Grid2 container sx={{ height: "auto", marginTop: "10px" }}>
          <Grid2 item xs={6} sm={6} md={6}>
            <Box sx={{ padding: "0 10px" }}>
              <Typography gutterBottom variant="body1">
                Date: {new Date(eventData.date).toLocaleDateString('en-GB')}

              </Typography>
              <Typography gutterBottom variant="body1">
                Time: {new Date(eventData.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </Grid2>
          <Grid2 item xs={6} sm={6} md={6} sx={{ justifyContent: "flex-end" }}>
            <Box sx={{ padding: "0 10px", textAlign: "right" }}>
              <Typography gutterBottom variant="body1">
                Price: {eventData.ticketPrice}$
              </Typography>
              <Typography gutterBottom variant="body1">
                {eventData.ticketAmount} left
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
        {/* <Adsense_ad /> */}
      </CardContent>
    </Card>
  )
}

function OrganizerCard({ eventData }) {

  return (
    <Card sx={{ minHeight: '200px', margin: '0 auto', width: 'auto', backgroundColor: 'white', borderRadius: '15px', padding: '10px' }}>
      <Typography gutterBottom variant="body1" color="text.secondary">
        {eventData.organizer}
      </Typography>

    </Card>
  )
}
function EventPage() {
  const [theme, setTheme] = useState(false)
  let selectedTheme = theme ? darkTheme : lightTheme
  function toogleTheme() { setTheme(!theme); console.log(theme) }
  // todo (fetch by  event id thaat is on URL last one like //event/4)
  const handleLocationChange = async (e) => {
    const query = e.target.value;
    if (query) {
      try {
        const url = `https://nominatim.openstreetmap.org/search/${encodeURIComponent(
          query
        )}?format=json&limit=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          console.log(data)
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    } else {
    }
  };
  const { state } = useLocation();
  // const eventData = useSelector((state) => state.currEvent.currEvent)
  const navigate = useNavigate()
  let eventData = {}
  let similarEvents = []
  if (state) {
    eventData = state.eventData
    similarEvents = state.similarEvents
  }
  const [subscribers, setSubscribers] = useState([])
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  let lat = 0
  let lng = 0
  if (eventData.location) {
    lat = eventData.location.split('/')[1].split('N')[0]
    lng = eventData.location.split('/')[1].split('N')[1]
  }
  useEffect(() => {
    async function fetchSubscribers() {
      try {
        await $api.get(`/events/${eventData.id}/subs`)
          .then((response) => response.json).then((data) => setSubscribers(data))
      }
      catch (error) {
        console.error(error)
      }
    }
    let temp = [
      {
        name: 'John',
        surname: 'Doe',
        email: 'JohnDoe@gmail.com'
      },
      {
        name: 'Oop',
        surname: 'Const',
        email: 'consta@gmail.com'
      },
      {
        name: 'Let',
        surname: 'Do',
        email: 'Dolet@gmail.com'
      },
      {
        name: 'John',
        surname: 'Doe',
        email: 'JohnDoe@gmail.com'
      },
      {
        name: 'Oop',
        surname: 'Const',
        email: 'consta@gmail.com'
      },
      {
        name: 'Let',
        surname: 'Do',
        email: 'Dolet@gmail.com'
      },
    ]
    // fetchSubscribers()
    setSubscribers(temp)
  }, [])
  useEffect(() => {
    localStorage.setItem('currEvent', JSON.stringify(eventData))
  }, [eventData])
  // useEffect(() => {
  //   reverseGeoCoding()
  // }, [])
  function handleTicketBuy(e) {
    e.preventDefault()
    return navigate('/payment')

  }
  async function reverseGeoCoding() {
    // Here the coordinates are in LatLng Format

    // if you wish to use other formats you will have to change the lat and lng in the fetch URL
    // const data = await (await fetch(GEOCODE_URL + `${lng},${lat}`)).json();
    // console.log(data.address);

    // const addressLabel = (data.address !== undefined) ? data.address.LongLabel : "Unknown";
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const addressLabel = response.results[0].formatted_address;
        console.log(addressLabel);
        setAddress(addressLabel)
      },
      (error) => {
        console.error(error);
      }
    );
    // Geocode.fromAddress('Shevchenka 43', API_KEY).then(
    //   (response) => {
    //     // console.log(response.results[0].formatted_address)
    //     const addressLabel = response.results[0].formatted_address;
    //     console.log(addressLabel);
    //     setAddress(addressLabel)
    //   },
    //   (error) => {
    //     console.error(error);
    //     setAddress('Incorrect address, please provide address with city and street')
    //   }
    // );
  }

  return (
    <ThemeProvider theme={selectedTheme}>

      <div className="wrapper">
        <Header toogleTheme={toogleTheme} />
        <EventPreview eventData={eventData} lat={lat} lng={lng} address={address} />

        <Grid2 container direction='row' rowSpacing={2} sx={{ maxWidth: '80vw', margin: '1rem auto', cursor: 'default', textAlign: 'left' }} >
          <Grid2 container xs={2} sm={2} md={2} direction='column' rowSpacing={2}>
            <Grid2 item xs={12} sm={12} md={12}>
              <OrganizerCard eventData={eventData} />
            </Grid2>
            <Grid2 item xs={12} sm={12} md={12} sx={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="body1" color="text.secondary">
                Similar events
              </Typography>
            </Grid2>
            {similarEvents.map((event, index) => (<SimilarEvent event={event} key={event.id} />))}
          </Grid2>
          <Grid2 container xs={10} sm={10} md={10} direction='column' rowSpacing={2} >
            <Grid2 item xs={12} sm={12} md={12}>
              <form method='post' action='' onSubmit={(e) => handleTicketBuy(e)}>
                <Grid2 container direction='column' rowSpacing={2} sx={{
                  margin: '0 0 0 20px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
                }}>
                  <Grid2 item xs={12} sm={5} md={5} >
                    <TextField variant='filled' className='txt-fld-buy' name='Fname' required label='Name'></TextField>
                  </Grid2>
                  <Grid2 item xs={12} sm={5} md={5} >
                    <TextField variant='filled' className='txt-fld-buy' name='Lname' required label='Last Name'></TextField>
                  </Grid2>
                  <Grid2 item xs={12} sm={5} md={5} >
                    <TextField variant='filled' className='txt-fld-buy' name='email' required label='Email' type='email'></TextField>
                  </Grid2>
                  <Grid2 item xs={12} sm={5} md={5} >
                    {/* <TextField variant='filled' className='txt-fld-buy' name='phone' required label='Phone number'></TextField> */}
                    <PhoneInput
                      country={'ua'}
                      value={phone}
                      excludeCountries={'ru'}
                      onChange={ph => setPhone(ph)}
                    />
                  </Grid2>
                  <Grid2 item xs={12} sm={5} md={5}>
                    <Button variant="contained" color="success" type='submit'>BUY TICKET</Button>
                  </Grid2>
                </Grid2>
              </form>
            </Grid2>
            <Grid2 item xs={12} sm={12} md={12}>
              <Card className='list-users' sx={{ overflow: 'scroll', textAlign: 'center', maxHeight: '20vh', minHeight: '100px', height: 'auto', margin: '0 0 0 20px', borderRadius: "10px", padding: '10px', }}>
                <Typography gutterBottom variant='body1'>
                  Users subscribed to this event
                </Typography>
                <DenseTable users={subscribers} />
              </Card>
            </Grid2>
            <Grid2 item xs={12} sm={12} md={12}>
              <Comments />
            </Grid2>
            <Grid2 item xs={12} sm={12} md={12}>
              <TextField onChange={handleLocationChange} />
            </Grid2>
          </Grid2>
        </Grid2>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default EventPage