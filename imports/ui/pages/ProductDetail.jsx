import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SuppliesList from '../containers/SuppliesList.jsx';
import AddSupply from '../containers/AddSupply.jsx';

const ProductDetail = ({params}) => (
  <Row>
    <Col xs={12}>
      <h4 className="page-header">Product Details</h4>
      <AddSupply productId={params.id} />
      <SuppliesList productId={params.id} />
    </Col>
  </Row>
);
export default ProductDetail;
ProductDetail.propTypes = {
  params: React.PropTypes.object,
};
