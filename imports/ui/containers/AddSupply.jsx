import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AddSupply from '../components/AddSupply.jsx';
import Loading from '../components/Loading.jsx';
import {canSupply} from '../../api/userUtils.js';

const composer = (params, onData) => {
  const productId = params.productId;
  const subscriptionProducts = Meteor.subscribe('products',null);
  const subscriptionSupplies = Meteor.subscribe('supplies',productId);
  const userId = Meteor.userId();
  if (subscriptionProducts.ready() &&subscriptionSupplies.ready() ) {
    const cansupply = canSupply(userId,productId);
    onData(null, {cansupply,productId });
  }
};

export default composeWithTracker(composer, Loading)(AddSupply);
