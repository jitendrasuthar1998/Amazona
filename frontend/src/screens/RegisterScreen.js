import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function RegisterScreen(props) {

  console.log('This is RegisterScreen');

  console.log('Props of register screen are ', props);

  //react hook for setting email and password
  const [name, setName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');
  const [confirmPassword, setConfirmPassword] = useState(' ');

  const redirect = props.location.search? props.location.search.split('=')[1]: '/';

  const userRegister = useSelector((state)=> state.userRegister);
  const { userInfo, loading, error } = userRegister;
   
  console.log('userRegister is comming from redux store', userRegister);

  //submit handler action for register user

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert('Password and Confirm password are not match')
    } else{
      console.log('If password and confrim password matched then dispatch register action');
      dispatch(register(name ,email, password));
    }
  };

  useEffect(()=>{
    console.log('useEffect method has been called');
    if(userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>

      <div>
        <h1>Create Account</h1>
      </div>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}

      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Enter your name" required="true" onChange={(e)=>setName(e.target.value)}>
        </input>
      </div>

      <div>
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" placeholder="Enter your email" required="true" onChange={(e)=>setEmail(e.target.value)}>
        </input>
      </div>

      <div>
        <label htmlFor="password">Enter your password</label>
        <input type="password" id="password" placeholder="Enter your password" required="true" onChange={(e)=>setPassword(e.target.value)}>
        </input>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" placeholder="Re-Enter your password" required="true" onChange={(e)=>setConfirmPassword(e.target.value)}>
        </input>
      </div>

      <div>
        <label/>
        <button className="primary" type="submit">Register</button>
      </div>

      <div>
        <label/>
        <div> Already have an account? {' '}
        <Link to={`/signin?redirect=${redirect}`}>Sign-In.</Link>
        </div>
      </div>

      </form>

    </div>
  )
}
