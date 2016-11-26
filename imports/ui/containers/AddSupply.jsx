import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AddSupply from '../components/AddSupply.jsx';
import Loading from '../components/Loading.jsx';
import {canSupply} from '../../api/userUtils.js';
import Products from '../../api/products/products.js';


const composer = (params, onData) => {
  const productId = params.productId;
  const subscriptionProducts = Meteor.subscribe('products',null);
  const subscriptionSupplies = Meteor.subscribe('supplies',productId);
  const userId = Meteor.userId();
  if (subscriptionProducts.ready() &&subscriptionSupplies.ready() ) {
    const productOwner = Products.findOne(productId).userId;
    const cansupply = canSupply(userId,productId);
    onData(null, {cansupply,productId,productOwner });
  }
};

export default composeWithTracker(composer, Loading)(AddSupply);
