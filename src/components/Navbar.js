import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Material UI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/styles';

// MaterialUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DescriptionIcon from '@mui/icons-material/Description';

// Custom Components

import { currencyFormat } from '../utils/coreFunctions';

function Navbar(props) {
  const accounts = useSelector((state) => state.accounts)
  const [ account, setAccount ] = useState(accounts[props.selectedAccount]);
  const theme = useTheme();
  
  useEffect(() => {
    setAccount(accounts[props.selectedAccount])
  }, [props.selectedAccount])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: '72px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Toolbar>
            <IconButton
              size="large"
              onClick={props.menuBarOpen}
              edge="start"
              color="inherit"
              aria-label='menu'
              sx={{ mr: 2 }}>
                <Tooltip title="Menu">
                  <MenuIcon />
                </Tooltip>
            </IconButton>
            {(account !== undefined)
              ? <Grid container direction='row' alignItems='center'>
                  <Box sx={{ width: '300px', display: 'flex', alignItems: "center" }}>
                    <Typography 
                      variant='body2'
                      component='div'
                      align='left'
                      sx={{ 
                        color: theme.palette.ledger.banksecond, 
                        fontSize: '1.2rem', 
                        ml: 2 }}>
                          {account.name}
                    </Typography>
                      {(props.selectedAccount !== undefined)
                        ? <IconButton
                            size="large"
                            onClick={props.handleNotesModalOpen}
                            color='yellow'
                            aria-label='notes'
                            sx={{ ml: 2, border: '1px solid', padding: 1 }}>
                                <Tooltip title="Register Notes">
                                  <DescriptionIcon />
                                </Tooltip>
                          </IconButton>
                        : <></>
                      }
                  </Box>
                  <Typography
                    variant='h7'
                    component='div'
                    align='center'
                    sx={{ flexGrow: 1 }}>
                      Papa's Ledger
                  </Typography>
                  {(accounts[props.selectedAccount].currentBalance > 0)
                    ? <Typography
                        variant='body2'
                        component='div'
                        align='right'
                        sx={{
                          color: theme.palette.ledger.banksecond,
                          fontSize: '1.2rem',
                          mr: 3,
                          width: '300px' }}>
                            {currencyFormat(accounts[props.selectedAccount].currentBalance)}
                      </Typography>
                    : <Typography
                        variant='body2'
                        component='div'
                        align='right'
                        sx={{
                          color: theme.palette.error.light,
                          fontSize: '1.2rem',
                          mr: 2,
                          width: '300px' }}>
                            {currencyFormat(accounts[props.selectedAccount].currentBalance)}
                      </Typography>
                  }
                </Grid>
              : <Typography
                  variant='h7'
                  component='div'
                  align='center'
                  sx={{ flexGrow: 1 }}>
                    Papa's Ledger
                </Typography>
            }
            {(props.selectedAccount !== undefined)
              ? <IconButton
                  size='large'
                  onClick={props.handleAddItemOpen}
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 1 }}>
                    <Tooltip title="Click to Add Item">
                      <AddCircleIcon />
                    </Tooltip>
                </IconButton>
              : <IconButton
                  size='large'
                  onClick={props.handleXmasModalOpen}
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 2 }}>
                    <Tooltip title="Click Me!!!!">
                      <ModeCommentIcon />
                    </Tooltip>
                </IconButton>
            }
          </Toolbar>
        </AppBar>
    </Box>
  );
}

export default Navbar;
