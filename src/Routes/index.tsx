import { Routes, Route } from 'react-router-dom';
import { PAGE_PATH } from '../constant';
import { useContext } from 'react';
import { AppContext } from '../providers/AppContext';

const Router = () => {
  // const { currentUser } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/" element={/*currentUser*/ true ? <>accueil</> : < >Login</>} />

      {PAGE_PATH.filter(({ isPublic }) => isPublic /*|| currentUser*/)
        .map((path, index) => (
          <Route
            key={index}
            path={path.href}
            Component={path.component}
          />
        ))}
    </Routes>
  );
};

export default Router;
