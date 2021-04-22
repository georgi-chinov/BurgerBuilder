import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const intitialState = {
  orders: [],
  loading: false,
  purchased: false,
};
const purchaseInit = (state, action) => {
  return updateObject(state, {
    purchased: false,
  });
};
const purchaseStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const purchaseSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.ID,
  });
  return updateObject(state, {
    purchased: true,
    loading: false,
    orders: state.orders.concat(newOrder),
  });
};
const purchaseFailed = (state, action) => {
  return updateObject(state, { loading: false });
};
const orderFetchStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const orderFetchSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.order,
    loading: false,
  });
};
const orderFetchFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStart(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return orderFetchStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return orderFetchSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return orderFetchFailed(state, action);
    default:
      return state;
  }
};
export default reducer;
