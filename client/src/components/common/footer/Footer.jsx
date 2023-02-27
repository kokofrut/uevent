import React from 'react'
import './Footer.scss'
import { List, ListItem, ListItemIcon, ListItemText, Stack, Typography, Button } from "@mui/material";
import { GitHub, Email, Telegram, Instagram } from "@mui/icons-material";

const styles = {
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2em',
        borderTop: '1px solid rgb(211 211 211 / 71%)'
    },
    button: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        // color: 'error',
    }
}

function Footer() {
    return (
        <footer style={styles.footer}>
            {/* <Stack direction="row"> */}
            <div className='f-list-item'>
                <Button style={styles.button} color="secondary" href="https://github.com/kokofrut/uevent">
                    <GitHub />
                    <Typography gutterBottom variant='body1'>Github</Typography>
                </Button>
            </div>
            <div className='f-list-item'>
                <Button style={styles.button} color="secondary" href="https://t.me/XA12z">
                    <Telegram />
                    <Typography gutterBottom variant='body1'>Telegram</Typography>
                </Button>
            </div>
            <div className='f-list-item'>
                <Button style={styles.button} color="secondary" href="https://www.instagram.com/jebaited_by">
                    <Instagram />
                    <Typography gutterBottom variant='body1'>Instagram</Typography>
                </Button>
            </div>
            <div className='f-list-item'>
                <Button style={styles.button} color="secondary" href="mailto:arseniynikolenko07@gmail.com">
                    <Email />
                    <Typography gutterBottom variant='body1' >Email</Typography>
                </Button>
            </div>
            
            {/* </Stack> */}
        </footer>
    );
}

export default Footer;