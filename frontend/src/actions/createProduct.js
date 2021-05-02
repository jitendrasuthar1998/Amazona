import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL } from "../constants/productConstants";
import Axios from 'axios';

export const createProduct = () => async(dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: {userInfo}
  } = getState();
  
  try {
    const { data } = await Axios.post('/api/products', 
    {},
    {
      headers: { Authorization: `Bearer ${userInfo.token}`},
    }
    );
    dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product});
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message 
    :
    error.message;
    dispatch({type: PRODUCT_CREATE_FAIL, payload: message});
  }
};
