import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
  
  const dispatch = useDispatch();

  console.log('Data in props of ProductScreen',props);  

  const productId = props.match.params.id;
  
  console.log('Product id is ', productId);

  const [qty,setQty] = useState(1); 
  
  const productDetails = useSelector(state => state.productDetails); //getting productDetails state from store
  const{ loading , error, product } = productDetails;

  console.log('Getting product details from store', productDetails);


  useEffect(() => {
    console.log('Product id in useEffect is', productId);
    console.log('Details product action is called');
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  
  const addToCartHandler = () =>{
    console.log('add to cart button clicked', productId, qty);
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
        {
          loading ? <LoadingBox></LoadingBox>
          :
          error ? <MessageBox variant="danger">{error}</MessageBox>
          :
          <div>
            <Link to="/">Back to Result</Link>
    
            <div className="row top">
              <div className="col-2">
                <img className="large" src={product.image} alt={product.name}></img>
              </div>

              <div className="col-1">
                <ul>
                  <li>{product.name}</li>
                  <li>
                    <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                  </li>

                  <li>Price: ${product.price}</li>
                  <li>
                    Description: 
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>

            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price : </div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>

                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                        <span className="success">In Stock</span>
                        )
                        :
                        (
                        <span className="danger">Unavailable</span>  
                        )
                       }
                      </div>
                    </div>
                  </li>
 
                  {
                    product.countInStock > 0 && 
                    (                    
                      <>
                      <li>
                        <div className="row">
                          <div>Qty: </div>

                          <div>
                            <select value={qty} onChange={(e)=>setQty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map( (x) => 
                                (
                                <option key={x+1} value={x + 1}>{x + 1}</option>
                                )
                                )
                              }
                            </select>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                      </li>
                        </>
                    )  
                  }

                  </ul>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
  )
};
