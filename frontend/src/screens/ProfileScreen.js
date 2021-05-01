import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {

  const userSignin = useSelector(state => state.userSignin);

  const { userInfo } = userSignin;

  const userDetails = useSelector(state => state.userDetails);

  const { loading, error } = userDetails;

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(detailsUser(userInfo._id));
  },[dispatch, userInfo._id]);


  const submitHandler = (e) => {
    e.preventDefault();
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
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Enter name" value={userInfo.name}></input>
          </div>
          <div>
            <label htmlFor="email"> Email </label>
            <input id="email" type="email" placeholder="Enter Email" value={userInfo.email}></input>
          </div>
          <div>
            <label htmlFor="password"> Password </label>
            <input id="password" type="password" placeholder="Enter Password" value={userInfo.password}></input>
          </div>
          <div>
            <label htmlFor="confirmPassword"> Confirm Password </label>
            <input id="confirmPassword" type="password" placeholder="Enter confirm password">

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
