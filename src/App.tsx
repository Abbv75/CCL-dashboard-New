import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Router from './Routes'
import { AppContext } from './providers/AppContext'
import { ToastContainer } from 'react-toastify'
import React, { useCallback, useEffect, useState } from 'react'
import { LOADING_STATE_T, USER_T } from './types'
import { Skeleton, Typography } from '@mui/joy'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Connexion from './pages/Connexion'

const App = () => {
  const [currentUser, setcurrentUser] = useState(undefined as undefined | USER_T);
  const [loadingUserState, setloadingUserState] = useState("En cours de chargement." as LOADING_STATE_T);

  const loadUser = useCallback(() => {
    try {
      setloadingUserState("En cours de chargement.");

      const resTmp = localStorage.getItem('currentUser');
      const res = resTmp ? JSON.parse(resTmp) as USER_T : undefined;

      setcurrentUser(res);

      return res;
    } catch (error) { } finally {
      setloadingUserState(null);
    }
  }, [])

  useEffect(() => {
    loadUser();
  }, [])

  if (loadingUserState) {
    return <Skeleton />
  }

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