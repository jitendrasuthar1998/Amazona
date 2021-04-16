import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props) {

  //react hook for setting email and password
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState(' ');

  const redirect = props.location.search? props.location.search.split('=')[1]: '/';

  const userSignin = useSelector((state)=> state.userSignin);
  const { userInfo, loading, error } = userSignin;
   
  //submit handler action for signing in user

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };


  useEffect(()=>{
    if(userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>

      <div>
        <h1>Sign In</h1>
      </div>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}

      <div>
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}>
        </input>
      </div>

      <div>
        <label htmlFor="password">Enter your password</label>
        <input type="password" id="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}>
        </input>
      </div>

      <div>
        <label/>
        <button className="primary" type="submit">Sign In</button>
      </div>

      <div>
        <label/>
        <div> New User? {' '}
        <Link to={`/register?redirect=${redirect}`}>Create New Account.</Link>
        </div>
      </div>

      </form>

    </div>
  )
}
