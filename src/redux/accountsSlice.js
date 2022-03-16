import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount(state, action) {
      state.push(action.payload)
    },
    removeAccount(state, action) {
      let id = state.findIndex(x => x.id === action.payload)
      state.splice(id, 1)
    },
    addEntry(state, action) {
      var index = action.payload.selectedAccount
      var entry = action.payload.entry[0]
      state[index].entries.push(entry)
      state[index].entries.sort(function (a, b) {
        if (a.payee === "Openning Balance") return -1
        if (b.payee === "Openning Balance") return 1
        var jsonDateA = JSON.parse(a.date)
        var jsonDateB = JSON.parse(b.date)
        var dateA = new Date(jsonDateA).getTime()
        var dateB = new Date(jsonDateB).getTime()
        return dateA > dateB ? 1 : -1;
      })
    },
    deleteEntry(state, action) {
      var accountIndex = action.payload.accountIndex
      var itemIndex = action.payload.itemIndex
      state[accountIndex].entries.splice(itemIndex, 1)
    },
    editEntry(state, action) {
      var accountIndex = action.payload.entry.selectedAccount
      var itemIndex = action.payload.itemIndex
      state[accountIndex].entries[itemIndex] = action.payload.entry.entry[0]
      state[accountIndex].entries.sort(function (a, b) {
        if (a.payee === "Openning Balance") return -1
        if (b.payee === "Openning Balance") return 1
        var jsonDateA = JSON.parse(a.date)
        var jsonDateB = JSON.parse(b.date)
        var dateA = new Date(jsonDateA).getTime()
        var dateB = new Date(jsonDateB).getTime()
        return dateA > dateB ? 1 : -1;
      })
    },
    updateEntryBalance(state, action) {
      var index = action.payload.account
      var entry = action.payload.key
      state[index].entries[entry].balance = action.payload.balance
    },
    updateCurrentBalance(state, action) {
      var index = action.payload.key
      state[index].currentBalance = action.payload.balance
    },
    reconcileItem(state, action) {
      var index = action.payload.accountIndex
      var item = action.payload.id
      var newState = action.payload.reconcile
      state[index].entries[item].reconcile = newState
    },
    addRegisterNote(state, action) {
      var index = action.payload.selectedAccount
      var entry = action.payload.entry[0]
      state[index].notes.push(entry)
    },
    deleteRegisterNote(state, action) {
      state[action.payload.acct].notes.splice( action.payload.index, 1)
      state[action.payload.acct].notes.sort(function (a, b) {
        var jsonDateA = JSON.parse(a.date)
        var jsonDateB = JSON.parse(b.date)
        var dateA = new Date(jsonDateA).getTime()
        var dateB = new Date(jsonDateB).getTime()
        return dateA > dateB ? 1 : -1
      })
    },
    updateFromBackup(state, action) {
      state.splice(0);
      for (let i = 0; i < action.payload.length; i++) {
        state.push(action.payload[i])
      }
    }
  }
})

export const { addAccount } = accountsSlice.actions
export const { removeAccount } = accountsSlice.actions
export const { deleteEntry } = accountsSlice.actions
export const { editEntry } = accountsSlice.actions
export const { addEntry } = accountsSlice.actions
export const { updateEntryBalance } = accountsSlice.actions
export const { updateCurrentBalance } = accountsSlice.actions
export const { reconcileItem } = accountsSlice.actions
export const { addRegisterNote } = accountsSlice.actions
export const { deleteRegisterNote } = accountsSlice.actions
export const { updateFromBackup } = accountsSlice.actions

export default accountsSlice.reducer;