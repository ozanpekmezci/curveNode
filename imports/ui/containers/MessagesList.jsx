import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Messages from '../../api/messages/messages.js';
import MessagesList from '../components/MessagesList.jsx';
import Loading from '../components/Loading.jsx';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('MessagesofChannel',params.channelId,params.channelType);
  if (subscription.ready()) {
    const messages = Messages.find({}).fetch();
    const user =Meteor.user();
    onData(null, { messages,user });
  }
};

export default composeWithTracker(composer, Loading)(MessagesList);
