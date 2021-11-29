import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../Firebase';
import { onAuthStateChanged } from '@firebase/auth';

const UserContext = createContext();
export const useAuth = () => {
  return useContext(UserContext);
};

export const Context = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [globalLoadingState, setGlobalLoadingState] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (userCred) => {
      setCurrentUser(userCred);
    });
    return unSub;
  }, []);

  const value = { currentUser, globalLoadingState, setGlobalLoadingState };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
