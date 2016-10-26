import React from 'react';
import { Row, Col } from 'react-bootstrap';
//import SuppliesList from '../containers/supplies-list.jsx';
//import AddSupply from '../components/add-supply.jsx';

const OrderDetail = ({params}) => (
  <Row>
    <Col xs={12}>
      <h4 className="page-header">Order Details</h4>
      <p>{params.id}</p>
    </Col>
  </Row>
);
export default OrderDetail;
OrderDetail.propTypes = {
  params: React.PropTypes.object,
};
