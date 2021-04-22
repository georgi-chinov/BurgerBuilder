import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorhandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        label: "Name",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        label: "Street",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        label: "Zip Code",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your zipcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          errorMessage: "Please enter exactly 5 numbers",
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        label: "Country",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        label: "Email",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
          errorMessage: "Please enter correct email address",
        },
        valid: false,
        touched: false,
      },
      delivery: {
        label: "Delivery method",
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fast", displayValue: "Fast" },
            { value: "cheap", displayValue: "Cheapest" },
          ],
        },
        value: "fast",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }
    const orderData = {
      ingredients: this.props.ing,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(orderData, this.props.token);
  };
  inputChangedHandler = (event, inputIndent) => {
    const updateFormElement = updateObject(this.state.orderForm[inputIndent], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[inputIndent].validation
      ),
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIndent]: updateFormElement,
    });
    updatedOrderForm[inputIndent] = updateFormElement;
    let formIsValid = true;
    for (let inputIndent in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIndent].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <div className={classes.ContactData}>
        <h4>Enter your contact data!</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((formEl) => {
            return (
              <Input
                key={formEl.id}
                label={formEl.config.label}
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                errorMessage={formEl.config.validation.errorMessage}
                changed={(event) => this.inputChangedHandler(event, formEl.id)}
              />
            );
          })}
          <Button buttonType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      </div>
    );
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }
    return <div>{form}</div>;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
const mapStateToProcs = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};
export default connect(
  mapStateToProcs,
  mapDispatchToProps
)(withErrorhandler(ContactData, axios));
