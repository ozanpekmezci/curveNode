import React from 'react';
import {Button} from 'react-bootstrap';

export default class FollowUnfollowUserItem extends React.Component {
  constructor() {
    super();
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  //  this._onClick = this._onClick.bind(this);
  }
  followUser() {
    this.props.followUser(this.props.user);
  }
  unfollowUser() {
      this.props.unfollowUser(this.props.user);
  }
  render() {
     return (
       <div>
         {(this.props.user.checkFollowing)?
           < div className="found-user">
             <Button type="button" className="btn btn-default" id="unfollow" onClick={this.unfollowUser}>
               Unfollow @{this.props.user.username}</Button>
           </div>:
             < div className="found-user">
               <Button type="button" className="btn btn-default" id="follow" onClick={this.followUser}>
                 Follow @{this.props.user.username}</Button>
             </div>
    }
       </div>
  );
}
}
FollowUnfollowUserItem.propTypes = {
  user: React.PropTypes.object,
  followUser: React.PropTypes.func,
  unfollowUser: React.PropTypes.func

};
