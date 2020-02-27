/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from "react";
import "./login.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      login: false
    };
    this.formSubmit = this.formSubmit.bind(this);
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    this.storeColector();
  }

  storeColector() {
    let store = JSON.parse(localStorage.getItem("admin-log"));
    if (store && store.login) {
      this.setState({ login: true, store: store });
    }
  }

  formSubmit(event) {
    event.preventDefault();
    Axios.post("http://192.168.1.125:3000/v1/admin/login", this.state)
      .then(response => {
        if (response.data.message) {
          this.setState({ error: response.data.message });
        } else {
          // eslint-disable-next-line react/no-direct-mutation-state
          localStorage.setItem(
            "admin-login",
            JSON.stringify({
              login: true,
              token: response.data.token
            })
          );
          this.setState({ login: true });
          this.storeColector();
        }
      })
      .catch(err => {
        console.log("error: " + err);
      });
  }

  render() {
    const { email, password } = this.state;
    const store = JSON.parse(localStorage.getItem("admin-login"));
    if (store != null && store.login === true) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="Login">
        <div className="loginForm">
          <div className="w3-container w3-blue">
            <h1>Admin Login</h1>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4FTTEnsWSvTFC4hMqWz31VXO1gxK3dQj9fgOb4xHNngHvd6XR&s"
            width="100"
          />
          <hr />
          <form
            className="w3-container"
            method="post"
            onSubmit={this.formSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter email id"
              className="w3-input"
              value={email}
              onChange={this.changeHandler}
              required
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            />{" "}
            <br />
            <div className="email-error"></div>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w3-input"
              value={password}
              onChange={this.changeHandler}
              required
            />
            {this.state.error && (
              <div className="error">{this.state.error}</div>
            )}
            <br />
            <br />
            <input
              type="submit"
              value="Login"
              className="w3-btn w3-round w3-blue"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
