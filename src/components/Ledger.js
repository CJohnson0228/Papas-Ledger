import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';

import { useTheme } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import { 
  currencyFormat, 
  generateYearTabData, 
  generateMonthTabData, 
  dateFormat,
  StyledTableCell, 
  StyledTableRow, 
  StyledTabs, 
  StyledTab,
  monthNames } from '../utils/coreFunctions';

import { 
  updateEntryBalance, 
  updateCurrentBalance, 
  reconcileItem } from '../redux/accountsSlice';

function Ledger(props) {
  const account = useSelector((state) => state.accounts[props.accountSelect]);
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const [ years, setYears ] = useState([])
  const [ currentYear, setCurrentYear ] = useState(0)
  const [ months, setMonths ] = useState([])
  const [ currentMonth, setCurrentMonth ] = useState(0)
  const [ entries, setEntries ] = useState([])

  useEffect(() => {
    let currentBalance = parseFloat(account.entries[0].amount)
    for (let i = 1; i < account.entries.length; i++) {
      let amount = parseFloat(account.entries[i].amount)
      currentBalance = currentBalance + amount
      let payload = { "key": i, "balance": currentBalance, "account": props.accountSelect }
      dispatch(updateEntryBalance(payload))
    }
    let payload = { "key": props.accountSelect, "balance": currentBalance }
    dispatch(updateCurrentBalance(payload))
  }, [account])

  useEffect(() => {
    setYears(generateYearTabData(account))
  }, [props.accountSelect])

  useEffect(() => {
    setMonths(generateMonthTabData(currentYear, years, account))
  }, [ currentYear, years, account ])

  useEffect(() => {
    setCurrentMonth((months !== []) ? months.length - 1 : 0)
  }, [ months ])
  
  useEffect(() => {
    setCurrentYear((years !== []) ? years.length - 1 : 0)
  }, [ years ])

  useEffect(() => {
    if (props.accountSelect !== undefined) {
      const entries = account.entries.filter(element => { 
        let year = new Date(parseInt(element.date)).getFullYear()
        let month = new Date(parseInt(element.date)).getMonth()
        return( year === years[currentYear] && monthNames[month] === months[currentMonth])
        })
      setEntries(entries)
    }
  }, [currentYear, currentMonth, account, months, years, props.accountSelect])

  const handleYearChange = (event, newValue) => {
    setCurrentYear(newValue);
    setMonths(generateMonthTabData(newValue, years, account))
  };
  
  const handleMonthChange = (event, newValue) => {
    setCurrentMonth(newValue);
  };

  function handleReconcile(itemID, reconState) {
    let newState = !reconState
    let id = account.entries.findIndex(i => i.id === itemID )
    let item = { "id": id, "reconcile": newState, "accountIndex": props.accountSelect }
    dispatch(reconcileItem(item))
  }

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" sx={{ backgroundColor: '#444', color: theme.palette.yellow.main }}>
        <StyledTabs value={currentYear} variant="scrollable" scrollButtons="auto" textColor="inherit"
          onChange={handleYearChange}>
            {years.map((year) => (
              <StyledTab label={year} />
            ))}
        </StyledTabs>
      </Box>
      <Box display="flex" justifyContent="center" width="100%" sx={{ backgroundColor: '#444' }}>
        <StyledTabs value={currentMonth} sx={{ marginBottom: "5px" }}
          onChange={handleMonthChange}>
            {months.map((month) => (
              <StyledTab label={month} />
            ))}
        </StyledTabs>
      </Box>
      <TableContainer component={Paper}
        sx={{
          borderRadius: 0,
          maxHeight: 'calc(100vh - 180px)',
          padding: 0,
          [`&::-webkit-scrollbar`]: {
            width: '0.5em'
          },
          [`&::-webkit-scrollbar-track`]: {
            backgroundColor: '#333'
          },
          [`&::-webkit-scrollbar-thumb`]: {
            backgroundColor: '#54728B',
            borderRadius: '5px',
          }
        }}>
        <Table stickyHeader size="small" aria-label="ledger" >
          <TableHead>
            <TableRow sx={{ border: 0 }}>
              <StyledTableCell style={{ width: '7vw' }}> </StyledTableCell>
              <StyledTableCell style={{ width: '3vw', textAlign: 'center' }}>Rec.</StyledTableCell>
              <StyledTableCell style={{ width: '8vw', textAlign: 'center' }}>Date</StyledTableCell>
              <StyledTableCell style={{ width: '12vw', textAlign: 'center' }}>Chk#</StyledTableCell>
              <StyledTableCell align="left">Payee</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell style={{ width: '10vw', textAlign: 'center' }}>Debit</StyledTableCell>
              <StyledTableCell style={{ width: '10vw', textAlign: 'center' }}>Credit</StyledTableCell>
              <StyledTableCell style={{ width: '10vw', textAlign: 'right' }}>Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Create a New Array Based on the Year and Month and use that Array to Map ledger */}
            {entries.map((row, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell align="center" component="td" scope="row"
                  style={{ padding: '2px 8px' }}>
                  {/* Add functionality of delete Item Button to IconButton */}
                  {(row.reconcile === true)
                    ? <div> </div>
                    : <div>
                        <IconButton size="small"
                          onClick={() => props.handleDeleteItemOpen(row)}
                          sx={{
                            marginRight: '2px',
                            [`&:hover`]: {
                              color: '#ddd',
                              backgroundColor: theme.palette.error.dark
                            }
                          }}>
                          <Tooltip arrow title="Delete This Item" placement="right"
                            TransitionComponent={Fade} enterDelay={800}>
                            <HighlightOffIcon />
                          </Tooltip>
                        </IconButton>
                        <IconButton size="small"
                          onClick={() => props.handleEditItemOpen(row, id, props.accountSelect)}
                          sx={{
                            marginLeft: '2px',
                            [`&:hover`]: {
                              color: '#ddd',
                              backgroundColor: theme.palette.primary.main
                            }
                          }}>
                          <Tooltip arrow title="Edit This Item" placement="right"
                            TransitionComponent={Fade} enterDelay={800}>
                            <EditIcon />
                          </Tooltip>
                        </IconButton>
                      </div>
                  }
                </StyledTableCell>
                <StyledTableCell component="td" align="center" scope="row">
                  {(row.payee === "Openning Balance") 
                    ? <Checkbox checked={row.reconcile} />
                    : <Checkbox checked={row.reconcile} onClick={() => handleReconcile(row.id, row.reconcile)}/>
                  }
                  
                </StyledTableCell>
                <StyledTableCell component="td" align="center" scope="row">
                  {dateFormat(row.date)}
                </StyledTableCell>
                <StyledTableCell component="td" align="center" scope="row">
                  {(row.checkNum === undefined) 
                    ? " "
                    : row.checkNum
                  }
                </StyledTableCell>
                <StyledTableCell component="td" align="left">
                  {row.payee}
                </StyledTableCell>
                <StyledTableCell component="td" align="center">
                  {row.category}
                </StyledTableCell>
                  {(row.amount < 0)
                    ? <StyledTableCell component="td" align="center" style={{ color: theme.palette.error.main}}>{currencyFormat(Math.abs(row.amount))}</StyledTableCell>
                    : <StyledTableCell component="td" align="center"> </StyledTableCell>}
                  {(row.amount > 0)
                    ? <StyledTableCell component="td" align="center" style={{ color: theme.palette.success.main}}>{currencyFormat(row.amount)}</StyledTableCell>
                    : <StyledTableCell component="td" align="center"> </StyledTableCell>}
                  {(row.payee === "Openning Balance")
                    ? <StyledTableCell component="td" align="right">{currencyFormat(row.amount)}</StyledTableCell>
                    : [(row.balance > 0)
                      ? <StyledTableCell component="td" align="right">{currencyFormat(row.balance)}</StyledTableCell>
                      : <StyledTableCell component="td" align="right" style={{ color: theme.palette.error.main, fontWeight: 'bold' }}>{currencyFormat(Math.abs(row.balance))}</StyledTableCell>]}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) ;
}

export default Ledger;
