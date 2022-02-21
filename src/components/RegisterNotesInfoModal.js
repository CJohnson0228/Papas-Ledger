import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/styles';

import { SlideTransition } from "../utils/coreFunctions";

function RegisterNotesInfoModal(props) {
  const theme = useTheme();
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.infoOpen}
      onClose={props.handleInfoClose}
      TransitionComponent={SlideTransition} 
      transitionDuration={800}
      BackdropProps={{ style: { backgroundColor: "transparent" } }}
        PaperProps={{ 
          sx: { 
            width: '90vw', 
            backgroundColor: '#333' } }}>
              <DialogTitle 
                sx={{ 
                  border: '2px solid',
                  borderColor: theme.palette.yellow.contrastText,
                  fontSize: '1.5rem',
                  backgroundColor: theme.palette.yellow.main, 
                  color: theme.palette.secondary.contrastText, 
                  textAlign: 'center' }}>
                {"Register Notes Information"}
              </DialogTitle>
        <DialogContent>
          <DialogContentText 
            sx={{ 
              color: '#222',
              fontSize: '1.2rem', 
              mt: 2,
              p: 2,
              border: '2px solid',
              borderColor: theme.palette.error.main,
              borderRadius: '20px',
              backgroundColor: '#F0ABA8' }}>
            If the Difference is <span style={{ color: theme.palette.error.main, fontWeight: 'bold' }}> RED </span> 
            then the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Bank Balance</span> shows a higher balance than the <span style={{ textDecoration: 'underline', color: theme.palette.secondary.dark }}>Register Balance (You)</span>.
          </DialogContentText>
          <DialogContentText
            sx={{ 
              color: '#222',
              fontSize: '1.2rem', 
              my: 3,
              p: 2,
              border: '2px solid',
              borderColor: theme.palette.success.main,
              borderRadius: '20px',
              backgroundColor: '#D3E4CD' }}>
            If the Difference is <span style={{ color: theme.palette.success.main, fontWeight: 'bold' }}>GREEN</span> then the <span style={{ textDecoration: 'underline', color: theme.palette.secondary.dark }}>Register Balance (You)</span> shows a higher balance than the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Bank Balance</span>.
          </DialogContentText>
          <DialogContentText
            sx={{ 
              color: '#222',
              fontSize: '1.2rem', 
              p: 2,
              mb: 3,
              border: '2px solid',
              borderColor: theme.palette.primary.main,
              borderRadius: '20px',
              backgroundColor: '#9FC4E5' }}>
            When Adding a Note, this program automatically fills the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Checkbook Balance</span> and the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Outstanding Balance</span> based on the items in the Ledger's reconcile status. All non-reconciled items are used to create the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Outstanding item balance</span>, while the Checkbook balance is automatically filled with the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Current Balance</span> from the Ledger. <br/>

            These can be freely changed by manually inputing the desired amounts.
          </DialogContentText>
          <DialogContentText
            sx={{ 
              color: '#222',
              fontSize: '1.2rem', 
              p: 2,
              border: '2px solid',
              borderColor: theme.palette.primary.main,
              borderRadius: '20px',
              backgroundColor: '#9FC4E5' }}>
            If the Outstanding Items calculation shows a <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>NEGATIVE</span> number, this means you have outstanding <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>DEPOSITS</span> that are not reconciled. This is not a problem for the software and if the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Bank Balance</span> is inputed and does NOT actually contain the deposits, then the <span style={{ textDecoration: 'underline', color: theme.palette.primary.main }}>Difference</span> will still be calculated correctly.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
              color='yellow'
              onClick={() => props.handleInfoClose()}
              sx={{ margin: '3px 5px' }}>
            OK
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default RegisterNotesInfoModal