/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './comopents/login';
import Admin from './comopents/admin';
import Logout from './comopents/logout';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      login: false
    };
  }

  componentDidMount(){
    this.storeColector();
  }

  storeColector(){
    let store = JSON.parse(localStorage.getItem('admin-log'));
    if(store && store.login){
      this.setState({login:true,store: store});
    }
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
