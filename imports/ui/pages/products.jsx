import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductsList from '../containers/products-list.js';
import  AddProduct  from '../components/add-product.jsx';
import SearchBar from '../components/search-bar.jsx';
import FollowUsers from '../containers/follow-users.jsx';


export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.state = {searchValue:"",};
}
handleUserInput(searchValue) {
   this.setState({
     searchValue: searchValue,
   });
 }
  render() {
    return(
      <Row>
        <Col xs={12} sm={8} md={8}>
          <h4 className="page-header">Products</h4>
          <SearchBar onUserInput={this.handleUserInput} />
          <AddProduct />
          <ProductsList searchValue={this.state.searchValue} />
        </Col>
        <Col xs={12} sm={4} md={4}>
          <FollowUsers />
        </Col>
      </Row>);
}
}
