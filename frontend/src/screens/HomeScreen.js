import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  
  console.log('Products coming from redux store',productList);

  useEffect(()=>{
    console.log('useEffect method has been called of HomeScreen');
    console.log('calling listProducts action from actions');
    dispatch(listProducts());
  }, [dispatch]);   

    
  return (
    <div>
      {loading ? <LoadingBox></LoadingBox>
      :
      error ? <MessageBox variant="danger">{error}</MessageBox>
    :
    <div className="row center">
            {
              //because we are using products from backend
              products.map(product => (
                <Product key={product._id } product={product}></Product>   
              ))
            }
          </div>
    }
        </div>
  )
};
