import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET } from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      console.log('product_list_request action has been dispatched', action);
      return { loading: true };
    
    case PRODUCT_LIST_SUCCESS:
    console.log('product_list_success aciton has been dispatched',action);
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;       
  }
};

export const productDetailsReducer = ( state = { loading: true}, action) =>
{
 switch(action.type) {
  
  case PRODUCT_DETAILS_REQUEST:
  //  console.log('product details request in reducer');
    return {loading: true};
  
  case PRODUCT_DETAILS_SUCCESS:
  //  console.log('product details request success in reducer', action);
    return {loading: false, product: action.payload};

  case PRODUCT_DETAILS_FAIL:
    return { loading: false, error: action.payload };
  
  default:
    return state;
 } 
};

export const productCreateReducer = ( state = {}, action) => {
  switch(action.type){
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = ( state = {}, action) => {
  switch(action.type){
    case PRODUCT_UPDATE_REQUEST:
      return {loading: true};
    
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { };

    default:
      return state;
  }
};

export const productDeleteReducer = ( state = {}, action ) => {
  switch(action.type){
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};