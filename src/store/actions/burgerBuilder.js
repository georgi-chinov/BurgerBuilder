import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-order";

export const addIgredient = (name) => {
  return { type: actionTypes.ADD_INGREDIENT, ingredientName: name };
};

export const removeIgredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const setIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://react-my-burger-160ea-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((resp) => {
        dispatch(setIngredients(resp.data));
      })
      .catch((err) => {
        dispatch(setIngredientsFailed(err));
      });
  };
};
