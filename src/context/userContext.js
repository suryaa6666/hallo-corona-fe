import { createContext, useReducer } from 'react';

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  isDoctor: false,
  user: {},
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        isLogin: true,
        isDoctor: payload.listAs === 'doctor' ? true : false,
        user: payload,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token');
      return {
        isLogin: false,
        isDoctor: false,
        user: {},
      };
    default:
      throw new Error();
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}
