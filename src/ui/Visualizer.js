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
  return mapMap(dependencies, ({ dependencies, requires, version }, name, context) => {
    context.key(`${ name }@${ version }`);

    return {
      ...requires && mapMap(requires, (version, name, { key }) => {
        key(`${ name }@${ requires[name] }`);

        return true;
      }),
      ...dependencies && walk(dependencies),
    };
  });
}

export default connect(
  ({ filter, hideOthers, packageJSON }, ownProps) => ({
    dependencies: walk(packageJSON.dependencies),
    filter,
    hideOthers
  }),
  (dispatch, ownProps) => ({
    handleDependencyClick: pattern => {
      dispatch(FilterActions.setFilter(pattern));
    },
    handleFilterChange: nextValue => {
      // TODO: Add debounce
      dispatch(FilterActions.setFilter(nextValue));
    },
    handleHideOthersChange: ({ target: { checked } }) => {
      dispatch(FilterActions.setHideOthers(checked));
    }
  })
)(props =>
  <div className={ ROOT_CSS }>
    <FilterBox
      hideOthers={ props.hideOthers }
      onFilterChange={ props.handleFilterChange }
      onHideOthersChange={ props.handleHideOthersChange }
      value={ props.filter }
    />
    <DependencyList
      dependencies={ props.dependencies }
      filter={ props.filter }
      hideOthers={ props.hideOthers }
      onClick={ props.handleDependencyClick }
    />
  </div>
)
