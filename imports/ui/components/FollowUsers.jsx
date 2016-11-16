import React from 'react';
import {Bert} from 'meteor/themeteorchef:bert';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import handleFollow from '../../modules/follow-users';
import {followUser, unfollowUser} from '../../api/relationships/methods.js';
import FollowUserButtonItem from './FollowUserButtonItem.jsx';
import FollowUnfollowUserItem from './FollowUnfollowUserItem.jsx';

export default class FollowUsers extends React.Component {

  constructor(props) {
    super(props);
   this.followUser = this.followUser.bind(this);
    this.state = {
      foundUser: null,
      value: "",
    };

  }

  componentDidMount() {
    handleFollow({component: this});
     setTimeout(() => { document.querySelector('[name="searchUser"]').focus(); }, 0);
  }
  handleChange = (event) => {
   this.setState({value: event.target.value});
 }
  followUser(_user){
    const userId = _user._id;
    followUser.call({
      userId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({foundUser: null, value:""});
        Bert.alert('User followed!', 'success');
      }
    });

  }
  unfollowUser = (_user) =>{
    const userId = _user._id;
    unfollowUser.call({
      userId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({foundUser: null, value:""});
        Bert.alert('User unfollowed!', 'success');
      }
    });

  }
  foundUser(result) {
    this.setState({foundUser: result});
  }

  render() {
    var value = this.state.value;
    return (
      <div className="follow-container">
        <div className="panel panel-default followBox">
          <div className="panel-body">

            {/* Input box for user to follow */}
            <form ref={form => (this.searchUserForm = form)} className="findUser" onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <FormControl type="text"  name="searchUser" placeholder="Search for user" value={value} onChange={this.handleChange} />
              </FormGroup>
              <Button type="submit" bsStyle="success">Search</Button>
            </form>

            {/* Display box found through search */}
            {(this.state.foundUser)
              ? <FollowUnfollowUserItem key={this.state.foundUser._id} user={this.state.foundUser} followUser={this.followUser} unfollowUser={this.unfollowUser} />  : ""}

            {/* List of people to follow */}
            <div className="recommend-users">
              <h5>Who to follow:</h5>
              {this.props.recommendedUsers.map((recUser) => {
                return (
                  <FollowUserButtonItem key={recUser._id} user={recUser} followUser={this.followUser} />
                );
              })
}
            </div>

          </div>
        </div>
      </div>
    );
  }

}
FollowUsers.propTypes = {
  recommendedUsers: React.PropTypes.array
};
