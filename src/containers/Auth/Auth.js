import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

const AUTH_ERRORS = {
  EMAIL_NOT_FOUND: "Invaid email address",
  INVALID_PASSWORD: "Invaid password",
  USER_DISABLED: "User accound is suspended",
  EMAIL_EXISTS: "Email already in use",
  OPERATION_NOT_ALLOWED: "Password login - disabled",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Too many attempts. Please try again later",
  "WEAK_PASSWORD : Password should be at least 6 characters":
    "Password should be at least 6 characters",
};
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        config: {
          type: "text",
          placeholder: "Mail address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        config: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRediriectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };
  sumbitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.config}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p style={{ color: "red" }}>{AUTH_ERRORS[this.props.error.message]}</p>
      );
    }
    let authRedirated = null;
    if (this.props.isAuthenticated) {
      authRedirated = <Redirect to={this.props.authRediriectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirated}
        {errorMessage}
        <form onSubmit={this.sumbitHandler}>
          {form}
          <Button buttonType="Success">
            {this.state.isSignup ? "Register" : "Login"}
          </Button>
        </form>
        <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
const mapStateToProcs = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRediriectPath: state.auth.authRedirectPath,
  };
};
export default connect(mapStateToProcs, mapDispatchToProps)(Auth);
