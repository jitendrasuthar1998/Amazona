<<<<<<< HEAD
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
=======
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
>>>>>>> 6526f467dae6493dcdebb91db84a0c55144f0f8f

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;       
  }
<<<<<<< HEAD
};

export const productDetailsReducer = ( state = { product: {}, loading: true}, action) =>
{
 switch(action.type) {
  
  case PRODUCT_DETAILS_REQUEST:
     return {loading: true};
  
     case PRODUCT_DETAILS_SUCCESS:
    return {loading: false, product: action.payload};

  case PRODUCT_DETAILS_FAIL:
    return { loading: false, error: action.payload };
  
  default:
    return state;
 } 
=======
>>>>>>> 6526f467dae6493dcdebb91db84a0c55144f0f8f
}