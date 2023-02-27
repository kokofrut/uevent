import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import QrCode from './qr/qrcode';
import './userTickets.scss';
function Ticket({ ticket }) {
    return (
        <Grid2 item xs={12} sm={12} md={6} key={ticket.id}>
            <Card className='card ' sx={{ m: '0 15px' }}>
                <CardContent className='ticket-card'>
                    <div id='ticket-left-data'>
                        <Typography className='title' variant='subtitle1' >Event: {ticket.title}</Typography>
                        <Typography>Date: {ticket.date.getFullYear()}</Typography>
                        <Typography>Price: {ticket.ticketPrice}</Typography>
                    </div>
                    <QrCode url={ticket.title} />
                </CardContent>
            </Card>
        </Grid2>
    )
}

export default function UserTickets({ userTickets }) {
    const [sortValue, setSortValue] = useState('date');
    const [userTicketsCopy, setUserTicketsCopy] = useState([]);

    useEffect(() => {
        setUserTicketsCopy(userTickets.slice().sort((a, b) => {
            switch (sortValue) {
                case 'price':
                    return a.ticketPrice - b.ticketPrice;
                case 'date':
                    return new Date(a.date) - new Date(b.date);
                case 'theme':
                    return a.theme.localeCompare(b.theme);
                case 'format':
                    return a.format.localeCompare(b.format);
                default:
                    return 0;
            }
        }));
    }, [sortValue, userTickets]);

    function handleRadioSort(e) {
        if (e.target.value !== undefined) {
            setSortValue(e.target.value);
        }
    }
    return (
        <Card className='card-wrapper' sx={{ width: '100%', height: 'auto', maxWidth: '80vw', m: '0 auto', borderRadius: '15px', backgroundColor: 'rgba(255,255,255,1)' }}>
            {userTicketsCopy.length > 0 ?
                <Grid2 container columnSpacing={2} className='root' sx={{ width: '80%', m: 'auto' }}>
                    <Grid2 container xs={12} sm={12} md={12}>
                        <Grid2 sx={{ height: 'auto', display: 'flex', flexDirection: 'row', width: 'auto', justifyContent: 'left' }} item xs={12} sm={12} md={12}>
                            <h2>My Tickets</h2>
                            <Card sx={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* <CardContent > */}
                                <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: "10px", justifyContent: 'center', alignItems: 'center' }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Sort by:</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        sx={{ display: "flex", flexDirection: "row", }}
                                    >
                                        <FormControlLabel value="price" onClick={handleRadioSort} control={<Radio />} label="Price" />
                                        <FormControlLabel value="date" onClick={handleRadioSort} control={<Radio />} label="Date" />
                                        <FormControlLabel value="theme" onClick={handleRadioSort} control={<Radio />} label="Theme" />
                                        <FormControlLabel value="type" onClick={handleRadioSort} control={<Radio />} label="Type" />
                                    </RadioGroup>
                                </FormControl>
                                {/* </CardContent> */}
                            </Card>
                        </Grid2>
                    </Grid2>
                    <Grid2 container rowSpacing={2} columnSpacing={2} xs={12} sm={12} md={12}>
                        {userTicketsCopy.map(ticket => (
                            <Ticket ticket={ticket} key={ticket.id} />
                        ))}
                    </Grid2>
                </Grid2>
                : <Grid2 container columnSpacing={2} className='root' sx={{ width: '80%', m: 'auto', minHeight: '200px' }}>
                    <Grid2 item xs={12} sm={2} md={2} className='no-tickets-text'>
                        <h2>My Tickets</h2>
                    </Grid2>
                    <Grid2 item xs={12} sm={10} md={10} className='no-tickets-text'>
                        <Typography variant="h4" gutterBottom>Consider buying new tickets</Typography>
                    </Grid2>
                </Grid2>
            }
        </Card>
    );
};