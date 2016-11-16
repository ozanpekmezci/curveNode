import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Supplies from '../../api/supplies/supplies.js';
import SuppliesList from '../components/SuppliesList.jsx';
import Loading from '../components/Loading.jsx';

const composer = (params, onData) => {
  const SupplySubscription = Meteor.subscribe('supplies',params.productId);
  if (SupplySubscription.ready()) {
    const supplies = Supplies.find({}).fetch();
    const user =Meteor.user();
    onData(null, { supplies,user });
  }
};

export default composeWithTracker(composer, Loading)(SuppliesList);
