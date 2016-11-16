import React from 'react';
import {Row, Col, ListGroupItem, FormControl, Button} from 'react-bootstrap';
import {IntlProvider, FormattedNumber} from 'react-intl';
import {Meteor} from 'meteor/meteor';
import {Bert} from 'meteor/themeteorchef:bert';
import {browserHistory} from 'react-router'
import {insertOrder} from '../../api/orders/methods.js';
import insertConversation from '../../api/conversations/methods.js';
import {updateSupply, removeSupply} from '../../api/supplies/methods.js';

export default class Supply extends React.Component {
  constructor(props) {
    super(props);
    const supply = this.props.supply;
    const currentUser = this.props.currentUser;
    this.state = {
      supply: supply,
      currentUser: currentUser,
      editing: false
    };

  }
  getEditorLink = (supply, currentUser) => {
    return (this.state.editing && currentUser._id === supply.userId
      ? <FormControl type="text" defaultValue={supply.body} onKeyUp={this.handleUpdateSupply} />
      : <span className="text">
        <strong>
          <h4>{supply.body}</h4>
        </strong>
      </span>);
  }
  handleUpdateSupply = (event) => {
    const body = event.target.value.trim();
    if (body !== '' && event.keyCode === 13) {
      updateSupply.call({
        _id: this.state.supply._id,
        update: {
          body
        }
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Supply updated!', 'success');
          this.toggleEdit();
        }
      });
    }
  }
  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
}
  handleEditSupply = (event) => {
    event.preventDefault();
    // this should be replaced with a styled solution so for now we will
    // disable the eslint `no-alert`
    // eslint-disable-next-line no-alert
  this.toggleEdit();
  }
  handleRemoveSupply = (event) => {
    event.preventDefault();
    // this should be replaced with a styled solution so for now we will
    // disable the eslint `no-alert`
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure? This is permanent.')) {
      removeSupply.call({
        _id: this.state.supply._id
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Supply removed!', 'success');
        }
      });
    }
  }

  handleRespondtoSupply = (event) => {
    event.preventDefault();
    const supply = this.state.supply;
    //bu sekilde insert'te id alabilirsin, feature of meteor
    const orderId = insertOrder.call({
      price: supply.price,
      buyerId: Meteor.userId(),
      sellerId: supply.userId,
      productId: supply.productId,
      supplyId: supply._id,
      timestamp: new Date()
    }, (error) => {
      if (error) {
        //TODO not nice, for now
        if (error.error === "Orders.methods.insertOrder.alreadyExists") {
          browserHistory.push(`/orders/${error.details}`);
        } else {
          Bert.alert(error.reason, 'danger');
          browserHistory.push(`/products/${supply.productId}`);
        }
      }
    });
    insertConversation.call({
      userOne: Meteor.userId(),
      userTwo: supply.userId,
      channelId: orderId,
      channelType: "orders",
      timestamp: new Date()
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        browserHistory.push(`/products/${supply.productId}`);
      }
    });
    browserHistory.push(`/orders/${orderId}`);
  }

  render() {
    const supply = this.state.supply;
    const currentUser = this.state.currentUser;
    return (
      <IntlProvider locale="en">
        <ListGroupItem key={supply._id}>
          <Row>
            <Col xs={4} sm={5} md={5}>
              {this.getEditorLink(supply, currentUser)}
            </Col>
            <Col xs={2} sm={1} md={1}>
              <FormattedNumber value={supply.price / 100} style="currency" currency="USD" />
            </Col>
            <Col xs={3} sm={3} md={3}>
              {supply.userId !== currentUser._id
                ? <Button onClick={this.handleRespondtoSupply} bsStyle="primary" bsSize="large" active>Go</Button>
                : <Button bsStyle="primary" className="btn-block" onClick={this.handleEditSupply}>
                    Edit
                </Button>}
            </Col>
            <Col xs={3} sm={3} md={3}>
              {supply.userId === currentUser._id
                ? <Button bsStyle="danger" className="btn-block" onClick={this.handleRemoveSupply}>
                    Remove
                </Button>
                : ""}
            </Col>
          </Row>
        </ListGroupItem>
      </IntlProvider>
    );
  }
}
Supply.propTypes = {
  supply: React.PropTypes.object,
  currentUser: React.PropTypes.object
};
