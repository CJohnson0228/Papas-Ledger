import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/styles';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import RegisterNoteDeleteModal from './RegisterNoteDeleteModal';
import RegisterNoteAddModal from './RegisterNoteAddModal';
import RegisterNotesInfoModal from './RegisterNotesInfoModal';

import { 
  currencyFormat, 
  dateFormat,
  SlideTransition,
  StyledTableCell, 
  StyledTableRow,  } from "../utils/coreFunctions";

function RegisterNotes(props) {
  const accounts = useSelector((state) => state.accounts);
  const [ selectedDate, handleDateChange ] = useState(new Date().getTime())
  const [ acctName, setAcctName ] = useState("");
  const theme = useTheme();
  // Add Note Modal
  const [ addNoteOpen, setAddNoteOpen ] = useState(false);
  const handleAddNoteOpen = () => setAddNoteOpen(true);
  const handleAddNoteClose = () => setAddNoteOpen(false);
  // Info Note Modal
  const [ infoOpen, setInfoOpen ] = useState(false);
  const handleInfoOpen = () => setInfoOpen(true);
  const handleInfoClose = () => setInfoOpen(false);
  // Delete Note Modal
  const [ deleteNoteOpen, setDeleteNoteOpen ] = useState(false);
  const [ deleteNote, setDeleteNote ] = useState();
  const handleDeleteNoteOpen = (data) => {
    setDeleteNote(data);
    setDeleteNoteOpen(true);
  }
  const handleDeleteNoteClose = () => setDeleteNoteOpen(false);
    
  useEffect(() => {
    if (props.selectedAccount !== undefined) {
      setAcctName(accounts[props.selectedAccount].name)
    }
  }, [ props.selectedAccount, accounts ])

  return (
    <>
      <Dialog 
        fullWidth
        maxWidth="xl"
        open={props.notesModalOpen} 
        TransitionComponent={SlideTransition} 
        transitionDuration={800}
        BackdropProps={{ style: { backgroundColor: "#000000aa" } }}
        PaperProps={{ 
          sx: { 
            width: '90vw', 
            height: '80vh', 
            backgroundColor: "#222" } }}>
              <DialogTitle 
                sx={{ 
                  backgroundColor: theme.palette.yellow.main, 
                  color: theme.palette.secondary.contrastText, 
                  textAlign: 'center' }}>
                    Register Notes for {acctName}
              </DialogTitle>
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
                    backgroundColor: '#F0D7A8',
                    borderRadius: '5px',
                  }
                }}>
                <Table 
                  stickyHeader
                  size="small" 
                  aria-label="register notes"
                  >
                  <TableHead 
                    sx={{ 
                      backgroundColor: theme.palette.yellow.dark, 
                      fontSize: '1.1rem' }}>
                        <TableRow>
                          <StyledTableCell> </StyledTableCell>
                          <StyledTableCell align="center">Date of Balance</StyledTableCell>
                          <StyledTableCell align="center">Checkbook Balance</StyledTableCell>
                          <StyledTableCell align="center">Total Outstanding</StyledTableCell>
                          <StyledTableCell align="center">Bank Balance</StyledTableCell>
                          <StyledTableCell align="right">Difference</StyledTableCell>
                        </TableRow>
                  </TableHead>
                  <TableBody>
                    {(props.selectedAccount !== undefined) 
                      ? accounts[props.selectedAccount].notes.map((row, id) => (
                          <StyledTableRow key={id} 
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell>
                                <IconButton size="small"
                                  onClick={() => handleDeleteNoteOpen(row)}
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
                              </TableCell>
                              <StyledTableCell align="center">{dateFormat(row.date)}</StyledTableCell>
                              <StyledTableCell align="center">{currencyFormat(row.CB)}</StyledTableCell>
                              <StyledTableCell align="center">{currencyFormat(row.outstanding)}</StyledTableCell>
                              <StyledTableCell align="center">{currencyFormat(row.BB)}</StyledTableCell>
                              {(row.Difference < 0)
                                ? <StyledTableCell 
                                    align="right" 
                                    style={{ color: theme.palette.error.main }}>
                                      {currencyFormat(row.Difference)}
                                  </StyledTableCell>
                                : <StyledTableCell 
                                    align="right" 
                                    style={{ color: theme.palette.success.main }}>
                                      {currencyFormat(row.Difference)}
                                  </StyledTableCell>
                              }
                          </StyledTableRow>))
                      : <></>
                    }
                  </TableBody>
                </Table>
          </TableContainer>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color='secondary'
            onClick={() => handleInfoOpen()}
            sx={{ margin: '3px 5px' }}>
            Info
          </Button>
          <Box>
            <Button
              variant="contained"
              color='yellow'
              onClick={() => handleAddNoteOpen()}
              sx={{ margin: '3px 5px' }}>
              Add Note
            </Button>
            <Button
              variant="outlined"
              color="yellow"
              onClick={() => props.handleNotesModalClose()}
              sx={{ margin: '3px 5px' }}>
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <RegisterNoteAddModal 
        addNoteOpen={addNoteOpen}
        handleAddNoteClose={handleAddNoteClose}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        setAcctName={setAcctName}
        selectedAccount={props.selectedAccount} />
      <RegisterNoteDeleteModal
        deleteNoteOpen={deleteNoteOpen}
        handleDateChange={handleDateChange}
        handleDeleteNoteClose={handleDeleteNoteClose}
        deleteNote={deleteNote}
        selectedAccount={props.selectedAccount} />
      <RegisterNotesInfoModal 
        infoOpen={infoOpen}
        handleInfoClose={handleInfoClose} />
    </>
  )
}

export default RegisterNotes