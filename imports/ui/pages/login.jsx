import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleLogin from '../../modules/login';

class Login extends React.Component {
  static handleSubmit(event) {
    event.preventDefault();
  }
  componentDidMount() {
    handleLogin({ component: this });
  }



  render() {
    return( <Row>
      <Col xs={12} sm={6} md={4}>
        <h4 className="page-header">Login</h4>
        <form ref={form => (this.loginForm = form)} className="login" onSubmit={Login.handleSubmit}>
          <FormGroup>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type="email"
              name="emailAddress"
              placeholder="Email Address"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <span className="pull-left">Password</span>
              <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
            </ControlLabel>
            <FormControl
              type="password"
              name="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Login</Button>
        </form>
      </Col>
    </Row>);
  }
}
export default Login;
