import React from 'react';
import { Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';

// import { Bert } from 'meteor/themeteorchef:bert';
// import { insertProduct } from '../../api/products/methods.js';
import  handleAddition  from '../../modules/add-supply';

export default class AddSupply extends React.Component {
  static handleSubmit(event) {
    event.preventDefault();
  }
  constructor(props) {
    super(props);

    this.state = {
      adding: false,
    };
    this.toggleForm = this.toggleForm.bind(this);
  }
  componentDidUpdate() {
    handleAddition({ component: this });
  }


  toggleForm() {
    this.setState({ adding: !this.state.adding});
  }
  render() {
    return (
      <div>
        {this.props.cansupply?
          <Button className="addSupplyButton" onClick={this.toggleForm} bsStyle="primary">
            <span className="icon-plus" />
            Supply it!
          </Button>
        :null}
        {this.state.adding ?
          <Row>
            <Col xs={12} sm={6} md={4}>
              <form ref={form => this.form = form}className="addSupply" onSubmit={AddSupply.handleSubmit}>
                <Row>
                  <FormGroup>
                    <FormControl
                      type="text"
                      name="body"
                      placeholder="Type a product body"
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <FormControl
                      type="number"
                      name="price"
                      placeholder="How much?"
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <Button type="submit" bsStyle="success">Supply it up!</Button>
                </Row>
              </form>
            </Col>
          </Row>
  : null}
      </div>
);
  }

}
AddSupply.propTypes = {
  productId: React.PropTypes.string,
  productOwner: React.PropTypes.string,
  cansupply: React.PropTypes.bool,
};
