import React from 'react';
import {Button} from 'react-bootstrap';

const FollowUserButtonItem = ({user, followUser}) => {
  const handleClick = () => {
    followUser(user);
  }
     return (<p >
       <Button type="button" className="btn btn-default" id="followRec" onClick={handleClick}>
         Follow @{user.username}
       </Button>
     </p>);
};
export default FollowUserButtonItem;
FollowUserButtonItem.propTypes = {
  followUser: React.PropTypes.func,
  user: React.PropTypes.object,

};
