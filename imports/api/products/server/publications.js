import { Meteor } from 'meteor/meteor';
import { check,Match } from 'meteor/check';
import Products from '../products';
import Images from '../../images/server/images';

//Meteor.publish('products', () => Products.find());
Meteor.publish("products", function(searchValue) {
  check(searchValue, Match.OneOf( String, null, undefined ));
  let query      = {},
     projection = { limit: 10, sort: { title: 1 } };
 if (!searchValue) {
   return Products.find();
 }
   let regex = new RegExp( searchValue, 'i' );
   query = {
      $or: [
        { title: regex },
        { body: regex }
      ]
    };
   projection.limit = 100;
 return Products.find( query, projection );
});
Meteor.publishComposite('productsWithImages', function(searchValue) {
  check(searchValue, Match.OneOf( String, null, undefined ));
  let query      = {},
     projection = { limit: 10, sort: { title: 1 } };
     if (!searchValue) {
       return {
         find: function() {
           return Products.find({});
         },
         children: [{
           find: function(product) {
             return Images.find({masterType:"Product" ,masterId: product._id });
           }
         }]
       }
     }
     let regex = new RegExp( searchValue, 'i' );
     query = {
        $or: [
          { title: regex },
          { body: regex }
        ]
      };
     projection.limit = 100;
    return {
      find: function() {
        return Products.find( query, projection );
      },
      children: [{
        find: function(product) {
          return Images.find({masterType:"Product" ,masterId: product._id });
        }
      }]
    }
});
