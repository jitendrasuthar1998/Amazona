import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {

  console.log('This is profile screen');

  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');

  const userSignin = useSelector(state => state.userSignin);

  console.log('User data is comming from redux store', userSignin);

  const { userInfo } = userSignin;

  const userDetails = useSelector(state => state.userDetails);

  console.log('User details is comming from redux store', userDetails);

  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);

  console.log('userUpdateProfile is comming from redux store', userUpdateProfile);
  
  const { success: successUpdate , error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('useEffect method has been called');
    if(!user){
      console.log('If user does not exist, then dispatch user_update_profile_reset action');
      dispatch({ type: USER_UPDATE_PROFILE_RESET});
      dispatch(detailsUser(userInfo._id));
      console.log('detailsUser action has been called');
    } else {
      console.log('If user is exist then set the user name and email according to user input');
      setName(user.name);
      setEmail(user.email);
    }
  },[dispatch, userInfo._id, user]);


  const submitHandler = (e) => {
    console.log('submitHandler has been called');
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Password and confirm password are not matched.');
    } else{
      dispatch(updateUserProfile({userId: user._id, name, email, password}));
      console.log('updateUserProfile action has been dispatched');
    }
    //dispatch update profile
  }

  return (
    <div>
      <form className = "form" onSubmit={submitHandler}>
        <div>
          <h1> User Profile</h1>
        </div>
        {
          loading ? <LoadingBox></LoadingBox>
          :
          error ? <MessageBox variant = "daner">{error}</MessageBox>
          :
          <>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
          {successUpdate && <MessageBox variant="success">
            Profile Updated Successfully</MessageBox>}
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor="email"> Email </label>
            <input id="email" type="email" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor="password"> Password </label>
            <input id="password" type="password" placeholder="Enter Password" onChange={(e)=> setPassword(e.target.value)} ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword"> Confirm Password </label>
            <input id="confirmPassword" type="password" placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}>

            </input>
          </div>

          <div>
            <label>
              <button className="primary" type="submit">
                Update 
              </button>
            </label>
          </div>
          </>
        }
      </form>
    </div>
  )
}
