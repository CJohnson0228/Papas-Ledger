import React from 'react';
import ReactPlayer from 'react-player';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';

import heroVideo from '../assets/img/mixkit-clouds-and-blue-sky-2408.mp4';
import c130 from '../assets/img/c130-silhouette-2.png';
import stripes from '../assets/img/stripes.png';

function Splash() {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        '& video': {objectFit: 'cover'} }}>
      <ReactPlayer 
        url={heroVideo} 
        playing 
        loop 
        muted 
        width="100%" 
        height="100%" />
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%'}}>
          <Box 
            height="100%" 
            display='flex' 
            flexDirection='column' 
            justifyContent="center" 
            alignItems="center" 
            color="#fff">
              <Box 
                display='flex' 
                flexDirection='column' 
                justifyContent="center" 
                alignItems="center" 
                color="#ddd" 
                backgroundColor='#235680c1' 
                sx={{ 
                  padding: '100px 100px 10px 100px', 
                  borderRadius: '10px', 
                  border: '1px solid #333', 
                  boxShadow: '8px 8px 10px #000',
                  zIndex: '+1' }}>
                    <Typography 
                      variant="h7" 
                      sx={{ 
                        fontSize: '5rem', 
                        color: '#FBEDDA', 
                        textShadow: '3px 3px 2px #000' }}>
                          Welcome to PaPa's Ledger
                    </Typography>
                    <Typography 
                      variant="h5">
                        A Checkbook Ledger App I created for my Dad
                    </Typography>
                    <Typography 
                      variant="h5">
                        Open the menu using the button on the upper left
                    </Typography>
                    <Typography 
                      variant="h5">
                        then add a new account to get started
                    </Typography>
                    <Typography 
                      variant="h6"
                      sx={{
                        paddingTop: '50px',
                        paddingBottom: 0,
                        color: theme.palette.secondary.light,
                        textDecoration: 'underline'
                      }}>
                        Dad, click the message Icon in the upper right corner
                    </Typography>
              </Box> 
          </Box>
      </div>
      <Box 
        component='img'
        src={stripes} 
        sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          }} />
      <Box 
        component='img'
        src={c130} 
        sx={{ 
          position: 'absolute',
          bottom: '-40px',
          right: '40px',
          width: '300px',
          }} />
      <Box 
        component='img'
        src={c130} 
        sx={{ 
          position: 'absolute',
          bottom: '-40px',
          left: '40px',
          width: '300px',
          transform: 'scaleX(-1)'
          }} />
    </Box>
  )
}

export default Splash
