import React from 'react';
import { Row, Col, ListGroupItem, FormControl,Button } from 'react-bootstrap';
import {IntlProvider, FormattedNumber} from 'react-intl';
import { Meteor } from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router'
import { insertOrder } from '../../api/orders/methods.js';

const handleRespondtoSupply= (supply) => {
  //bu sekilde insert'te id alabilirsin, feature of meteor
  const orderId = insertOrder.call({
    price: supply.price,
    buyerId: Meteor.userId(),
    sellerId: supply.userId,
    productId: supply.productId,
    supplyId: supply._id,
    timestamp: new Date(),
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
      browserHistory.push(`/products/${supply.productId}`);
    }
  });
  browserHistory.push(`/orders/${orderId}`);
};

const Supply = ({supply,currentUser}) => (
  <IntlProvider locale="en">
    <ListGroupItem key={supply._id}>
      <Row>
        <Col xs={6} sm={8} md={8}>
          <FormControl
            type="text"
            defaultValue={supply.description}
          //  onKeyUp={ handleUpdateDocument.bind(this, document._id) }
          />
        </Col>
        <Col xs={2} sm={1} md={1}>
          <FormattedNumber value={supply.price/100} style="currency" currency="USD" />
        </Col>
        <Col xs={4} sm={3} md={3}>
          <Button onClick={function () { handleRespondtoSupply(supply); }} bsStyle="primary" bsSize="large" active>Buy</Button>
        </Col>
      </Row>
    </ListGroupItem>
  </IntlProvider>
);
Supply.propTypes = {
  supply: React.PropTypes.object,
  currentUser: React.PropTypes.object
};
export default Supply;
