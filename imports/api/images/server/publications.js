import { check,Match } from 'meteor/check';
import {FS} from 'meteor/cfs:base-package';
import Images from './images';


Images.allow({
    'insert': function(userId) {
        check(userId, Match.OneOf( String, null, undefined ));
        return userId != null;
    },
    'update': function(userId, image) {
        check(userId, Match.OneOf( String, null, undefined ));
        check(image, Match.OneOf( FS.File, null, undefined ));
        return userId === image.owner;
    },
    'remove': function(userId, image) {
        check(userId, Match.OneOf( String, null, undefined ));
        check(image, Match.OneOf( FS.File, null, undefined ));
        return userId === image.owner;
    },
    download: function() {
        return true
    }
});

/*TODO
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
*/
