import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, Card, Modal, TextField, Tooltip, Typography, Select, MenuItem, InputLabel, FormControl, CardContent, Box, InputAdornment } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';
import './companies.scss';
import '../../../containers/eventPage/eventPage.scss'
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search/"
import MyAutocomplete from './Autocomplete'

function FlyTo({ position }) {
    function waitandfly() {
        setTimeout(() => {
            map.flyTo(position, 16)
        }, 1300)
    }
    const map = useMap()
    position && waitandfly()
}

function EventPreview(props) {
    const { eventData, lat, lng, address, position, location } = props

    return (
        <Card sx={{ maxWidth: "80vw", width: '100%', margin: "0 auto", cursor: "default" }}>
            <CardContent sx={{ maxWidth: "80vw", margin: "0 auto", cursor: "default" }}>
                <Typography gutterBottom variant="h5" component="h2" align="left" sx={{ margin: "1.5em 0.5em 0.5em 0.5em", whiteSpace: "pre-line" }}>
                    {eventData.title ? eventData.title : 'Choose title...'}
                </Typography>
                <Box
                    sx={{
                        backgroundColor: "rgba(233, 208, 208, 0.8)",
                        borderRadius: "20px",
                        padding: "0.5em 1em",
                        width: 'fit-content',
                        margin: '0.5em 0.5em 1.5em 0.5em'
                    }}
                >
                    <Typography>{eventData.format ? eventData.format : 'Choose format...'}</Typography>
                </Box>
                <Box
                    sx={{
                        backgroundColor: "rgba(190, 219, 235, 0.8)",
                        borderRadius: "20px",
                        padding: "0.5em 1em",
                        width: 'fit-content',
                        margin: '0.5em 0.5em 1.5em 0.5em'
                    }}
                >
                    {console.log(eventData)}
                    <Typography>{eventData.theme ? eventData.theme : 'Choose theme...'}</Typography>
                </Box>
                <Grid2 container sx={{ minHeight: "300px" }}>
                    <Grid2 item xs={8} sm={8} md={8} sx={{ padding: "0 10px", display: "flex", justifyContent: "center", backgroundColor: "transparent", maxHeight: '400px', borderRadius: '15px' }}>
                        {eventData.poster ? <img src={eventData.poster} className="event-img-big" alt="Event Image" />: 
                        <img src="/no_photo.svg" className="event-img-big" alt="Event Image"></img>}
                    </Grid2>
                    <Grid2 item xs={4} sm={4} md={4}>
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
                            <MapContainer className='map' center={[48.6, 22.29]} zoom={11} scrollWheelZoom={true} >

                                {console.log("location = " + location + " position= " + position)}
                                {position && (
                                    <Marker position={position}>
                                        <Popup>{location}</Popup>
                                    </Marker>
                                )}
                                {/* <LeafletControlGeocoder /> */}
                                <FlyTo position={position} />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>

                        </Box>
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
            </CardContent>
        </Card>
    )
}

