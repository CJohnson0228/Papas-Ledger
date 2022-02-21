import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAccount } from './redux/accountsSlice';

import Navbar from './components/Navbar'
import MenuBar from './components/MenuBar'
import MainPage from './components/MainPage';
import AddItemModal from './components/AddItemModal';
import EditItemModal from './components/EditItemModal';
import DeleteItemModal from './components/DeleteItemModal';
import AddAccountModal from './components/AddAccountModal';
import DeleteAccountModal from './components/DeleteAccountModal';
import MerryChristmasModal from './components/MerryChristmasModal';
import RegisterNotes from './components/RegisterNotes';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterLuxon from '@mui/lab/AdapterLuxon';



function App() {
  const accounts = useSelector((state) => state.accounts)
  const [selectedAccount, setSelectedAccount] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accounts[selectedAccount] === undefined) {
      setSelectedAccount();
    }
  }, [accounts])

  function assignSelectedAccount(data) {
    setSelectedAccount(data)
    setMenuBarOpen(false)
  }

  // Christmas Modal 
  const [ xmasModalOpen, setXmasModalOpen ] = useState(false);
  const handleXmasModalOpen = () => setXmasModalOpen(true);
  const handleXmasModalClose = () => setXmasModalOpen(false);
  
  // Register Notes Modal 
  const [ notesModalOpen, setNotesModalOpen ] = useState(false);
  const handleNotesModalOpen = () => setNotesModalOpen(true);
  const handleNotesModalClose = () => setNotesModalOpen(false);

  // Add Item Modal 
  const [ addItemOpen, setAddItemOpen ] = useState(false);
  const handleAddItemOpen = () => setAddItemOpen(true);
  const handleAddItemClose = () => setAddItemOpen(false);

  // Delete Item Modal 
  const [ deleteItemOpen, setDeleteItemOpen ] = useState(false);
  const [ deleteItem, setDeleteItem ] = useState("");
  const handleDeleteItemOpen = (data) => {
    setDeleteItem(data)
    setDeleteItemOpen(true);
  }
  const handleDeleteItemClose = () => {
    setDeleteItem("");
    setDeleteItemOpen(false);
  }
  
  // Edit Item Modal 
  const [ editItemOpen, setEditItemOpen ] = useState(false);
  const [ editItem, setEditItem ] = useState("");
  const handleEditItemOpen = (data) => {
    setEditItemOpen(true);
    setEditItem(data)
  }
  const handleEditItemClose = () => setEditItemOpen(false);
  
  // Add Account Modal 
  const [ addAccountOpen, setAddAccountOpen ] = useState(false);
  const handleAddAccountOpen = () => setAddAccountOpen(true);
  const handleAddAccountClose = () => setAddAccountOpen(false);
  const [ accountExistsOpen, setAccountExistsOpen ] = useState(false);
  const handleAccountExistsOpen = () => setAccountExistsOpen(true);
  const handleAccountExistsClose = () => setAccountExistsOpen(false);

  
  // Delete Account Modal 
  const [ deleteAccountOpen, setDeleteAccountOpen ] = useState(false);
  const [ deleteAccount, setDeleteAccount ] = useState();
  const handleDeleteAccountOpen = (acct) => {
    setDeleteAccount(acct);
    setDeleteAccountOpen(true);}
  const handleDeleteAccountClose = () => setDeleteAccountOpen(false);
  
  function DeleteThisAccount() {
    dispatch(removeAccount(deleteAccount.id))
    setSelectedAccount(undefined)
    handleDeleteAccountClose()
    setMenuBarOpen(false)
  }

  // MenuBar state
  const [ menuBarOpen, setMenuBarOpen ] = useState(false);
  function toggleMenubar() {
    setMenuBarOpen(!menuBarOpen)
  }

  return (
    <div className="App" style={{ overflow: 'hidden', backgroundColor: "#444" }}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Navbar
          menuBarOpen={toggleMenubar}
          selectedAccount={selectedAccount}
          handleAddItemOpen={handleAddItemOpen}
          handleNotesModalOpen={handleNotesModalOpen}
          handleXmasModalOpen={handleXmasModalOpen} />
        <MenuBar
          setSelectedAccount={assignSelectedAccount}
          menuBarOpen={menuBarOpen}
          accounts={accounts}
          handleAddAccountOpen={handleAddAccountOpen}
          handleDeleteAccountOpen={handleDeleteAccountOpen} />
        <MainPage
          selectedAccount={selectedAccount} 
          handleEditItemOpen={handleEditItemOpen}
          handleDeleteItemOpen={handleDeleteItemOpen} />
        <AddAccountModal 
          addAccountOpen={addAccountOpen}
          handleAddAccountClose={handleAddAccountClose}
          accountExistsOpen={accountExistsOpen}
          handleAccountExistsOpen={handleAccountExistsOpen}
          handleAccountExistsClose={handleAccountExistsClose} />
        <DeleteAccountModal 
          deleteAccount={deleteAccount}
          deleteAccountOpen={deleteAccountOpen}
          deleteThisAccount={DeleteThisAccount}
          handleDeleteAccountClose={handleDeleteAccountClose} />
        <AddItemModal
          addItemOpen={addItemOpen}
          handleAddItemClose={handleAddItemClose}
          selectedAccount={selectedAccount} />
        <EditItemModal
          editItem={editItem}
          editItemOpen={editItemOpen}
          selectedAccount={selectedAccount}
          handleEditItemClose={handleEditItemClose} />
        <DeleteItemModal
          deleteItem={deleteItem}
          deleteItemOpen={deleteItemOpen}
          handleDeleteItemClose={handleDeleteItemClose}
          selectedAccount={selectedAccount} />
        <RegisterNotes
          selectedAccount={selectedAccount}
          notesModalOpen={notesModalOpen}
          handleNotesModalClose={handleNotesModalClose} />
        <MerryChristmasModal
          xmasModalOpen={xmasModalOpen}
          handleXmasModalClose={handleXmasModalClose} />
      </LocalizationProvider>
    </div>
  );
}

export default App;