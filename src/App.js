/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './components/LoadingComponent';
import { API, setAuthorization } from './config/api';
import { UserContext } from './context/userContext';
import { Error } from './helpers/toast';
import Artikel from './pages/Artikel';
import EditArtikelAdmin from './pages/EditArtikelAdmin';
import Home from './pages/Home';
import Konsultasi from './pages/Konsultasi';
import ListArtikelAdmin from './pages/ListArtikelAdmin';
import PageNotFound from './pages/PageNotFound';
import { IsDoctor, IsLogin } from './pages/PrivateRoute';
import Profil from './pages/Profil';
import Reservasi from './pages/Reservasi';
import ReservasiDataAdmin from './pages/ReservasiDataAdmin';
import TambahArtikelAdmin from './pages/TambahArtikelAdmin';

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  async function checkAuth() {
    try {
      if (localStorage.token) {
        setAuthorization(localStorage.token);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      await API.get('/check-auth', config, { validateStatus: () => true })
        .then(response => {
          console.log('isinya response', response);
          const payload = response.data.data.user;
          payload.token = localStorage.token;
          console.log('ini data user', payload);
          if (!payload) {
            setIsLoading(false);
            return dispatch({
              type: 'AUTH_ERROR',
            });
          }

          dispatch({
            type: 'AUTH_SUCCESS',
            payload,
          });
          setIsLoading(false);
          console.log('ini state', state);
        })
        .catch(error => {
          dispatch({
            type: 'AUTH_ERROR',
          });
          setIsLoading(false);
          console.log(state);
          return Error({ message: `${error.response.data.message}` });
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/artikel/:id" element={<Artikel />} />
              <Route path="/reservasi" element={<Reservasi />} />
              <Route path="/" element={<IsLogin />}>
                <Route
                  path="/profil"
                  element={<Profil checkAuth={checkAuth} />}
                />
                <Route path="/konsultasi" element={<Konsultasi />} />
                <Route path="/" element={<IsDoctor />}>
                  <Route
                    path="/reservasi-data"
                    element={<ReservasiDataAdmin />}
                  />
                  <Route path="/list-artikel" element={<ListArtikelAdmin />} />
                  <Route
                    path="/tambah-artikel"
                    element={<TambahArtikelAdmin />}
                  />
                  <Route
                    path="/edit-artikel/:id"
                    element={<EditArtikelAdmin />}
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </>
  );
}

export default App;
