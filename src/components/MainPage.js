import React from 'react'
import { useSelector } from 'react-redux';

import Splash from './Splash';
import Ledger from './Ledger';

function MainPage(props) {
  const accounts = useSelector((state) => state.accounts)

  return (
    <div
      style={{
        marginTop: '72px',
        height: 'calc(100vh - 72px)',
        maxHeight: 'calc(100vh - 72px)'
      }}>
      {(accounts[props.selectedAccount] === undefined)
        ? <Splash />
        : <Ledger accountSelect={props.selectedAccount} handleDeleteItemOpen={props.handleDeleteItemOpen} handleEditItemOpen={props.handleEditItemOpen} />}

    </div>
  )
}

export default MainPage