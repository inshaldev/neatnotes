import React, { useRef } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const realNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const regAccount = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const realName = realNameRef.current.value;
    const pass = passwordRef.current.value;
    if (email && pass && realName !== '') {
      try {
        await createUserWithEmailAndPassword(auth, email, pass).then((user) =>
          updateProfile(user.user, {
            displayName: realName,
          })
        );
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="reg" onSubmit={regAccount}>
      <form className="reg-form">
        <h1>Start tracking yo' progress!</h1>
        <input
          className="reg-input"
          type="text"
          placeholder="Full name"
          ref={realNameRef}
        />
        <input
          className="reg-input"
          type="email"
          placeholder="Email address"
          ref={emailRef}
        />
        <input
          className="reg-input"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button className="reg-btn">Get Started</button>
        <Link to="/login">Already have an Account?</Link>
      </form>
    </div>
  );
};

export default Register;
