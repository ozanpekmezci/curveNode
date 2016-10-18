import Relationships from './relationships/relationships';


const findFollowings = function(userId) {
  var currentFollowings = Relationships.find({
    follower: userId
  }).fetch().map(function(data) {
    return data.following;
  });
  currentFollowings.push(userId);

  return currentFollowings;
};
export default findFollowings;
