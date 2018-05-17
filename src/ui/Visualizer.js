import { connect } from 'react-redux';
import { css } from 'glamor';
import React from 'react';

import DependencyList from './DependencyList';
import FilterBox from './FilterBox';

import * as FilterActions from '../data/action/filter';
import mapMap from '../util/mapMap';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
});

function walk(dependencies) {
  return mapMap(dependencies, ({ dependencies, version }, name, context) => {
    context.key(`${ name }@${ version }`);

    return {
      ...dependencies && walk(dependencies),
    };
  });
}

export default connect(
  ({ filter, packageJSON }, ownProps) => ({
    dependencies: walk(packageJSON.dependencies),
    filter
  }),
  (dispatch, ownProps) => ({
    handleFilterChange: ({ target: { value } }) => {
      // TODO: Add debounce
      dispatch(FilterActions.set(value));
    },
    handleDependencyClick: pattern => {
      dispatch(FilterActions.set(pattern));
    }
  })
)(props =>
  <div className={ ROOT_CSS }>
    <FilterBox
      onChange={ props.handleFilterChange }
      value={ props.filter }
    />
    <DependencyList
      dependencies={ props.dependencies }
      filter={ props.filter }
      onClick={ props.handleDependencyClick }
    />
  </div>
)
