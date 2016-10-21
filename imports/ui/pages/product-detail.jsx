import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SuppliesList from '../containers/supplies-list.jsx';
import AddSupply from '../components/add-supply.jsx';

const ProductDetail = ({params}) => (
  <Row>
    <Col xs={12}>
      <h4 className="page-header">Product Details</h4>
      <AddSupply postId={params.id} />
      <SuppliesList postId={params.id} />
    </Col>
  </Row>
);
export default ProductDetail;
ProductDetail.propTypes = {
  params: React.PropTypes.object,
};
