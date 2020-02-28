/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from "react";
import "./admin.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Axios from "axios";
import AddProduct from "./addProduct";
import ShowProducts from "./showProducts";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    let login, token;

    const store = JSON.parse(localStorage.getItem("admin-login"));

    if (store === null) {
      login = false;
    } else {
      login = store.login;
      token = store.token;
    }
    this.state = {
      login,
      token: token,
      adminData: {},
      error: {}
    };
  }

  render() {
    if (this.state.login === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="w3-card w3-blue">
          <h1>Welcome to wineshop admin page </h1>
        </div>
        <button
          className="w3-btn w3-round w3-blue"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            height: "53px",
            widht: "95px"
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/logout">
            Logout
          </Link>
        </button>
          <Link
          className="w3-btn w3-round w3-blue"
            style={{
              textDecoration: "none",
              position: "fixed",
              bottom: "10px",
              left: "10px",
              height: "39px",
              widht: "95px",
              zIndex: "1"
            }}
            to="/admin/add-product"
          >Add Product</Link>

        <Link
          className="w3-btn w3-round w3-blue"
          style={{
            textDecoration: "none",
            position: "fixed",
            bottom: "10px",
            right: "10px",
            height: "39px",
            widht: "95px",
            zIndex: "1"
          }}
          to="/admin/"
        >See all Product</Link>
        <Switch>
          <Route path="/admin/" exact>
            <ShowProducts />
          </Route>
          <Route path="/admin/add-product">
            <AddProduct />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Admin;
