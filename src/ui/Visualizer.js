import { connect } from 'react-redux';
import React from 'react';

import DependencyList from './DependencyList';

export default connect(
  (state, ownProps) => ({
  }),
  (dispatch, ownProps) => ({
  })
)(props =>
  <React.Fragment>
    <DependencyList />
  </React.Fragment>
)
