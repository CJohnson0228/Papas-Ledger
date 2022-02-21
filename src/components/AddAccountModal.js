import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount } from '../redux/accountsSlice';
import { handleBuildAccount } from '../utils/coreFunctions';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function AddAccountModal(props) {
  const accounts = useSelector((state) => state.accounts)
  const dispatch = useDispatch();
  const theme = useTheme();
  const [accountName, setAccountName] = useState('')
  const [accountOpenBalance, setAccountOpenBalance] = useState(0)
  const [accountOpenDate, setAccountOpenDate] = useState(new Date().getTime())

  const handleChangeAcctName = (event) => {
    setAccountName(event.target.value)
  }

  const handleChangeOpenBalance = (event) => {
    setAccountOpenBalance(event.target.value)
  }

  function AddNewAccount(accountName, accountOpenBalance, accountOpenDate) {
    let BuildAccount = handleBuildAccount(accountName, accountOpenBalance, accountOpenDate)
    if (accounts.findIndex(i => i.name === BuildAccount.name) !== -1) {
      props.handleAccountExistsOpen()
    } else {
      dispatch(addAccount(BuildAccount))
      props.handleAddAccountClose()
    }
    setAccountName('')
    setAccountOpenBalance(0)
    setAccountOpenDate(new Date().getTime())
  }
  return (
    <form>
      <Dialog open={props.addAccountOpen} TransitionComponent={SlideTransition} transitionDuration={800}>
        <DialogTitle sx={{ backgroundColor: theme.palette.secondary.main, color: '#2C4323' }}>
          Add a New Account
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText sx={{ marginTop: '16px' }}>
            This is used to add Accounts to the Accounts collection. Enter the Information below and the account will be added to the Database and available for use.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', paddingBottom: '12px', paddingTop: 0 }}>
          <div style={{ width: '95%' }}>
            <FormControl
              variant="standard"
              margin="normal"
              fullWidth>
              <DesktopDatePicker
                renderInput={(params) =>
                  <TextField {...params}
                    variant='standard'
                    helperText='openning date'
                    fullWidth />}
                value={new Date(accountOpenDate)}
                onChange={date => setAccountOpenDate(new Date(date).getTime())}
                format="MM/dd/yyyy"
              />
            </FormControl>
            <TextField fullWidth
              margin='normal'
              variant='standard'
              label="Account Name"
              value={accountName}
              onChange={handleChangeAcctName} sx={{ marginTop: '8px' }} />
            <TextField fullWidth
              type='number'
              margin='normal'
              variant='standard'
              label="Openning Balance"
              value={accountOpenBalance}
              onChange={handleChangeOpenBalance}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
          </div>
          <Grid
            container
            justifyContent='flex-end'
            sx={{ paddingTop: '12px' }}>
            <Button
              variant="contained"
              color='secondary'
              onClick={() => AddNewAccount(accountName, accountOpenBalance, accountOpenDate)}
              sx={{ margin: '3px 5px' }}>
              Enter
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => props.handleAddAccountClose()}
              sx={{ margin: '3px 5px' }}>
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.accountExistsOpen}
        onClose={props.handleAccountExistsClose}
        TransitionComponent={SlideTransition}>
        <DialogTitle sx={{ backgroundColor: theme.palette.error.main, color: '#DDD', textAlign: 'center' }}>
          Warning
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText sx={{ margin: '16px' }}>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              An account with that name already exists.
            </Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              Please try again with a different account name
            </Typography>
          </DialogContentText>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color='error' onClick={() => props.handleAccountExistsClose()}>
              Try Again
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </form>
  );
}

export default AddAccountModal;
