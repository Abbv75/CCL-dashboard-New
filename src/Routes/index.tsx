import { Routes, Route, Navigate } from 'react-router-dom';
import { PAGE_PATH } from '../constant';
import { useContext } from 'react';
import { AppContext } from '../providers/AppContext';
import Connexion from '../pages/Connexion';
import Layout from '../components/Layout';

const Router = () => {
  const { currentUser } = useContext(AppContext);

  return (
    <Routes>
      <Route path='/*' element={currentUser ? <Navigate to="/user" replace /> : <Navigate to="connexion" replace />} />

      <Route path={"/connexion"} element={<Connexion />} />

      {PAGE_PATH.filter(({ isPublic }) => isPublic || currentUser).map((path, index) => (
        <Route
          key={index}
          path={path.href}
          //@ts-ignore
          element={<Layout children={<path.component />} />}
        />
      ))}

    </Routes>
  );
};

export default Router;
