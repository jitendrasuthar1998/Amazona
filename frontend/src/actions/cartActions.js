import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

import Axios from 'axios';

//addToCart action for adding products to cart..

export const addToCart = (productId, qty) => async(dispatch, getState) => {
  
  const { data } = await Axios.get(`/api/products/${productId}`);  //assigning selected product information to data object.

  dispatch({
    type: CART_ADD_ITEM,

    payload: {              //this payload send the product details to cart..
      name: data.name,          //getting the name of product from fetched data object
      image: data.image,        //getting the image of product from fetched data object
      price: data.price,        //getting the price of product from fetched data object
      countInStock: data.countInStock,      //getting the countInStock of product from fetched data object
      product: data._id,            //getting the id of product from fetched data object
      qty,                          ////getting the quantity of product from fetched data object
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));  //keep save product after refreshing the page.
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch ( { type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
  localStorage.setItem('shippingAddress',JSON.stringify(data));
}