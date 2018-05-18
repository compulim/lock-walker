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

function flatten(deps = {}) {
  let flattened = {};

  Object.keys(deps).forEach(name => {
    const { dependencies: subDeps = {}, requires = {}, version } = deps[name];
    const fullName = [name, version].join('@');
    const entry = (flattened[fullName] || (flattened[fullName] = {}));

    entry.dependencies || (entry.dependencies = {});

    Object.keys(requires).forEach(subName => {
      const subFullName = [subName, requires[subName]].join('@');

      entry.dependencies[subFullName] = { requires: !subDeps[subFullName] };

      const subEntry = (flattened[subFullName] || (flattened[subFullName] = {}));
      const dependents = subEntry.dependents || (subEntry.dependents = []);

      dependents.push(fullName);
    });

    flattened = { ...flattened, ...flatten(subDeps) };
  });

  return flattened;
}

export default connect(
  ({ filter, hideOthers, packageJSON }, ownProps) => {
    const rootDependencies = mapMap(packageJSON.dependencies, ({ version }, name, { key }) => {
      key([name, version].join('@'));

      return { requires: false };
    });

    return ({
      dependencies: rootDependencies,
      packages: flatten(packageJSON.dependencies),
      filter,
      hideOthers
    });
  },
  (dispatch, ownProps) => ({
    handleDependencyClick: pattern => {
      dispatch(FilterActions.setFilter(pattern));
    },
    handleFilterChange: nextValue => {
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
      packages={ props.packages }
      filter={ props.filter }
      hideOthers={ props.hideOthers }
      onClick={ props.handleDependencyClick }
    />
  </div>
)
