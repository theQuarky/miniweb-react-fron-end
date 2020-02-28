/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-constructor */
import React from "react";
import "./admin.css";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Modal from "react-responsive-modal";
import { Spring } from "react-spring/renderprops";
const lookup = {
  empty: [],
  wine: [
    { id: "white", name: "White" },
    { id: "red", name: "Red" },
    { id: "rosé", name: "Rosé" },
    { id: "sparkling", name: "Sparkling" },
    { id: "dessert", name: "Dessert" }
  ],
  rum: [
    { id: "dark", name: "Dark" },
    { id: "flavored", name: "Flavored" },
    { id: "gold", name: "Gold" },
    { id: "light", name: "Light" },
    { id: "overproof", name: "Overproof" },
    { id: "premium", name: "Premium" },
    { id: "spiced", name: "Spiced" }
  ],
  whisky: [
    {
      id: "american",
      name: "American"
    },
    {
      id: "ausralian",
      name: "Ausralian"
    },
    {
      id: "canadian",
      name: "Canadian"
    },
    {
      id: "danish",
      name: "Danish"
    },
    {
      id: "english",
      name: "English"
    },
    {
      id: "finnish",
      name: "Finnish"
    },
    {
      id: "georgia",
      name: "Georgia"
    },
    {
      id: "german",
      name: "German"
    },
    {
      id: "indian",
      name: "Indian"
    },
    {
      id: "irish",
      name: "Irish"
    },
    {
      id: "mexican",
      name: "Mexican"
    },
    {
      id: "japanese",
      name: "Japanese"
    },
    {
      id: "scotch",
      name: "Scotch"
    },
    {
      id: "swedish",
      name: "Swedish"
    },
    {
      id: "taiwanese",
      name: "Taiwanese"
    },
    {
      id: "welsh",
      name: "Welsh"
    }
  ],
  vodka: [
    {
      id: "plain",
      name: "Plain"
    },
    {
      id: "fruit",
      name: "Fruit"
    },
    {
      id: "herbal",
      name: "Herbal"
    },
    {
      id: "flavored",
      name: "Flavored"
    }
  ],
  beer: [
    {
      id: "boza",
      name: "Boza"
    },
    {
      id: "cauim",
      name: "Cauim"
    },
    {
      id: "chhaang",
      name: "Chhaang"
    },
    {
      id: "chicha",
      name: "Chicha"
    },
    {
      id: "gruit",
      name: "Gruit"
    },
    {
      id: "kvass",
      name: "Kvass"
    },
    {
      id: "oshikundu",
      name: "Oshikundu"
    },
    {
      id: "pulque",
      name: "Pulque"
    },
    {
      id: "sahti",
      name: "Sahti"
    },
    {
      id: "sato",
      name: "Sato"
    }
  ],
  brandy: [
    {
      id: "cognac",
      name: "Cognac"
    },
    {
      id: "armagnac",
      name: "Armagnac"
    },
    {
      id: "calvados",
      name: "Calvados"
    },
    {
      id: "spanish",
      name: "Spanish"
    },
    {
      id: "obstler",
      name: "Obstler"
    },
    {
      id: "pisco",
      name: "Pisco"
    },
    {
      id: "armenian",
      name: "Armenian"
    },
    {
      id: "cypriot",
      name: "Cypriot"
    },
    {
      id: "pomace",
      name: "Pomace"
    }
  ]
};

class AddProduct extends React.Component {
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
      name: "",
      type: "empty",
      sub_type: "",
      price: null,
      adminData: {},
      error: [],
      success: [],
      open: false
    };
    this.formSubmit = this.formSubmit.bind(this);
  }
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  };

  fileHandleChange = event => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ prodImg: e.target.result });
      console.log(this.state.prodImg);
    };
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

  getSubType = ({ target: { value } }) => {
    this.setState({ type: value });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  formSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      type: this.state.type,
      sub_type: this.state.sub_type,
      price: this.state.price,
      prodImg: this.state.prodImg
    };
    Axios.post("http://localhost:3000/v1/products", data, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (res.data.error === {}) {
          this.setState({ error: [res.data.error] });
        } else {
          this.setState({ success: ["Product added!!"] });
          this.onOpenModal();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { name, type, sub_type, price } = this.state;
    const subTypes = lookup[type];
    if (this.state.login === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Spring
          from={{ opacity: 0, top: "0%" }}
          to={{ opacity: 1, top: "100%" }}
          config={{ duration: 1000 }}
        >
          {props => (
            <div style={props}>
              <div className="Login" style={{ width: "50%" }}>
                <div className="loginForm">
                  <div className="w3-container w3-blue">
                    <h3> Add Product </h3>{" "}
                  </div>{" "}
                  <hr />
                  <form
                    className="w3-container"
                    method="post"
                    onSubmit={this.formSubmit}
                    enctype="multipart/form-data"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Product Name"
                      className="w3-input"
                      required
                      onChange={this.changeHandler}
                      value={name}
                    />{" "}
                    <br />
                    <br />
                    <br />
                    <div className="w3-row-padding">
                      <div className="w3-half">
                        <select
                          className="w3-select"
                          name="type"
                          onChange={this.getSubType}
                          required
                          value={type}
                        >
                          <option value="empty" disabled selected>
                            Type{" "}
                          </option>{" "}
                          <option value="wine"> Wine </option>{" "}
                          <option value="rum"> Rum </option>{" "}
                          <option value="whisky"> Whisky </option>{" "}
                          <option value="vodka"> Vodka </option>{" "}
                          <option value="beer"> Beer </option>{" "}
                          <option value="brandy"> Brandy </option>{" "}
                        </select>{" "}
                      </div>{" "}
                      <div className="w3-half">
                        <select
                          className="w3-select"
                          name="sub_type"
                          required
                          onChange={this.changeHandler}
                          value={sub_type}
                        >
                          <option value="" disabled selected>
                            Sub Type{" "}
                          </option>{" "}
                          {subTypes.map(subType => (
                            <option key={subType.id} value={subType.id}>
                              {" "}
                              {subType.name}{" "}
                            </option>
                          ))}{" "}
                        </select>{" "}
                      </div>{" "}
                    </div>{" "}
                    <br />
                    <br />
                    <br />
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter Price of product"
                      className="w3-input"
                      style={{ appearance: "textfield" }}
                      required
                      onChange={this.changeHandler}
                      value={price}
                    />{" "}
                    <br />
                    <br />
                    <br />
                    <input
                      type="file"
                      name="prodImg"
                      placeholder="Product Image"
                      className="w3-input"
                      onChange={this.fileHandleChange}
                      //   required
                    />{" "}
                    <br />
                    {this.state.error[0] && (
                      <div className="error">{this.state.error[0]}</div>
                    )}
                    <br/>
                    <input
                      type="submit"
                      value="Add Product"
                      className="w3-btn w3-round w3-blue"
                    />
                  </form>{" "}
                </div>{" "}
              </div>
            </div>
          )}
        </Spring>
        <Modal className="success" open={this.state.open} onClose={this.onCloseModal} center>
          <div className="success" style={{ display: "block", width: "400px", height: "200px", padding:'auto', margin:'auto' }}>
            <div>{this.state.success[0]}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddProduct;
