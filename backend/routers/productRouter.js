import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

//router to get all the products which are available in store and send it to frontend api

productRouter.get('/', expressAsyncHandler( async(req, res)=>{
  console.log('productRouter for getting product from backend has been called');
  const products = await Product.find({});
  res.send(products);
})
);

//router to add products to mongoDB database

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
  // await Product.remove({});
const createdProducts = await Product.insertMany(data.products);
res.send({ createdProducts });
})
);

//router to get particular product details from backend or from database and send it to frontend when it calls

productRouter.get('/:id', expressAsyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log('product is comming from backend productRouter.get /:id', product);
  console.log('productRouter.get /:id has been called');
  if(product) {
    res.send(product);
  }
  else
  {
    res.status(404).send( {message: 'Product not found'} );
  }
})
);

//router to create any product to admin and then post it to backend or database from frontend to backend

productRouter.post('/',
isAuth,
isAdmin,
expressAsyncHandler(async(req, res)=>{
  const product = new Product({
    name: 'sample name',
    image: '/images/p1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    description: 'sample description',
  });
  const createdProduct = await product.save();
  res.send({ message: 'Product Created', product: createdProduct });
})
);

//router to update any product details to admin

productRouter.put('/:id',
isAuth,
isAdmin,
expressAsyncHandler(async(req,res)=> {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if(product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.send({ message: 'Product Updated Successfully', product: updatedProduct });
  } 
  else{
    res.status(404).send({ message: 'Product not found' });
  }
})
);

//router to delete any product from database to admin

productRouter.delete('/:id',
isAuth,
isAdmin,
expressAsyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id);
  if(product){
    const deleteProduct = await product.remove();
    res.send({message: 'Product Deleted', product: deleteProduct});
  } else{
    res.status(404).send({message: 'Product not found'});
  }
})
);

export default productRouter;