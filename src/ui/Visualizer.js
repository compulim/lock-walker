import { connect } from 'react-redux';
import React from 'react';

import DependencyList from './DependencyList';

import mapMap from '../util/mapMap';
import mapToArray from '../util/mapToArray';

export default connect(
  ({ packageJSON }, ownProps) => {
    const allDependencies = mapToArray(mapMap(packageJSON.dependencies, ({ version }, name) => `${ name }@${ version }`)).sort();

    return {
      allDependencies
    };
  },
  (dispatch, ownProps) => ({
  })
)(props =>
  <React.Fragment>
    <DependencyList dependencies={ props.allDependencies } />
  </React.Fragment>
)
