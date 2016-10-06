import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductsList from '../containers/products-list.js';
import { AddProduct } from '../components/add-product.js';

export const Products = () => (
  <Row>
    <Col xs={ 12 }>
      <h4 className="page-header">Products</h4>
      <AddProduct />
      <ProductsList />
    </Col>
  </Row>
);
