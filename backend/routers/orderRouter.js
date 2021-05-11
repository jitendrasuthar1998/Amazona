import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();


//to get individual user orders details

orderRouter.get('/mine', 
isAuth, 
expressAsyncHandler(async(req, res)=> {
  const orders = await Order.find({user: req.user._id});
  res.send(orders);
})
);


//router to post order of particular user with some products and user details

orderRouter.post('/',
isAuth, 
expressAsyncHandler(async(req, res) =>{
  if(req.body.orderItems.length === 0 ) {
    res.status(400).send( { message: 'Cart is Empty' } );
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).send({message: 'New Order Created', order: createdOrder });
  }
})
);

//router to get recently posted order in database

orderRouter.get('/:id', 
isAuth,
expressAsyncHandler( async (req, res) => {
  const order = await Order.findById(req.params.id);
  if(order){
    res.send(order);
  }  
  else
  {
    res.status(404).send({message: 'Order Not found'});
  }
})
);


//router to get individual order details to pay the order total amount when order is paid then show the payment status to user

orderRouter.put('/:id/pay', 
isAuth, 
expressAsyncHandler( async(req, res)=>{
  const order = await Order.findById(req.params.id);
  if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = { 
      id: req.body.id, 
      status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address
    }
      const updatedOrder = await order.save();
      res.send({message: 'Order Paid', order: updatedOrder});
    } 
    else{
      res.status(404).send({message: 'Order not found'});
    }  
})
);

//router to get all the users order details to admin

orderRouter.get('/',
isAuth,
isAdmin,
expressAsyncHandler(async(req, res)=>{
  const orders = await Order.find({}).populate('user','name');
  res.send(orders);
})
);

//router to delete any particular order from backend or database

orderRouter.delete('/:id',
isAuth,
isAdmin,
expressAsyncHandler(async(req, res)=>{
  const order = await Order.findById(req.params.id);
  if(order){
    const deleteOrder = await order.remove();
    res.send({message: 'Order Deleted', order: deleteOrder});
  }else{
    res.status(404).send({message: 'Order not found'});
  }
})
);

//router to create deliver action to any particular order, and show the status of delivery

orderRouter.put('/:id/deliver',
isAuth,
isAdmin,
expressAsyncHandler(async(req,res)=> {
  const order = await Order.findById(req.params.id);
  if(order){
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.send({message: 'Order Delivered', order: updatedOrder});
  }else{
    res.status(404).send({message: 'Order Not found'});
  }
})
);

export default orderRouter;