import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {

  console.log('this is place order screen');

  const cart = useSelector((state)=>state.cart);

  console.log('the cart is ', cart);

  if(!cart.paymentMethod) {
    console.log('Redirect to payment method if payment has not been selected');
    props.history.push('/payment');
  }

  const orderCreate = useSelector((state) => state.orderCreate);

  console.log('OrderCreate is comming from redux store', orderCreate);

  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2)); //5.223 => "5.22" => 5.22

  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    console.log('place order button clicked');
   dispatch(createOrder({...cart, orderItems: cart.cartItems }));
  };

  useEffect(()=> {
    console.log('useEffect method has been called of placeOrderScreen');
    if(success) {
      console.log('If orderCreate is true then push order to order api');
      props.history.push(`/order/${order._id}`);
      dispatch({type: ORDER_CREATE_RESET} , console.log('order reset has been called'));
    }
  }, [ dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                <strong>Name: </strong> {cart.shippingAddress.fullName} <br/>
                <strong> Address: </strong> {cart.shippingAddress.address} , {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country} 
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                <strong> Method: </strong> {cart.paymentMethod} 
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h1>Order-Items</h1>
                
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                  
                        <div> {item.qty} x ${item.price} = ${item.qty * item.price }</div>
                  
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
            </li>
            
          </ul>
        </div>

        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2> 
              </li>
              <li>
                <div className="row">
                  <div> Items : </div> 
                  <div> ${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div> Shipping : </div> 
                  <div> ${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div> Tax: </div> 
                  <div> ${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>  
                    <strong>Total-Price:</strong>
                  </div> 
                  <div> 
                    <strong>
                    ${cart.totalPrice.toFixed(2)}
                    </strong>
                  </div>
                </div>
              </li>
              <li>
                <button type="button" onClick={placeOrderHandler} className="primary block" disabled = {cart.cartItems.length === 0}>
                Place Order
                </button> 
              </li>

              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};
