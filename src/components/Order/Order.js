import React from "react";
import classes from "./Order.css";
import Button from "../UI/Button/Button";

const order = (props) => {
  let ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      ammount: props.ingredients[ingredientName],
    });
  }
  const IngredientOutput = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ingredient.name} ({ingredient.ammount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {IngredientOutput} </p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
      <Button buttonType="Danger" clicked={props.clicked}>
        Delete Order
      </Button>
    </div>
  );
};
export default order;
