import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Slide from '@mui/material/Slide';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { withStyles, styled } from '@mui/styles';

export const categories = [
  " ", 
  "Cash",
  "Entertainment", 
  "Food", 
  "Insurance",  
  "Investment", 
  "Loan Payment",
  "Medical/Healthcare",
  "Mortgage", 
  "Personal Spending", 
  "Rent", 
  "Savings", 
  "Transportation",
  "Utilities",
]

export const itemBase = { "item": { "date": 0, "payee": "", "category": "", "amount": 0 } }

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: '2px 16px',
    fontSize: '1rem'
  },
  head: {
    backgroundColor: '#333',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    border: 0,
    padding: '2px 16px'
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    padding: '2px 16px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.ledger.bankmain,
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.ledger.banksecond,
    }
  }
}))(TableRow);

export const StyledTabs = styled((props) => 
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}/>)(
    ({ theme }) => ({
        height: '35px',
        minHeight: '35px',
        '& .MuiTabs-flexContainer': {
          height: '35px',
          minHeight: '35px',
        },
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: theme.palette.secondary.light,
      },
    })
  );

export const StyledTab = styled((props) => 
  <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      fontSize: '1rem',
      color: '#ffffffa0',
      height: '30px',
      paddingTop: 0,
      '&.Mui-selected': {
        color: theme.palette.secondary.light,
      },
      '&.Mui-focusVisible': {
        backgroundColor: theme.palette.secondary.light,
      },
    }),
  );

export function dateFormat(dateString) {
  let jsonDate = JSON.parse(dateString);
  let date = new Date(jsonDate)
  var newDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  return (newDate);
};

export function currencyFormat(number) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (formatter.format(number));
};

export function handleBuildAccount(name, openBalance, openDate) {
  let balance = Number(openBalance)
  var jsonDate = JSON.stringify(openDate)
  let auid = uuidv4()
  let iuid = uuidv4()
  let thisAccount = {
    "name": name,
    'id': auid,
    "openningBalance": balance,
    "currentBalance": balance,
    "entries": [
      {
        "date": jsonDate,
        'id': iuid,
        "payee": "Openning Balance",
        "amount": balance,
        "reconcile": true,
      }],
      "notes": []
  }
  return (thisAccount)
}

export function handleBuildLedgerItem(date, choice, category, payee, amount, checkNum, accountSelect) {
  let itemAmount = 0
  let iuid = uuidv4()
  var jsonDate = JSON.stringify(new Date(date).getTime())
  if (choice === true) {
    itemAmount = parseFloat(amount).toFixed(2)
  } else {
    itemAmount = -parseFloat(amount).toFixed(2)
  }
  let entryData = {
    "selectedAccount": accountSelect,
    "entry": [
      {
        "date": jsonDate,
        'id': iuid,
        'checkNum': checkNum,
        "payee": payee,
        "category": category,
        "amount": itemAmount,
        "balance": 0,
        "reconcile": false,
      }]
  }
  return (entryData)
}

export function handleNoteItem( date, checkbookBalance, outstandingItems, bankBalance, accountSelect ) {
  let CB = parseFloat(checkbookBalance)
  let BB = parseFloat(bankBalance)
  let outstanding = parseFloat(outstandingItems)
  let Diff = CB+outstanding-BB;
  Diff = parseFloat(Diff).toFixed(2);
  var jsonDate = JSON.stringify(new Date(date).getTime())

  let noteData = {
    "selectedAccount": accountSelect,
    "entry": [
      {
        "date": jsonDate,
        'CB': CB,
        "outstanding": outstanding,
        "BB": BB,
        "Difference": Diff,
      }]
  }
  return (noteData)
}

export function generateYearTabData(account) {
  let years = []
  for (let i = 0; i < account.entries.length; i++) {
    let date = new Date(parseInt(account.entries[i].date, 10))
    let year = date.getFullYear()
    if (years.indexOf(year) === -1) {
      years.push(year)
    }
  }
  return (years)
}
export function generateMonthTabData( dataYear, years, account ) {
  let months = []
  for (let i = 0; i < account.entries.length; i++) {
    let date = new Date(parseInt(account.entries[i].date, 10))
    let month = date.getMonth()
    let year = date.getFullYear()
    if ( year === years[dataYear] ) {
      if (months.indexOf(monthNames[month]) === -1 ) {
        months.push(monthNames[month])
      }
    }
  }
  return (months)
}