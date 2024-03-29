import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

import Axios from 'axios';

export const listProducts = () => async (dispatch) =>{
  console.log('listProducts action has been called from actions folder');
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  
  try {
    const { data } = await Axios.get('/api/products');
   console.log('data is comming from api in when listProducts action has been called',data);
   console.log('product_list_success action has been dispatched from action type of listProducts'); 
   dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
    
    dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
  }
};

export const detailsProduct = (productId) => async(dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST, payload: productId
  });

  try{
     const { data } = await Axios.get(`/api/products/${productId}`);
     //console.log('action calling api and getting data from api',data);
     dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data}); 
    }
  catch(error){
      dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
};

export const deleteProduct = (productId) => async(dispatch, getState) =>{
  dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
  const {userSignin: {userInfo}} = getState();

  try {
    const { data } = Axios.delete(`/api/products/${productId}`,{
      headers: { Authorization: `Bearer ${userInfo.token}`},
    });
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message
    :
    error.message;
    dispatch({type: PRODUCT_DELETE_FAIL, payload: message});
  }
}