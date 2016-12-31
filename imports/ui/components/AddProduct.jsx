import React from 'react';
import Dropzone from 'react-dropzone';
import { FormGroup, FormControl, Button,Modal } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import {Meteor} from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import {FS} from 'meteor/cfs:base-package';
import Images from '../../api/images/images';//TODO gotta move it to modules



import  handleAddition  from '../../modules/add-product';


export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewFile: '',
      uploadedFile: '',
      adding: false,
      tags: [],
      suggestions: [],
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }
  componentDidUpdate() {
    handleAddition({ component: this });
    //setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }
  onImageDrop(files) {
  //.forEach(function(file) {
          let file = new FS.File(files[0]);
          this.setState({
            previewFile: files[0]
          });
          file.owner = Meteor.userId(); //TODO can be moved to modules
          file.masterId = "";
          file.masterType = "Product";
          Images.insert(file, function(err, fileObj) {
              if (err) {
                  Bert.alert(err.reason); //in case there is an error, log it to the console
              } else {
                this.setState({
                  uploadedFile: fileObj
                });
                  //the image upload is done successfully.
                  //you can use this callback to add the id of your file into another collection
                  //for this you can use fileObj._id to get the id of the file
              }
          }.bind(this));


  }


  toggleForm() {
    this.setState({ adding: !this.state.adding,tags:[],previewFile:"",uploadedFile:"" });
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
        <Modal show={this.state.adding} onHide={this.toggleForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add what you want to buy!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form ref={form => (this.addProductForm = form)} className="addProduct" onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <FormControl
                  type="text"
                  name="title"
                  placeholder="Type a product title."
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="text"
                  name="body"
                  placeholder="Type a product body"
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="number"
                  name="price"
                  placeholder="How much?"
                />
              </FormGroup>
              <div>
                <ReactTags
                  name="tag" tags={tags}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  handleDrag={this.handleDrag}
                />
              </div>
              <Dropzone
                accept="image/*"
                onDrop={this.onImageDrop}
              >
                <p>Drop an image to upload.</p>
              </Dropzone>
              <div>
                {this.state.previewFile === '' ? null :
                <div>
                  <img alt="demand" src={this.state.previewFile.preview} width="150" height="150" />
                </div>}
              </div>

              <Button type="submit"  bsStyle="success">Fire it up!</Button>
            </form>
          </Modal.Body>
        </Modal>

      </div>
);
  }

}
