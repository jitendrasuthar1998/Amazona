import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditScreen(props) {

  const productId = props.match.params.id;

  const [name, setName] = useState(' ');
  const [price, setPrice] = useState(' ');
  const [image, setImage] = useState(' ');
  const [category, setCategory] = useState(' ');
  const [countInStock, setCountInStock] = useState(' ');
  const [brand, setBrand] = useState(' ');
  const [description, setDescription] = useState(' ');

  const productDetails = useSelector((state) => state.productDetails );

  const { loading, error, product } = productDetails;

  const dispatch = useDispatch();

  useEffect(()=> {
    if(!product || product._id !== productId) {
      dispatch(detailsProduct(productId));
    } else{ 
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [ product, dispatch, productId ]);

  const submitHander = (e) => {
    e.preventDefault();
    //todo: dipatch update product
  }

  return (
    <div>
      <form className="form" onSubmit = {submitHander}>

        <div>
          <h1>Edit Product {productId}</h1>
        </div>

        {
          loading ? (<LoadingBox></LoadingBox>) 
          :
          error ? (<MessageBox variant= "danger">{error}</MessageBox>)
          :
          (
            <>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter product name" value={name} onChange = {(e)=> setName(e.target.value)}>
              </input>
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input id="price" type="text" placeholder="Enter product price" value={price} onChange = {(e)=> setPrice(e.target.value)}>
              </input>
            </div>

            <div>
              <label htmlFor="image">image</label>
              <input id="image" type="text" placeholder="Enter product image" value={image} onChange = {(e)=> setImage(e.target.value)}>
              </input>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <input id="category" type="text" placeholder="Enter product category" value={category} onChange = {(e)=> setCategory(e.target.value)}>
              </input>
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <input id="brand" type="text" placeholder="Enter product bramd" value={brand} onChange = {(e)=> setBrand(e.target.value)}>
              </input>
            </div>

            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input id="countInStock" type="text" placeholder="Enter product count In Stock" value={countInStock} onChange = {(e)=> setCountInStock(e.target.value)}>
              </input>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="3" type="text" placeholder="Enter product Description" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label></label>
              <button className = "primary" type="submit">
                Update
              </button>
            </div>
            </>
          )
        }
      </form>      
    </div>
  );
}
