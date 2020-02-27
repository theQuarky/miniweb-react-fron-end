/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from 'react';
import './admin.css';
import {BroswserRouter as Router, Redirect, Link, Switch} from 'react-router-dom';

class Logout extends React.Component {

    constructor(props){
        super(props);
        localStorage.clear();
    }

    render() {
        return <Redirect to="/" />
    }
}

export default Logout;