import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Box } from '@mui/material'

function FlyTo({ position }) {
    function waitandfly() {
        setTimeout(() => {
            map.flyTo(position, 16)
        }, 1300)
    }
    const map = useMap()
    position && waitandfly()
}

function MapPreview(props) {
    const { location, position, fly, address, lat, lng } = props
    return (
        <Box
            sx={{
                backgroundColor: "rebeccapurple",
                background: 'transparent',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                height: "100%",
                width: "100%",
            }}
        >
            {fly == true ?
                <MapContainer className='map' center={[lat, lng]} zoom={11} scrollWheelZoom={true} >

                    {console.log("location = " + location + " position= " + position)}
                    {position && (
                        <Marker position={position}>
                            <Popup>{location}</Popup>
                        </Marker>
                    )}
                    <FlyTo position={position} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer> :
                <MapContainer className='map' center={[lat, lng]} zoom={13} scrollWheelZoom={true}>
                    <Marker position={[lat, lng]}>
                        <Popup>
                            {address}
                        </Popup>
                    </Marker>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            }

        </Box>
    )
}

export default MapPreview