import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import { updateProduct } from '../actions/productActions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {

  console.log('This is ProductEditScreen');

  const productId = props.match.params.id;

  console.log('Product id of editing order is ', productId);

  const [name, setName] = useState(' ');
  const [price, setPrice] = useState(' ');
  const [image, setImage] = useState(' ');
  const [category, setCategory] = useState(' ');
  const [countInStock, setCountInStock] = useState(' ');
  const [brand, setBrand] = useState(' ');
  const [description, setDescription] = useState(' ');

  const productDetails = useSelector((state) => state.productDetails );

  console.log('ProductDetails comming from redux store', productDetails);

  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state)=> state.productUpdate);

  console.log('Updated product comming from redux store', productUpdate);

  const { loading: loadingUpdate,
  error: errorUpdate,
success: successUpdate } = productUpdate;

  const dispatch = useDispatch();

  useEffect(()=> {
    console.log('useEffect method has been called of ProductEditScreen');
    if(successUpdate){
      console.log('Updated product is true then push it to productLIst api');
      props.history.push('/productlist');
    }
    if(!product || product._id !== productId || successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET});
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
  }, [ product, dispatch, productId, successUpdate, props.history ]);

  const submitHander = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price, 
        image,
        category,
        brand,
        countInStock,
        description
      })
    );
  };

  const [ loadingUpload, setLoadingUpload ] = useState(false);

  const [ errorUpload, setErrorUpload ] = useState('');

  const userSignin = useSelector((state)=> state.userSignin);

  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image',file);
    setLoadingUpload(true);
    try{
      const { data } = await axios.post('/api/uploads',bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch(error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  } 

  return (
    <div>
      <form className="form" onSubmit = {submitHander}>

        <div>
          <h1>Edit Product {productId}</h1>
        </div>

        {loadingUpdate && <LoadingBox></LoadingBox>}

        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

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
              <label htmlFor="imageFile">Image File</label>
              <input type="file" id="imageFile" label="Choose Image" onChange={uploadFileHandler}>
              </input>

              {loadingUpload && 
              (
                <LoadingBox></LoadingBox>
              )}

              {
              errorUpload && ( <MessageBox variant="danger">{errorUpload}</MessageBox> 
              )
              }

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
};
