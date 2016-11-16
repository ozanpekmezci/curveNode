import React from 'react';
import {Grid} from 'react-bootstrap';
import AppNavigation from '../containers/AppNavigation';

const App = ({children}) => {
  return (
    <div>
      <AppNavigation />
      <Grid>
        {children}
      </Grid>
    </div>

  );

};
export default App;
App.propTypes = {
  children: React.PropTypes.element.isRequired
};
