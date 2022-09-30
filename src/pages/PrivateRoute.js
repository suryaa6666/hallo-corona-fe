import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Error } from '../helpers/toast';

export function IsLogin() {
  const [state] = useContext(UserContext);

  if (!state.isLogin) {
    Error({ message: `Halaman tidak ditemukan!` });
    return <Navigate to={'/'} />;
  }

  return <Outlet />;
}

export function IsDoctor() {
  const [state] = useContext(UserContext);

  if (!state.isDoctor) {
    Error({ message: `Halaman tidak ditemukan!` });
    return <Navigate to={'/'} />;
  }

  return <Outlet />;
}
