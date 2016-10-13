import React from 'react';
import {Row, Col, ListGroupItem, FormControl, Button} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import {updateProduct, removeProduct} from '../../api/products/methods.js';

const handleUpdateProduct = (productId, event) => {
  const title = event.target.value.trim();
  if (title !== '' && event.keyCode === 13) {
    updateProduct.call({
      _id: productId,
      update: {
        title
      }
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Product updated!', 'success');
      }
    });
  }
};

const handleRemoveProduct = (productId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This is permanent.')) {
    removeProduct.call({
      _id: productId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Product removed!', 'success');
      }
    });
  }
};

const Product = ({product, currentUser}) => (
  <ListGroupItem key={product._id}>
    <Row>
      <Col xs={8} sm={10}>
        {currentUser._id === product.userId
          ? <FormControl type="text" defaultValue={product.title} onKeyUp={handleUpdateProduct.bind(this, product._id)} />
          : <span className="text">
            <strong>{product.title}</strong>
          </span>
}
      </Col>
      <Col xs={4} sm={2}>
        {currentUser._id === product.userId ?
          <Button bsStyle="danger" className="btn-block" onClick={handleRemoveProduct.bind(this, product._id)}>
            Remove
          </Button>
        : ""}
      </Col>
    </Row>
  </ListGroupItem>
);
Product.propTypes = {
  product: React.PropTypes.object,
  currentUser: React.PropTypes.object
};

export default Product;
