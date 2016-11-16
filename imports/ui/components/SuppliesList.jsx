import React from 'react';
import {ListGroup, Alert} from 'react-bootstrap';
import Supply from './Supply.jsx';

const SuppliesList = ({supplies, user}) => (supplies.length > 0
  ? <ListGroup className="supplies-list">
    {supplies.map((doc) => (<Supply key={doc._id} supply={doc} currentUser={user} />))}
  </ListGroup>
  : <Alert bsStyle="warning">No supplies yet.</Alert>);
export default SuppliesList;
SuppliesList.propTypes = {
  supplies: React.PropTypes.array,
  user: React.PropTypes.object
};
