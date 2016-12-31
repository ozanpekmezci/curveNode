import React from 'react';
import {ListGroup, Alert} from 'react-bootstrap';
import Product from './Product.jsx';
import {getImageofProduct} from '../../api/userUtils.js';


const ProductsList = ({products, user}) => (products.length > 0
  ? <ListGroup className="products-list">
    {products.map((product) => (<Product key={product._id} product={product} currentUser={user} image={getImageofProduct(product._id)} />))}
  </ListGroup>
  : <Alert bsStyle="warning">No products yet.</Alert>);
export default ProductsList;
ProductsList.propTypes = {
  products: React.PropTypes.array,
  user: React.PropTypes.object
};
