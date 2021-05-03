import Axios from "axios";
import { PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../../constants/productConstants";

export const updateProduct = (product) => async(dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });
  const { userSignin: {userInfo} } = getState();
  
  try {
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message
    :
    error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};