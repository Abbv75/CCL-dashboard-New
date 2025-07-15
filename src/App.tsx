import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './Routes'
import { AppContext } from './providers/AppContext'
import { LOADING_STATE_T } from './types'

const App = () => {
  const [loadingState, setloadingState] = useState(null as LOADING_STATE_T);

  useEffect(() => {
    const res = localStorage.getItem('currentUser');
    // res && setcurrentUser(JSON.parse(res));
    setloadingState('Chargememnt reussi');
  }, []);

  return (
    <AppContext.Provider value={{
    }}>
      {loadingState && (
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      )}
    </AppContext.Provider>
  )
}

export default App