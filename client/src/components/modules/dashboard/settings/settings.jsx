import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import './settings.scss';

const Settings = ({ userData }) => {
  const [name, setName] = useState(userData.name || '');
  const [surname, setSurname] = useState(userData.surname || '');
  const [email, setEmail] = useState(userData.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Card className="settings" sx={{ borderRadius: '15px' }}>
      <div className='settings-wrapper'>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Typography variant="h5" align='left'>User Settings</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Surname"
                fullWidth
                margin="normal"
                variant="outlined"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align='left'>Email Settings</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align='left'>Password Settings</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Old Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type='button' variant="contained" color="primary" sx={{ m: '15px' }}>Save Changes</Button>
        </Grid>
      </div>
    </Card>
  );
};

export default Settings;




