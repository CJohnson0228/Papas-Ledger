import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';

function MerryChristmasModal(props) {
  const theme = useTheme();
  
  return (
    <Modal
        open={props.xmasModalOpen}
        onClose={props.handleXmasModalClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          color: theme.palette.secondary.light,
          bgcolor: '#333',
          border: '2px solid',
          borderColor: theme.palette.secondary.light,
          borderRadius: '40px',
          boxShadow: 24,
          p: 6 }}>
            <Typography 
              variant="h7" 
              component="h2" 
              sx={{ 
                fontSize: '3rem', 
                textAlign: 'center', 
                paddingBottom: 4 }}>
                  Merry "Late" Christmas!!!!
            </Typography>
            <Typography 
              variant="h7" 
              component="p" 
              sx={{ 
                color: '#ddd', 
                paddingBottom: 2 }}>
                  Dad,
            </Typography>
            <Typography 
              variant="h7" 
              component="p" 
              sx={{ color: '#ddd' }}>
                I was supposed to have it finished by Christmas but life happened, Hope you like this better than Excel!!!
            </Typography>
            <Typography 
              variant="h7" 
              component="p" 
              sx={{ 
                color: '#ddd', 
                paddingBottom: 2 }}>
                  Love you!!!
            </Typography>
            <Typography 
              variant="h7" 
              component="p" 
              sx={{ 
                textAlign: 'right', 
                color: '#ddd' }}>
                  - Chris
            </Typography>
        </Box>
      </Modal>
  )
}

export default MerryChristmasModal;
