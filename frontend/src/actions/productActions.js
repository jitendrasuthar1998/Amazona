<<<<<<< HEAD
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
=======
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
>>>>>>> 6526f467dae6493dcdebb91db84a0c55144f0f8f

import Axios from 'axios';

export const listProducts = () => async (dispatch) =>{
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });


  try {
    const { data } = await Axios.get('/api/products');
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
  } catch (error) {
    
    dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
  }
<<<<<<< HEAD
};

export const detailsProduct = (productId) => async(dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST, payload: productId
  });

  try{
     const { data } = await Axios.get(`/api/products/${productId}`);
     dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data}); 
  }
  catch(error){
    dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
=======
>>>>>>> 6526f467dae6493dcdebb91db84a0c55144f0f8f
};