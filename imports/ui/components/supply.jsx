import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
//import { updateDocument, removeDocument } from '../../api/documents/methods.js';

const Supply = ({supply,currentUser}) => (
  <ListGroupItem key={supply._id}>
    <Row>
      <Col xs={8} sm={10}>
        <FormControl
          type="text"
          defaultValue={supply.description}
        //  onKeyUp={ handleUpdateDocument.bind(this, document._id) }
        />
      </Col>
    </Row>
  </ListGroupItem>
);
Supply.propTypes = {
  supply: React.PropTypes.object,
  currentUser: React.PropTypes.object
};
export default Supply;
