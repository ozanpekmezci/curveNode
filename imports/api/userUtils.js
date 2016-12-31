import Relationships from './relationships/relationships';
import Products from './products/products';
import Supplies from './supplies/supplies';
import Images from './images/images';

export const findFollowings = function(userId) {
  var currentFollowings = Relationships.find({follower: userId}).fetch().map(function(data) {
    return data.following;
  });
  currentFollowings.push(userId);

  return currentFollowings;
};
export const canSupply = function(userId, productId) {
  if (!userId || !productId) {
    return false;
  }
  const product = Products.findOne({_id: productId});
  if (product.userId === userId) {
    return false;
  }
  const supplies = Supplies.find({productId: productId, userId: userId}).fetch();
  if (supplies.length > 0) {
    return false;
  } else {
    return true;
  }

};
export const getImageofProduct = function(productId){
  if (!productId) {
    return "";
  }
  const image = Images.findOne({masterType:"Product" ,masterId: productId})
  if(!image){
    return"";
  }else{
    return image.url();
}
};
