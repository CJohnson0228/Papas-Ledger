import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRegisterNote } from '../redux/accountsSlice'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useTheme } from '@mui/styles';

import { 
  dateFormat,
  SlideTransition, 
  currencyFormat, 
  StyledTableCell, 
  StyledTableRow } from '../utils/coreFunctions';

function RegisterNoteDeleteModal(props) {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts);
  const theme = useTheme();

  function handleDeleteNote( data ) {
    let index = accounts[props.selectedAccount].notes.findIndex( item => item.date === data.date )
    let Note = {
      "index": index,
      "acct": props.selectedAccount
    }
    dispatch(deleteRegisterNote(Note))
    props.handleDeleteNoteClose()
    props.handleDateChange(new Date().getTime())
  }

  return (
    <Dialog
        fullwidth
        maxWidth="md"
        TransitionComponent={SlideTransition}
        transitionDuration={800}
        open={props.deleteNoteOpen}
        onClose={() => props.handleDeleteNoteClose()}
        PaperProps={{ 
          sx: { 
            width: '90vw', 
            backgroundColor: '#bbb' }
          }}>
          <DialogTitle 
            sx={{ 
              backgroundColor: theme.palette.error.main, 
              color: '#ddd', 
              textAlign: 'center' }}>
                {"Delete Note"}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#bbb' }} >
            <DialogContentText sx={{ 
              fontSize: '1.5em', 
              paddingTop: 4, 
              paddingBottom: 2, 
              color: '#333', 
              textAlign: 'center' }}>
                Are you sure you wish to delete this note? 
            </DialogContentText>
            <DialogContentText sx={{ 
              fontSize: '1.8em', 
              paddingTop: 2, 
              paddingBottom: 2, 
              borderTop: "1px solid", 
              borderBottom: '1px solid', 
              borderColor: theme.palette.error.main, 
              color: theme.palette.error.main, 
              textAlign: 'center'}}>
                {(props.deleteNote !== undefined) 
                  ? 
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">Date</StyledTableCell>
                          <StyledTableCell align="center">Current Balance</StyledTableCell>
                          <StyledTableCell align="center">Outstanding Items</StyledTableCell>
                          <StyledTableCell align="right">Bank Balance</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell align="left">
                            {dateFormat(props.deleteNote.date)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {currencyFormat(props.deleteNote.CB)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {currencyFormat(props.deleteNote.outstanding)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {currencyFormat(props.deleteNote.BB)}
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>  
                  </TableContainer>
                  : ""
                } 
            </DialogContentText>
            <DialogContentText 
              sx={{ 
                fontSize: '1.5em', 
                paddingTop: 2, 
                color: '#333', 
                textAlign: 'center' }}>
                  This action is PERMANENT
            </DialogContentText>
          </DialogContent>
          <DialogActions 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDeleteNote(props.deleteNote)}>
                    Yes
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => props.handleDeleteNoteClose()}>
                    Cancel
                </Button>
          </DialogActions>
      </Dialog>
  )
}

export default RegisterNoteDeleteModal