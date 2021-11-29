import { signOut } from '@firebase/auth';
import React from 'react';
import { auth } from '../Firebase';

const SignOut = ({ setLoadingState }) => {
  const logOutAccount = async () => {
    setLoadingState(true);
    setTimeout(async () => {
      await signOut(auth);
      setLoadingState(false);
    }, 500);
  };
  return (
    <button className="logout-btn" onClick={logOutAccount}>
      Sign Out
    </button>
  );
};

export default SignOut;
