/* eslint-disable */
import "react-toastify/dist/ReactToastify.css";
import { Box } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { API, setAuthorization } from './config/api';
import { UserContext } from './context/userContext';
import { Error } from './helpers/toast';
import Artikel from './pages/Artikel';
import Home from './pages/Home';
import Konsultasi from './pages/Konsultasi';
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
        <Box
          bg="white"
          display="flex"
          w="100wh"
          h="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <ReactLoading
            type={'spinningBubbles'}
            color={'#FF6185'}
            height={100}
            width={100}
          />
        </Box>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artikel/:id" element={<Artikel />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/reservasi" element={<Reservasi />} />
              <Route path="/konsultasi" element={<Konsultasi />} />
              <Route path="/reservasi-data" element={<ReservasiDataAdmin />} />
              <Route path="/tambah-artikel" element={<TambahArtikelAdmin />} />
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
