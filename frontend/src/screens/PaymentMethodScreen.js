import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {

  console.log('This is payment method screen');

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  console.log('cart fetched from store', cart);
  console.log('shipping address fetched from cart and cart from store', shippingAddress);

  if(!shippingAddress) {
    props.history.push('/shipping'); 
  }
  
  const [ paymentMethod, setPaymentMethod ] = useState("Paypal");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('payment method screen to place order details screen');
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3> </CheckoutSteps>
      
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment-Method</h1>
        </div>

        <div>
        <div>
          <input type="radio" id="paypal" value="Paypal" name="paymentMethod" required checked onChange={(e)=>setPaymentMethod(e.target.value)}></input>
          <label htmlFor="paypal">Paypal</label>
        </div>
        </div>

        <div>
        <div>
          <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={(e)=>setPaymentMethod(e.target.value)}></input>
          <label htmlFor="paypal">Stripe</label>
        </div>
        </div>

        <button className="primary" type="submit">Continue</button> 
      </form>

    </div>
  )
}
