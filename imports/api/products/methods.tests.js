/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import Products from './products.js';
import { insertProduct, updateProduct, removeProduct } from './methods.js';

describe('Products methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a product into the Products collection', function () {
    insertProduct.call({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    const getProduct = Products.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getProduct.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('updates a product in the Products collection', function () {
    const { _id } = Factory.create('product');

    updateProduct.call({
      _id,
      update: {
        title: 'You can\'t arrest me, I\'m the Cake Boss!',
      },
    });

    const getProduct = Products.findOne(_id);
    assert.equal(getProduct.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a product from the Products collection', function () {
    const { _id } = Factory.create('product');
    removeProduct.call({ _id });
    const getProduct = Products.findOne(_id);
    assert.equal(getProduct, undefined);
  });
});
