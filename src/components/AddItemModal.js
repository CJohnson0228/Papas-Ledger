import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from '../redux/accountsSlice'
// MaterialUI Components
import Button from '@mui/material/Button';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
// Custom imports
import { handleBuildLedgerItem, SlideTransition, categories } from "../utils/coreFunctions";


function AddItemModal(props) {
  const dispatch = useDispatch()
  const accounts = useSelector((state) => state.accounts)
  const [ account, setAccount ] = useState();
  const [selectedDate, handleDateChange] = useState(new Date().getTime())
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [checkNum, setCheckNum] = useState();
  const [selectedPayee, setSelectedPayee] = useState("")
  const [categorySelect, setCategorySelect] = useState(categories[0])
  const [entryChoice, setEntryChoice] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#1B4264')
  const [textColor, setTitleColor] = useState('#DDD')
  const [buttonColor, setButtonColor] = useState('primary')
  
  useEffect(() => {
    if (accounts !== undefined) {
      if (props.selectedAccount !== undefined) {
        setAccount(accounts[props.selectedAccount])
      } 
    } else {
      setAccount()
    }
  }, [accounts, props.selectedAccount])
  
  const handleChange = () => {
    setEntryChoice(!entryChoice)
    if (entryChoice === false) {
      setSelectedColor('#7FB06D')
      setTitleColor('#333')
      setButtonColor('secondary')
    } else {
      setSelectedColor('#1B4264')
      setTitleColor('#DDD')
      setButtonColor('primary')
    }
  }

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value)
  }
  
  const handleCheckNumChange = (event) => {
    setCheckNum(event.target.value)
  }

  const handlePayeeChange = (event) => {
    setSelectedPayee(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategorySelect(event.target.value)
  }

  function handleAddItem(date, choice, chkNum, category, payee, amount) {
    let entryItem = handleBuildLedgerItem(date, choice, category, payee, amount, chkNum, props.selectedAccount)
    dispatch(addEntry(entryItem))
    setSelectedAmount(0)
    setSelectedPayee(" ")
    setCategorySelect(categories[0])
    handleDateChange(new Date().getTime())
    props.handleAddItemClose()
  }

  return (
    <form>
      <Dialog
        open={props.addItemOpen}
        onClose={props.handleAddItemClose}
        TransitionComponent={SlideTransition} 
        transitionDuration={800}
        sx={{ margin: 0 }}>
        <DialogTitle
          sx={{ backgroundColor: selectedColor, color: textColor, width: '500px' }}>
          <Grid container direction='row' justifyContent='space-between'>
            <Grid item>
              Add an Item
            </Grid>
            {(account !== undefined)
              ? <Grid item sx={{ color: '#E7BF73' }}>
                {account.name}
              </Grid>
              : <Grid item> - </Grid>
            }
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid
              container
              component="label"
              alignItems="center"
              justifyContent='center'
              spacing={1}>
              <Grid item>Expense</Grid>
              <Grid item>
                <Switch
                  checked={entryChoice}
                  onChange={handleChange}
                  color="secondary" />
              </Grid>
              <Grid item>Deposit</Grid>
            </Grid>
            <FormControl sx={{ m: 1 }} variant="standard" margin="normal" fullWidth>
              <DesktopDatePicker
                renderInput={(params) =>
                  <TextField {...params}
                    variant='standard'
                    helperText='date'
                    fullWidth />}
                value={new Date (selectedDate)}
                onChange={date => handleDateChange(new Date(date).getTime())}
                format="MM/dd/yyyy"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant='standard' margin='normal'>
              <InputLabel> Amount </InputLabel>
              <Input value={selectedAmount} onChange={handleAmountChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            </FormControl>

            {(entryChoice === false)
              ? <>
                <TextField margin='normal' sx={{ m: 1 }}
                  variant="standard"
                  fullWidth
                  required
                  helperText="Check Number"
                  value={checkNum}
                  onChange={handleCheckNumChange} />
                <TextField margin='normal' sx={{ m: 1 }}
                  variant="standard"
                  fullWidth
                  required
                  helperText="Payee"
                  value={selectedPayee}
                  onChange={handlePayeeChange} />
                <TextField margin='normal' sx={{ m: 1 }}
                  variant='standard'
                  fullWidth
                  select
                  value={categorySelect}
                  onChange={handleCategoryChange}
                  helperText="Category">
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </>
              : <>
                <TextField margin='normal' sx={{ m: 1 }}
                  variant='standard'
                  fullWidth
                  required
                  helperText="Source"
                  value={selectedPayee}
                  onChange={handlePayeeChange} />
              </>
            }
            <Grid
              container
              justifyContent='flex-end'
              sx={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                color={buttonColor}
                sx={{ margin: '3px 5px' }}
                onClick={() => handleAddItem(selectedDate, entryChoice, checkNum, categorySelect, selectedPayee, selectedAmount)}>
                Enter
              </Button>
              <Button
                variant="text"
                color={buttonColor}
                sx={{ margin: '3px 5px' }}
                onClick={props.handleAddItemClose}>
                Cancel
              </Button>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </form>
  )
}

export default AddItemModal
