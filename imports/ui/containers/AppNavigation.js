import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AppNavigation from '../components/AppNavigation.jsx';
import Notifications from '../../api/notifications/notifications.js';
//import Loading from '../components/Loading.jsx';


const composer = (props, onData) => {
  const userId = Meteor.userId();
  const subscription = Meteor.subscribe('Notifications',userId);

  if (subscription.ready()) {
    const notifications = Notifications.find({}).fetch();
  onData(null, { hasUser: Meteor.user(), notifications:notifications });
}
};
export default composeWithTracker(composer)(AppNavigation);
//export default composeWithTracker(composer, {}, {}, { pure: false })(AppNavigation);
