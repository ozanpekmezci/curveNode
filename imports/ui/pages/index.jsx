import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <Jumbotron className="text-center">
    <h2>Curve</h2>
    <p>A marketplace to sell goods.</p>
    <p><a className="btn btn-success" href="https://themeteorchef.com/base" role="button">Read the Documentation</a></p>
    <p style={{ fontSize: '16px', color: '#aaa' }}>Currently at v4.7.0</p>
  </Jumbotron>
);
export default Index;
