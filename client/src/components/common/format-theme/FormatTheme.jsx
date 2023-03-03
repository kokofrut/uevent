import React from 'react'
import { Tooltip, Typography, Box, Zoom } from '@mui/material'
function FormatTheme({eventData}) {
    return (
        <div className="event-tf">
            <Tooltip TransitionComponent={Zoom} title="Event format">
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
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="Event theme">
                <Box
                    sx={{
                        backgroundColor: "rgba(190, 219, 235, 0.8)",
                        borderRadius: "20px",
                        padding: "0.5em 1em",
                        width: 'fit-content',
                        margin: '0.5em 0.5em 1.5em 0.5em'
                    }}
                >
                    <Typography>{eventData.theme ? eventData.theme : 'Choose theme...'}</Typography>
                </Box>
            </Tooltip>
        </div>
    )
}

export default FormatTheme