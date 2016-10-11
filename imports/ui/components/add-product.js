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
  }
  handleSubmit(event) {
    event.preventDefault();
  }

  toggleForm() {
    this.setState({ adding: !this.state.adding });
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
              <form ref="addProduct" className="addProduct" onSubmit={this.handleSubmit}>
                <Row>
                  <FormGroup>
                    <FormControl
                      type="text"
                      ref="title"
                      name="title"
                      placeholder="Type a product title."
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <FormControl
                      type="text"
                      ref="description"
                      name="description"
                      placeholder="Type a product description"
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <FormControl
                      type="number"
                      ref="price"
                      name="price"
                      placeholder="How much?"
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <div>
                    <ReactTags
                      ref="tag" tags={tags}
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

/* import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertProduct } from '../../api/products/methods.js';

const handleInsertProduct = (event) => {
  const target = event.target;
  const title = target.value.trim();

  if (title !== '' && event.keyCode === 13) {
    insertProduct.call({
      title,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Product added!', 'success');
      }
    });
  }
};

export const AddProduct = () => (
  <FormGroup>
    <FormControl
      type="text"
      onKeyUp={ handleInsertProduct }
      placeholder="Type a product title and press enter..."
    />
  </FormGroup>
);
*/
