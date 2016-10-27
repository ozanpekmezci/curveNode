import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Orders from '../../api/orders/orders.js';
import MessagesList from '../components/messages-list.jsx';
import Loading from '../components/loading.jsx';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('Orders',params.productId);
  if (subscription.ready()) {
    const supplies = Supplies.find({}).fetch();
    const user =Meteor.user();
    onData(null, { supplies,user });
  }
};

export default composeWithTracker(composer, Loading)(SuppliesList);
