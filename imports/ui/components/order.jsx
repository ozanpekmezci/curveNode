import React from 'react';
import {Row, Col, ListGroupItem, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router'



const Order = ({order, currentUser}) => (
  <ListGroupItem key={order._id}>

  </ListGroupItem>
);
Product.propTypes = {
  product: React.PropTypes.object,
  currentUser: React.PropTypes.object
};

export default Product;
