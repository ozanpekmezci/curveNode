import React from 'react';
import { Row, Col,FormGroup, FormControl } from 'react-bootstrap';
import ProductsList from '../containers/products-list.js';
import  AddProduct  from '../components/add-product.jsx';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {searchValue:"",};
}
  handleSearch(event) {
  const target = event.target;
  const searchValue = target.value.trim();

  if (searchValue !== '') {
      this.setState({ searchValue: searchValue });
}else{
  this.setState({ searchValue: null });
}
}
  render() {
    return(
      <Row>
        <Col xs={12}>
          <h4 className="page-header">Products</h4>
          <FormGroup>
            <FormControl
              type="text"
              onKeyUp={this.handleSearch}
              placeholder="Enter search terms here."
            />
          </FormGroup>
          <AddProduct />
          <ProductsList searchValue={this.state.searchValue} />
        </Col>
      </Row>);
}
}
