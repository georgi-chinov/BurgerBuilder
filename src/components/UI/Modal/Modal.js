import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.show !== this.props.show ||
      nextProps.show !== this.props.loading
    ) {
      return true;
    }
    return false;
  }
  
  render() {
    
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalCLosed}
        ></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
