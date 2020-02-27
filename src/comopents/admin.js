/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from "react";
import "./admin.css";
import {
  BroswserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Axios from "axios";

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

    Axios.get("http://192.168.1.125:3000/v1/admin/test", {
      headers: {
        Authorization: `Basic ${store.token}`
      }
    })
      .then(response => {
        this.setState({ adminData: response });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  render() {
    if (this.state.login === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Welcome to wineshop admin page</h1>
        <button><Link to="/logout">Logout</Link></button>
      </div>
    );
  }
}

export default Admin;
