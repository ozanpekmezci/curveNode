import { Meteor } from 'meteor/meteor';
import { check,Match } from 'meteor/check';
import Products from '../products';


//Meteor.publish('products', () => Products.find());
Products._ensureIndex({
 "title": "text",
  "description": "text"},
  {"default_language" : "turkish"
 });
Meteor.publish("products", function(searchValue) {
  check(searchValue, Match.Maybe(String));
 if (!searchValue) {
   return Products.find();
 }
 return Products.find(
   { $text: {$search: searchValue} },
   {
     // `fields` is where we can add MongoDB projections. Here we're causing
     // each document published to include a property named `score`, which
     // contains the document's search rank, a numerical value, with more
     // relevant documents having a higher score.
     fields: {
       score: { $meta: "textScore" }
     },
     // This indicates that we wish the publication to be sorted by the
     // `score` property specified in the projection fields above.
     sort: {
       score: { $meta: "textScore" }
     }
   }
 );
});
