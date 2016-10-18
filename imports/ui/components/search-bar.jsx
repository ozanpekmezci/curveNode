import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    let searchValue = target.value.trim();

    if (searchValue === '') {
      searchValue = null;
    }
    this.props.onUserInput(searchValue);
  }
  render() {
    return (
      <FormGroup>
        <FormControl type="text" onKeyUp={this.handleChange} placeholder="Enter search terms here." />
      </FormGroup>
    );
  }
}
SearchBar.propTypes = {
  onUserInput: React.PropTypes.func
};
