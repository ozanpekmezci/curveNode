import React from 'react';
import {Row, Col, ListGroupItem, FormControl, Button} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {Link} from 'react-router'
import {updateProduct, removeProduct} from '../../api/products/methods.js';

export default class Product extends React.Component {
  //functioning es6 arrow function
  constructor(props) {
    super(props);
    const productId = this.props.product._id
    this.state = {
      editing: false,
      productId: productId
    };

  }




  getEditorLink = (product, currentUser) => {
    return (this.state.editing && currentUser._id === product.userId
      ? <FormControl type="text" defaultValue={product.title} onKeyUp={this.handleUpdateProduct} />
      : <span className="text">
        <strong>
          <Link to={`/products/${product._id}`}>{product.title}</Link>
        </strong>
      </span>);
  }
  handleEditProduct = (event) => {
    event.preventDefault();
    // this should be replaced with a styled solution so for now we will
    // disable the eslint `no-alert`
    // eslint-disable-next-line no-alert
    this.setState({
      editing: !this.state.editing
    });
  }
  handleRemoveProduct = (event) => {
    event.preventDefault();
    // this should be replaced with a styled solution so for now we will
    // disable the eslint `no-alert`
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure? This is permanent.')) {
      removeProduct.call({
        _id: this.state.productId
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Product removed!', 'success');
        }
      });
    }
  }
  handleUpdateProduct = (event) => {
    const title = event.target.value.trim();
    if (title !== '' && event.keyCode === 13) {
      updateProduct.call({
        _id: this.state.productId,
        update: {
          title
        }
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Product updated!', 'success');
          this.setState({
            editing: !this.state.editing
          });
        }
      });
    }
  }
  render() {
    const product = this.props.product;
    const currentUser = this.props.currentUser;
    return (
      <ListGroupItem key={product._id}>
        <Row>
          <Col xs={6} sm={8}>
            {this.getEditorLink(product, currentUser)}
          </Col>
          <Col xs={4} sm={2}>
            {currentUser._id === product.userId
              ? <Button bsStyle="primary" className="btn-block" onClick={this.handleEditProduct}>
                  Edit
              </Button>
              : ""}
          </Col>
          <Col xs={4} sm={2}>
            {currentUser._id === product.userId
              ? <Button bsStyle="danger" className="btn-block" onClick={this.handleRemoveProduct}>
                  Remove
              </Button>
              : ""}
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

Product.propTypes = {
  product: React.PropTypes.object,
  currentUser: React.PropTypes.object
};
