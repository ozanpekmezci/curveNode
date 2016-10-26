import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Supplies from '../../api/supplies/supplies.js';
import SuppliesList from '../components/supplies-list.jsx';
import Loading from '../components/loading.jsx';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('supplies',params.productId);
  if (subscription.ready()) {
    const supplies = Supplies.find({}).fetch();
    const user =Meteor.user();
    onData(null, { supplies,user });
  }
};

export default composeWithTracker(composer, Loading)(SuppliesList);
