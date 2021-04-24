import React, { Component } from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";

class Orders extends Component {
  state = { showModal: false, currentOrder: null };
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  toggleConfirmBoxHandler = () => {
    this.setState((prevState) => {
      return {
        showModal: !prevState.showModal,
      };
    });
  };
  deleteORderHandler = (order) => {
    this.toggleConfirmBoxHandler();
    this.setState({ currentOrder: order });
  };
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            clicked={() => this.deleteORderHandler(order.id)}
          ></Order>
        );
      });
    }
    return (
      <div>
        <Modal
          show={this.state.showModal}
          modalCLosed={this.toggleConfirmBoxHandler}
        >
          <h1>Are you sure you want to delete the order!</h1>
          <h3>The action is irreversible </h3>
          <Button buttonType="Danger" clicked={this.toggleConfirmBoxHandler}>
            Cancel
          </Button>
          <Button
            buttonType="Danger"
            clicked={() => {
              this.props.deleteOrder(
                this.state.currentOrder,
                this.props.token,
                this.props.userId
              );
              this.toggleConfirmBoxHandler();
            }}
          >
            DELETE
          </Button>
        </Modal>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => {
      dispatch(actions.fetchOrders(token, userId));
    },
    deleteOrder: (orderId, token, userID) => {
      dispatch(actions.deleteOrder(orderId, token, userID));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
