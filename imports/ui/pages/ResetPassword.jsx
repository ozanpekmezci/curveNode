import React from 'react';
import { Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleResetPassword from '../../modules/reset-password';

class ResetPassword extends React.Component {
  static handleSubmit(event) {
    event.preventDefault();
  }
  componentDidMount() {
    handleResetPassword({
      component: this,
      token: this.props.params.token,
    });
  }



  render() {
    return( <Row>
      <Col xs={12} sm={6} md={4}>
        <h4 className="page-header">Reset Password</h4>
        <Alert bsStyle="info">
          To reset your password, enter a new one below. You will be logged in
with your new password.
        </Alert>
        <form ref={form => (this.resetPasswordForm = form)} className="reset-password" onSubmit={ResetPassword.handleSubmit}>
          <FormGroup>
            <ControlLabel>New Password</ControlLabel>
            <FormControl
              type="password"
              name="newPassword"
              placeholder="New Password"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Repeat New Password</ControlLabel>
            <FormControl
              type="password"
              name="repeatNewPassword"
              placeholder="Repeat New Password"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Reset Password &amp; Login</Button>
        </form>
      </Col>
    </Row>);
  }
}
export default ResetPassword;
ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
