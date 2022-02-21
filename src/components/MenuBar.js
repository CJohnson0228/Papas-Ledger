import React from 'react'
import { useSelector } from 'react-redux'
// Material UI v5 Component imports
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useTheme } from '@mui/styles';
// Material-icon imports
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeleteIcon from '@mui/icons-material/Delete';
// Custom Function & Component imports

function MenuBar(props) {
  const accounts = useSelector((state) => state.accounts)
  const theme = useTheme();
  
  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      padding: '10px',
      backgroundColor: theme.palette.error.dark,
      color: 'white',
      boxShadow: theme.shadows[2],
    },
  }));

  
    
  return <>
      <Fade in={props.menuBarOpen}>
        <Drawer
          BackdropProps={{ invisible: true }}
          key={new Date().getTime()}
          open={true}
          variant="permanent"
          anchor='left'
          PaperProps={{ elevation: 4 }}
          sx={{
            width: 320,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 320,
              boxSizing: 'border-box',
              backgroundColor: "#333"
            }
          }}>
          <Toolbar 
            sx={{ marginTop: '80px' }}>
            <List 
              sx={{ 
                width: '100%', 
                color: "#CCC" }} >
              <ListItem 
                sx={{ 
                  paddingLeft: (theme) => theme.spacing(6) }}>
                <ListItemIcon 
                  sx={{ color: "#CCC" }}>
                    <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Banking Ledgers" />
              </ListItem>
              <Divider 
                sx={{ 
                  backgroundColor: "#CCC", 
                  marginBottom: (theme) => theme.spacing(2) }} />
              {(accounts.length > 0)
                ? accounts.map((acct, i) => (
                  <ListItem 
                    button 
                    key={i}  
                    onClick={() => props.setSelectedAccount(i)}
                    sx={{
                      borderRadius: '10px',
                      [`&:hover`]: {
                        backgroundColor: theme.palette.primary.main,
                        [`& .MuiListItemText-root`]: {
                          color: '#E7BF73',
                        },
                        [`& .MuiListItemIcon-root`]: {
                          [`& .MuiSvgIcon-root`]: {
                            color: '#E7BF73',
                          }
                        },
                      }
                    }}>
                    <ListItemText 
                      primary={acct.name} 
                      sx={{ color: "#E7BF73" }} />
                    <ListItemSecondaryAction>
                      <StyledTooltip 
                        title="Delete This Account"
                        placement="bottom" 
                        TransitionComponent={Fade} 
                        enterDelay={800}>
                          <IconButton 
                            edge="end" 
                            aria-label="delete" 
                            color="inherit" 
                            onClick={() => props.handleDeleteAccountOpen(acct)}
                            sx={{
                              [`&:hover`]: {
                                backgroundColor: theme.palette.error.dark
                              }
                            }}>
                              <DeleteIcon />
                          </IconButton>
                      </StyledTooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
                : <ListItem 
                    sx={{ textAlign: "center" }}>
                  <ListItemText 
                    primary="No Accounts Added" 
                    sx={{ color: "#E7BF73" }} />
                </ListItem>
              }
              <Divider 
                sx={{ 
                  backgroundColor: "#CCC", 
                  marginTop: (theme) => theme.spacing(2) }} />
              <ListItem button
                onClick={() => props.handleAddAccountOpen()}
                sx={{
                  paddingLeft: (theme) => theme.spacing(6),
                  marginTop: '10px',
                  borderRadius: '10px',
                  [`&:hover`]: {
                    backgroundColor: '#ADCDA2',
                    [`& .MuiListItemText-root`]: {
                      color: '#2C4323',
                    },
                    [`& .MuiListItemIcon-root`]: {
                      [`& .MuiSvgIcon-root`]: {
                        color: '#2C4323',
                      }
                    },
                  }
                }}>
                <ListItemText 
                  primary='Add New Account' 
                  sx={{ color: theme.palette.secondary.light }} />
                <ListItemIcon >
                  <AddCircleIcon 
                    sx={{ color: theme.palette.secondary.light }} />
                  </ListItemIcon>
              </ListItem>
            </List>
          </Toolbar>
        </Drawer>
      </Fade>
    </>;
}

export default MenuBar;