function UserCompany({ data }) {

    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [newEvent, setNewEvent] = React.useState({
        title: '',
        location: '',
        format: '',
        theme: '',
        date: new Date,
        ticketPrice: '',
        ticketAmount: '',
        poster: ''
    });
    const [selectedFile, setSelectedFile] = React.useState()
    const [preview, setPreview] = React.useState()
    const [date, setDate] = React.useState(Date.now());
    const [newAddress, setNewAddress] = React.useState('')
    const [enterCount, setEnterCount] = React.useState(0);

    const [location, setLocation] = React.useState('');
    const [position, setPosition] = React.useState(null);

    const minDateTime = dayjs();
    const [nameEdit, setNameEdit] = React.useState(`${data.name}`);
    const [emailEdit, setEmailEdit] = React.useState(`${data.email}`);
    const [locationEdit, setLocationEdit] = React.useState(`${data.location}`);
    React.useEffect(() => {
        if (!selectedFile) {
            setNewEvent(prev => ({ ...prev, poster: '' }))
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setNewEvent(prev => ({ ...prev, poster: objectUrl }))
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleLocationChange = async (e) => {
        const query = e.target.value;
        setLocation(query);

        if (query) {
            try {
                const url = `https://nominatim.openstreetmap.org/search/${encodeURIComponent(
                    query
                )}?format=json&limit=1`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    setPosition([lat, lon]);
                } else {
                    setPosition(null);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setPosition(null);
        }
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const handleOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const handleChangeDate = (newValue) => {
        setNewEvent((prev) => ({ ...prev, date: newValue }))
    };


    function handleAddEvent() {
        console.log('add event')
    }
    function handleEditCompany() {
        // do here edit fetch
        if (data.email != emailEdit || data.name != nameEdit || data.location != locationEdit) {
            console.log(`Edit company + ${nameEdit} + ${emailEdit} + ${locationEdit}`)
        }
    }
    function handleChangeFormat(event) {
        setNewEvent(prev => ({ ...prev, format: event.target.value }))
    }
    function handleDeleteCompany() {
        // do here fetch to delete the company
        console.log(`delete company ${data.name}`)
    }
    function onSelectFile(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }
    function handleAutocomplete(value, type) {
        switch (type) {
            case "Format":
                setNewEvent(prev => ({ ...prev, format: value }))
                return ''
            case "Theme":
                setNewEvent(prev => ({ ...prev, theme: value }))
                return ''
        }
    }
    return (
        <Grid2 item xs={6} sm={6} md={6}>

            <Card className='company-card' sx={{ borderRadius: '15px' }}>
                <div className='company-header'>
                    <h2>{data.name}</h2>
                    <div className='company-toolbar'>
                        <Button type='button' color='secondary' onClick={handleOpenAdd}>
                            <Tooltip title='Add new event'>
                                <AddIcon />
                            </Tooltip>
                        </Button>
                        {/* Add event */}
                        {/* The above code is a modal window that is used to add a new event. */}
                        <Modal
                            open={openAdd}
                            onClose={handleCloseAdd}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"

                        >
                            <div className="popup-container-add"  >
                                <div className="popup-wrapper-add">
                                    <h2 id="simple-modal-title">Create your event!</h2>
                                    <p id="simple-modal-description">
                                        You can always change it later!
                                    </p>
                                    <div className="popup-add-form">
                                        <TextField
                                            label="Title"

                                            rows={1}
                                            inputProps={{
                                                pattern: "[A-Za-z0-9 ]*",
                                                maxLength: 70,
                                            }}
                                            value={newEvent.title}
                                            onChange={(e) => {
                                                const value = e.target.value.slice(0, 70);
                                                setNewEvent((prev) => ({ ...prev, title: value }));
                                            }}

                                        />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                label="Date&Time picker"
                                                value={newEvent.date}
                                                onChange={handleChangeDate}
                                                renderInput={(params) => <TextField {...params} />}
                                                minDateTime={minDateTime}
                                            />
                                        </LocalizationProvider>
                                        <FormControl sx={{ minWidth: '200px' }}>
                                            <MyAutocomplete type={'Theme'} handler={handleAutocomplete} />
                                        </FormControl>
                                        <FormControl sx={{ minWidth: '200px' }}>
                                            <MyAutocomplete type={'Format'} handler={handleAutocomplete} />
                                        </FormControl>
                                        <TextField
                                            label='Location'
                                            value={location}
                                            onChange={handleLocationChange}
                                        />
                                        <TextField
                                            label="Ticket Price"
                                            type="number"
                                            inputProps={{
                                                min: 0,
                                                max: 9999,
                                                step: 0.1,
                                            }}
                                            value={newEvent.ticketPrice}
                                            onChange={(e) => {
                                                const value = Math.max(0, Math.min(e.target.value, 9999));
                                                setNewEvent((prev) => ({ ...prev, ticketPrice: value }));
                                            }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            label="Ticket Amount"
                                            type="number"
                                            inputProps={{
                                                min: 1,
                                                max: 500000,
                                                step: 1,
                                            }}
                                            value={newEvent.ticketAmount}
                                            onChange={(e) => {
                                                const value = Math.max(0, Math.min(e.target.value, 500000));
                                                setNewEvent((prev) => ({ ...prev, ticketAmount: value }));
                                            }}
                                        />
                                        <TextField type='file' onChange={onSelectFile} inputProps={{ accept: "image/png, image/jpg" }}></TextField>

                                    </div>
                                    <div className="preview">
                                        <EventPreview
                                            eventData={newEvent}
                                            lat={newEvent.location ? newEvent.location.split('/')[1].split('N')[0] : 42.6}
                                            lng={newEvent.location ? newEvent.location.split('/')[1].split('N')[1] : 26.8}
                                            address={newAddress}
                                            position={position}
                                            location={location}
                                        />
                                    </div>
                                    <Button type='button' variant='contained' color='primary' onClick={handleAddEvent} >Add Event</Button>
                                </div>
                            </div>

                        </Modal>
                        <Button type='button' color='secondary' onClick={handleOpenEdit}>
                            <Tooltip title='Edit company'>
                                <DriveFileRenameOutlineIcon />
                            </Tooltip>
                        </Button>
                        <Modal
                            open={openEdit}
                            onClose={handleCloseEdit}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div className="popup-container-edit">
                                <h2 id="simple-modal-title">Change your company data</h2>
                                <p id="simple-modal-description">
                                    You can always change it later!
                                </p>
                                <div className="popup-edit-form">
                                    <TextField label='Name' value={nameEdit} onChange={(e) => setNameEdit(e.target.value)}>Name</TextField>
                                    <TextField label='Email' value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)}>Email</TextField>
                                    <TextField label='Location' value={locationEdit} onChange={(e) => setLocationEdit(e.target.value)}>Location</TextField>
                                    <Button type='button' variant='contained' color='primary' onClick={handleEditCompany} >Edit</Button>

                                </div>
                            </div>

                        </Modal>
                        <Button type='button' color='secondary' onClick={handleOpenDelete}>
                            <Tooltip title='Delete Company'>
                                <RemoveCircleOutlineIcon />
                            </Tooltip>
                        </Button>
                        <Modal
                            open={openDelete}
                            onClose={handleCloseDelete}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div className="popup-container">
                                <h2 id="simple-modal-title">Do you want to delete this company?</h2>
                                <p id="simple-modal-description">
                                    You won't be able to undo this action!
                                </p>
                                <Button type='button' variant='contained' color='error' onClick={handleDeleteCompany} >Delete</Button>
                            </div>

                        </Modal>
                    </div>
                </div >
                <div className='company-data'>
                    <h4>Location: {data.location}</h4>
                    <h4>Email: {data.email}</h4>
                    <h4>Events:</h4>

                </div>
            </Card >
        </Grid2>
    )
}

function CompaniesDataList({ companies }) {
    return (
        <Card className="company-cards-wrapper" sx={{ borderRadius: '15px', height: '100%', m: '0' }} >
            <Typography variant="h5" align='left' sx={{ m: '15px', }}>Your Companies</Typography>
            <Grid2 container spacing={2}>
                {companies.map((company) => { return <UserCompany data={company} key={company.id} /> })}
            </Grid2>
        </Card>
    )
}

function CompaniesUser({ companies }) {
    const [companiesList, setCompaniesList] = React.useState([{ id: 12, name: 'loading', email: 'null' }])
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true)


    React.useEffect(() => {
        setLoading(false)
    }, [companiesList])
    React.useEffect(() => {
        setCompaniesList(companies)
    }, [])
    return (
        <Card sx={{ borderRadius: '15px ', }}>
            {loading ? <h1>Loading...</h1> :
                <CompaniesDataList companies={companies} />
            }
        </Card>
    )
}

export default CompaniesUser