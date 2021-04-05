import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';



export default function HomeScreen() {

  

  const [products, setProducts] = useState([]); //react hook to set state to products

  
  const [loading, setLoading] = useState(false);  //react hook to show loading 

  const [error, setError] = useState(false); //react hook to show error

  useEffect(() => {

    //function to fetch data from backend /api/products

    const fetchData = async () => {

      try{
        setLoading(true);
      const { data } = await axios.get('/api/products'); //ajax request to get products from '/api/products.
      setLoading(false);
      setProducts(data);
      }
      catch(err){
        setError(err.message);
        setLoading(false); //no need to show loading anymore.
      }
    };
    fetchData();
  }, []);

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
}
