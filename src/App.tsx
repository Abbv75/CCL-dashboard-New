import { BrowserRouter } from 'react-router-dom'
import Router from './Routes'
import { AppContext } from './providers/AppContext'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { USER_T } from './types'

const App = () => {
  const [currentUser, setcurrentUser] = useState(undefined as undefined | USER_T);

  return (
    <AppContext.Provider value={{
      currentUser, setcurrentUser
    }}>
      <BrowserRouter>
        <ToastContainer />

        <Router />
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App