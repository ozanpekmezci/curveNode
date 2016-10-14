import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Products from '../../api/products/products.js';
import ProductsList from '../components/products-list.jsx';
import Loading from '../components/loading.jsx';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('products',params.searchValue);
  if (subscription.ready()) {
    const products = Products.find({}, { sort: [["score", "desc"]] }).fetch();
    const user =Meteor.user();
    onData(null, { products,user });
  }
};

export default composeWithTracker(composer, Loading)(ProductsList);
