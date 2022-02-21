import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteEntry } from '../redux/accountsSlice';

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { 
  dateFormat, 
  currencyFormat, 
  StyledTableCell, 
  StyledTableRow } from '../utils/coreFunctions';
import { useTheme } from '@mui/styles';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function DeleteItemModal(props) {
  const account = useSelector((state) => state.accounts[props.selectedAccount]);
  const dispatch = useDispatch();

  const [ itemIndex, setItemIndex ] = useState(0);
  const [ date, setDate ] = useState(new Date().getTime());
  const [ payee, setPayee ] = useState("");
  const [ amount, setAmount ] = useState(0);
  const theme = useTheme();
  
  useEffect(() => {
    if (account !== undefined) {
      setItemIndex(account.entries.findIndex(i => i.id === props.deleteItem.id))
    }
    if (props.deleteItem !== "") {
      setDate(props.deleteItem.date)
      setPayee(props.deleteItem.payee)
      setAmount(Math.abs(props.deleteItem.amount))
    }
  }, [account, props.deleteItem, itemIndex])
  
  function deleteThisItem(index) {
    let thisItem = {
      "accountIndex": props.selectedAccount,
      "itemIndex": index
    }
    dispatch(deleteEntry(thisItem))
    props.handleDeleteItemClose()
  }

  return (
    <Dialog
      TransitionComponent={SlideTransition}
      transitionDuration={800}
      open={props.deleteItemOpen}
      onClose={() => {props.handleDeleteClose()}}
      PaperProps={{style: { width: '40vw'}}}>
        <DialogTitle sx={{ backgroundColor: theme.palette.error.main, color: '#ddd'}}>
          {"Delete Item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1.5em', paddingTop: 4, paddingBottom: 2, color: '#333', textAlign: 'center'}}>
            Are you sure you wish to delete this entry? 
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="center">Payee/Source</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="left">{dateFormat(date)}</StyledTableCell>
                  <StyledTableCell align="center">{payee}</StyledTableCell>
                  <StyledTableCell align="center">{currencyFormat(amount)}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>  
          </TableContainer>
          <DialogContentText sx={{ fontSize: '1.5em', paddingTop: 2, color: '#333', textAlign: 'center'}}>
            This action is PERMANENT
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => deleteThisItem(itemIndex)}>Yes</Button>
          <Button variant="contained" color="primary" onClick={() => props.handleDeleteItemClose()}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DeleteItemModal
