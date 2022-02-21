import React from 'react';

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/styles';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function DeleteAccountModal(props) {
  const theme = useTheme();
  let name="";
  if (props.deleteAccount !== undefined) {
    name=props.deleteAccount.name 
  } 

  return (
    <Dialog
      TransitionComponent={SlideTransition}
      transitionDuration={800}
      open={props.deleteAccountOpen}
      onClose={() => {props.handleDeleteAccountClose()}}
      PaperProps={{style: {width: '40vw'}}}>
        <DialogTitle sx={{ backgroundColor: theme.palette.error.main, color: '#ddd'}}>
          {"Delete Account"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText sx={{ fontSize: '1.5em', paddingTop: 4, paddingBottom: 2, color: '#333', textAlign: 'center'}}>
            Are you sure you wish to delete this account? 
          </DialogContentText>
          <DialogContentText sx={{ 
            fontSize: '2rem', 
            paddingTop: 2, 
            paddingBottom: 2, 
            border: "2px solid",
            borderRadius: '30px', 
            fontWeight: 'bold',
            borderColor: '#333', 
            color: '#333',
            backgroundColor: "#F0ABA8", 
            textAlign: 'center'}}>
              {name} 
          </DialogContentText>
          <DialogContentText sx={{ fontSize: '1.5em', paddingTop: 2, color: '#333', textAlign: 'center'}}>
            This action is <span style={{ color: theme.palette.error.main, fontWeight: 'bold' }}>PERMANENT</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => props.deleteThisAccount(props.deleteAccount)}>Yes</Button>
          <Button variant="contained" color="primary" onClick={() => props.handleDeleteAccountClose()}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DeleteAccountModal;
