import React from 'react';
import { Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';

// import { Bert } from 'meteor/themeteorchef:bert';
// import { insertProduct } from '../../api/products/methods.js';
import  handleAddition  from '../../modules/add-product';

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adding: false,
      tags: [],
      suggestions: [],
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  componentDidUpdate() {
    handleAddition({ component: this });
    //setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }


  toggleForm() {
    this.setState({ adding: !this.state.adding,tags:[] });
  }
  handleDelete(i) {
    const tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags });
  }
  handleAddition(tag) {
    const tags = this.state.tags;
    if (tags.length < 10) {
      tags.push({
        id: tags.length + 1,
        text: tag,
      });
      this.setState({ tags });
    }
  }
  handleDrag(tag, currPos, newPos) {
    const tags = this.state.tags;

          // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

          // re-render
    this.setState({ tags });
  }
  render() {
    const tags = this.state.tags;
    const suggestions = this.state.suggestions;
    return (
      <div>
        <Button className="addProductButton" onClick={this.toggleForm} bsStyle="primary">
          <span className="icon-plus" />
          Add a new Product!
        </Button>
        {this.state.adding ?
          <Row>
            <Col xs={12} sm={6} md={4}>
              <form ref={form => (this.addProductForm = form)} className="addProduct" onSubmit={event => event.preventDefault()}>
                <Row>
                  <FormGroup>
                    <FormControl
                      type="text"
                      name="title"
                      placeholder="Type a product title."
                    />
                  </FormGroup>
                </Row>
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
                  <div>
                    <ReactTags
                      name="tag" tags={tags}
                      suggestions={suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                    />
                  </div>
                </Row>
                <Row>
                  <Button type="submit" bsStyle="success">Fire it up!</Button>
                </Row>
              </form>
            </Col>
          </Row>
  : null}
      </div>
);
  }

}
