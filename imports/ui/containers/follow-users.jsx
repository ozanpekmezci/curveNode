import {composeWithTracker} from 'react-komposer';
import {Meteor} from 'meteor/meteor';
import FollowUsers from '../components/follow-users.jsx';
import Loading from '../components/loading.jsx';
import findFollowings from '../../api/userUtils';

const composer = (params, onData) => {
  const userId =  Meteor.userId();
  const users = Meteor.subscribe('users', userId);
  const followings = Meteor.subscribe('followings', userId);
  if (users.ready() && followings.ready()) {
    let currentFollowings = findFollowings(userId);
    const recommendedUsers = Meteor.users.find({
      _id: {
        $nin: currentFollowings
      }
    }, {
      fields: {
        'username': 1
      },
      limit: 5
    }).fetch();
  //  const user = Meteor.user();
    onData(null, {recommendedUsers});
  }
};

export default composeWithTracker(composer, Loading)(FollowUsers);
