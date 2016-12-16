import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

//TODO disable reg for now
Accounts.config({
  forbidClientAccountCreation : true
});
const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: { first: 'Carl', last: 'Winslow' },
  },
  roles: ['admin'],
  username: "Carloco",
}];

users.forEach(({ email, password, profile, roles,username }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile,username });
    Roles.addUsersToRoles(userId, roles);
  }
});
