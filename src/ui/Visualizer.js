import { connect } from 'react-redux';
import React from 'react';

import Dependency from './Dependency';
import DependencyList from './DependencyList';

import mapMap from '../util/mapMap';
import mapToArray from '../util/mapToArray';

function walk(dependencies) {
  return mapMap(dependencies, ({ dependencies, version }, name, context) => {
    context.key(`${ name }@${ version }`);

    return {
      ...dependencies && walk(dependencies),
    };
  });
}

export default connect(
  ({ packageJSON }, ownProps) => {
    const allDependencies = mapToArray(mapMap(packageJSON.dependencies, ({ version }, name) => `${ name }@${ version }`)).sort();

    return {
      allDependencies,
      dependencies: walk(packageJSON.dependencies)
    };
  },
  (dispatch, ownProps) => ({
  })
)(props =>
  <React.Fragment>
    <DependencyList dependencies={ props.dependencies } />
  </React.Fragment>
)
