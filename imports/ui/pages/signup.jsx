import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleSignup from '../../modules/signup';

class Signup extends React.Component {

  componentDidMount() {
    handleSignup({ component: this });
  }
  handleSubmit(event) {
   event.preventDefault();
  }


  render() {
    return( <Row>
      <Col xs={12} sm={6} md={4}>
        <h4 className="page-header">Sign Up</h4>
        <form ref={form => (this.signupForm = form)} className="signup" onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={6} sm={6}>
              <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
              </FormGroup>
            </Col>
            <Col xs={6} sm={6}>
              <FormGroup>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="text"
              name="emailAddress"
              placeholder="Email Address"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              name="username"
              placeholder="Username"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              name="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Sign Up</Button>
        </form>
        <p>Already have an account? <Link to="/login">Log In</Link>.</p>
      </Col>
    </Row>);
  }
}
export default Signup;
