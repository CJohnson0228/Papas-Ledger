import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFromBackup } from '../redux/accountsSlice';
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
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BookIcon from '@mui/icons-material/Book';
// Custom Function & Component imports
const { ipcRenderer } = window.require('electron');

function MenuBar(props) {
  const dispatch = useDispatch();
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

  const saveFile = () => {
    ipcRenderer.send('saveFile', accounts)
    ipcRenderer.on('savereply', (event, arg) => {
      console.log("reply recieved", arg)
      alert("File Saved")
    })
  }
  
  const loadFile = () => {
    ipcRenderer.send('loadFile')
    ipcRenderer.on('error', (event, arg) => {
      console.log('error' + arg);
      return
    })
    ipcRenderer.on('fileData', (event, arg) => {
      let newState = JSON.parse(arg)
      alert("Backup Loaded")
      dispatch(updateFromBackup(newState))
      return
    })

  }
  
    
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
                <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                  <AddCircleIcon 
                    sx={{ color: theme.palette.secondary.light }} />
                  </ListItemIcon>
              </ListItem>
              <ListItem 
                sx={{ 
                  paddingLeft: (theme) => theme.spacing(6),
                  marginTop: (theme) => theme.spacing(4) }}>
                <ListItemIcon 
                  sx={{ color: "#CCC" }}>
                    <BookIcon />
                </ListItemIcon>
                <ListItemText primary="File Operations" />
              </ListItem>
              <Divider 
                sx={{ 
                  backgroundColor: "#CCC" }} />
              {/* ================= Save Backup ========================= */}
              <ListItem button
                onClick={() => saveFile()}
                sx={{
                  marginTop: '10px',
                  borderRadius: '10px',
                  [`&:hover`]: {
                    backgroundColor: "#8FBAE0",
                    [`& .MuiListItemText-root`]: {
                      color: '#222222',
                    },
                    [`& .MuiListItemIcon-root`]: {
                      [`& .MuiSvgIcon-root`]: {
                        color: '#222222',
                      }
                    },
                  }
                }}>
                <ListItemText 
                  primary='Save Ledger Backup' 
                  sx={{ color: "#8FBAE0" }} />
                <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                  <DownloadIcon 
                    sx={{ color: "#8FBAE0" }} />
                </ListItemIcon>
              </ListItem>
              {/* ================= Load Backup ========================= */}
              <ListItem button
                onClick={() => loadFile()}
                sx={{
                  marginTop: '10px',
                  borderRadius: '10px',
                  [`&:hover`]: {
                    backgroundColor: "#E7BF73",
                    [`& .MuiListItemText-root`]: {
                      color: '#222222',
                    },
                    [`& .MuiListItemIcon-root`]: {
                      [`& .MuiSvgIcon-root`]: {
                        color: '#222222',
                      }
                    },
                  }
                }}>
                <ListItemText 
                  primary='Load Ledger Backup' 
                  sx={{ color: "#E7BF73" }} />
                <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                  <FileUploadIcon 
                    sx={{ color: "#E7BF73" }} />
                  </ListItemIcon>
              </ListItem>
              <Divider 
                sx={{ 
                  marginTop: '10px',
                  backgroundColor: "#CCC" }} />
            </List>
          </Toolbar>
        </Drawer>
      </Fade>
    </>;
}

export default MenuBar;
