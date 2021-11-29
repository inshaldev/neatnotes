import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { useAuth } from '../contexts/Context';

const Login = () => {
  const { setGlobalLoadingState } = useAuth();
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginAccount = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passwordRef.current.value;
    setGlobalLoadingState(true);
    if (email && pass) {
      try {
        setLoadingState(true);
        await signInWithEmailAndPassword(auth, email, pass);
        navigate('/');
        setLoadingState(false);
      } catch (err) {
        console.log(err);
        setLoadingState(false);
      }
    }
  };

  return (
    <div className="login" onSubmit={loginAccount}>
      {loadingState ? (
        <PropagateLoader size={30} color={'#f5f5f5'} speedMultiplier={2} />
      ) : (
        <>
          <h1>Login</h1>
          <form className="login-form">
            <input
              className="login-input"
              type="email"
              placeholder="Email address"
              ref={emailRef}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
            <button className="login-btn">Log In</button>
          </form>
          <Link to="/register">Don't have an Account?</Link>
        </>
      )}
    </div>
  );
};

export default Login;
