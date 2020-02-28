/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from "react";
import "./showProducts.css";
import Axios from "axios";
import Product from "./product";
import { Spring } from 'react-spring/renderprops';
class ShowProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    Axios.get("http://localhost:3000/v1/products/")
      .then(res => {
        this.setState({ products: res.data.message });
      })
      .catch(err => console.log(err));
  }

  render() {
    const products = this.state.products;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ duration:1000 }}
      >
          {props => (
            <div style={props}>
                <div>
                  <div className="gallary-container">
                    <div className="gallary">
                      {products.map(prod => (
                        <Product 
                          name={prod.name}
                          type={prod.type}
                          sub_type={prod.sub_type}
                          price={prod.price} 
                          src={prod.img_path} 
                          key={prod._id} />
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          )}
      </Spring>
    );
  }
}

export default ShowProducts;
