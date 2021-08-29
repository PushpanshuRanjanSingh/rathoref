import React from 'react'

export const defaultStoreContext = {
  adding: true,
  pathName: '/',
  filter:{},
  setPathName: () => { },
  setFilter: () => { },
}

const StoreContext = React.createContext(defaultStoreContext)

export default StoreContext