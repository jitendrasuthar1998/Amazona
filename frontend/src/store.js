 import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
<<<<<<< HEAD
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
=======
import { productListReducer } from './reducers/productReducers';
>>>>>>> 6526f467dae6493dcdebb91db84a0c55144f0f8f


const initialState = {};

<<<<<<< HEAD
const reducer = combineReducers({
   productList: productListReducer,
   productDetails : productDetailsReducer
=======
 const reducer = combineReducers({
   productList: productListReducer,
>>>>>>> 6526f467dae6493dcdebb91db84a0c55144f0f8f
 });   


 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;


 const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk)) ) ;

 export default store;