import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MessagesList from '../containers/MessagesList.jsx';
import AddMessage from '../containers/AddMessage.jsx';

const Order = ({params}) => (
  <Row>
    <Col xs={12}>
      <h4 className="page-header">Order Details</h4>
      <MessagesList channelId={params.id} channelType={"orders"} />
      <AddMessage channelId={params.id} channelType={"orders"} />
    </Col>
  </Row>
);
export default Order;
Order.propTypes = {
  params: React.PropTypes.object,
};
