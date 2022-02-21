import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRegisterNote } from '../redux/accountsSlice'

import Button from '@mui/material/Button';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/styles';

import { 
  handleNoteItem,
  SlideTransition, } from '../utils/coreFunctions';

function RegisterNoteAddModal(props) {
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch()
  const [ cBBalance, setCBBalance ] = useState(0)
  const [ bankBalance, setBankBalance ] = useState(0)
  const [ outstanding, setOutstanding ] = useState(0)
  const theme = useTheme();

  useEffect(() => {
    if (props.selectedAccount !== undefined) {
      let reconciledBalance = 0;
      for (let i=0; i < accounts[props.selectedAccount].entries.length; i++) {
        if (accounts[props.selectedAccount].entries[i].reconcile === true) {
          reconciledBalance = reconciledBalance + parseFloat(accounts[props.selectedAccount].entries[i].amount)
        }
      }
      let outstandingBalance = -(accounts[props.selectedAccount].currentBalance - reconciledBalance);
      reconciledBalance = parseFloat(reconciledBalance).toFixed(2)
      props.setAcctName(accounts[props.selectedAccount].name)
      setCBBalance(parseFloat(accounts[props.selectedAccount].currentBalance).toFixed(2))
      setOutstanding(parseFloat(outstandingBalance).toFixed(2))
    }
  }, [ props.selectedAccount, accounts ])

  const handleCBBalanceChange = (event) => {
    setCBBalance(event.target.value)
  }
  const handleBankBalanceChange = (event) => {
    setBankBalance(event.target.value)
  }
  const handleOutstandingChange = (event) => {
    setOutstanding(event.target.value)
  }

  function handleAddNote( date, cBBalance, outstanding, bankBalance ) {
    let Note = handleNoteItem (date, cBBalance, outstanding, bankBalance, props.selectedAccount)
    dispatch(addRegisterNote(Note))
    props.handleAddNoteClose()
    let reconciledBalance = 0;
      for (let i=0; i < accounts[props.selectedAccount].entries.length; i++) {
        if (accounts[props.selectedAccount].entries[i].reconcile === true) {
          reconciledBalance = reconciledBalance + accounts[props.selectedAccount].entries[i].amount
        }
      }
    let outstandingBalance = parseFloat(accounts[props.selectedAccount].currentBalance - reconciledBalance).toFixed(2);
    setCBBalance(parseFloat(accounts[props.selectedAccount].currentBalance).toFixed(2))
    setBankBalance(0)
    setOutstanding(outstandingBalance)
    props.handleDateChange(new Date().getTime())
  }
  
  return (
    <form>
        <Dialog 
          fullWidth
          open={props.addNoteOpen}
          onClose={props.handleAddNoteClose}
          TransitionComponent={SlideTransition}
          transitionDuration={800} >
            <DialogTitle 
              sx={{ 
                backgroundColor: theme.palette.yellow.main, 
                color: theme.palette.secondary.contrastText, 
                textAlign: 'center' }}>
                  Add Register Note
            </DialogTitle>
            <DialogActions sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
              <FormControl variant="standard" fullWidth>
                <DesktopDatePicker 
                  renderInput={(params) =>
                    <TextField {...params}
                      variant='standard'
                      helperText='date'
                      fullWidth />}
                  value={new Date (props.selectedDate)}
                  onChange={date => props.handleDateChange(new Date(date).getTime())}
                  format="MM/dd/yyyy"
                />
              </FormControl>
              <FormControl 
                fullWidth 
                variant='standard'
                margin='normal'
                sx={{ m: 1 }}>
                  <InputLabel> Checkbook Balance </InputLabel>
                  <Input 
                    value={cBBalance} 
                    onChange={handleCBBalanceChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} />
              </FormControl>
              <FormControl 
                fullWidth 
                variant='standard'
                margin='normal'
                sx={{ m: 1 }}>
                  <InputLabel> Outstanding Items </InputLabel>
                  <Input 
                    value={outstanding} 
                    onChange={handleOutstandingChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} />
              </FormControl>
              <FormControl 
                fullWidth 
                variant='standard' 
                margin='normal'
                sx={{ m: 1 }}>
                  <InputLabel> Bank Balance </InputLabel>
                  <Input 
                    value={bankBalance} 
                    onChange={handleBankBalanceChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} />
              </FormControl>
              <Grid
                container
                justifyContent='flex-end'
                sx={{ marginTop: "10px" }}>
                <Button
                  variant="contained"
                  color="yellow"
                  sx={{ margin: '3px 5px' }}
                  onClick={() => handleAddNote(props.selectedDate, cBBalance, outstanding, bankBalance)}>
                  Add
                </Button>
                <Button
                  variant="text"
                  color="yellow"
                  sx={{ margin: '3px 5px' }}
                  onClick={() => props.handleAddNoteClose()}>
                  Cancel
                </Button>
              </Grid>
            </DialogActions>
        </Dialog>
      </form>
  )
}

export default RegisterNoteAddModal