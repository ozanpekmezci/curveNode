import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Product } from './product.js';

export const ProductsList = ({ products }) => (
  products.length > 0 ? <ListGroup className="products-list">
    {products.map((doc) => (
      <Product key={ doc._id } product={ doc } />
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No products yet.</Alert>
);

ProductsList.propTypes = {
  products: React.PropTypes.array,
};
