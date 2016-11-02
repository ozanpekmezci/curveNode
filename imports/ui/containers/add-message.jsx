import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Conversations from '../../api/conversations/conversations.js';
import AddMessage from '../components/add-message.jsx';
import Loading from '../components/loading.jsx';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('Conversations',params.channelId,params.channelType);
  if (subscription.ready()) {
    const conversation = Conversations.findOne({});
    const user =Meteor.user();
    onData(null, { conversation,user });
  }
};

export default composeWithTracker(composer, Loading)(AddMessage);
