import { css } from 'glamor';
import React from 'react';

import Dependency from './Dependency';

import mapMap from '../util/mapMap';
import mapToArray from '../util/mapToArray';

const ROOT_CSS = css({
  listStyleType: 'none',
  margin: 0,
  paddingBottom: 10,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,

  '& > li': {
    paddingBottom: '.8em'
  }
});

export default ({ dependencies, filter, hideOthers, onClick }) =>
  <ul className={ ROOT_CSS }>
    {
      mapToArray(mapMap(dependencies || {}, (subDependencies, name) =>
        <Dependency
          dependencies={ subDependencies }
          filter={ filter }
          hideOthers={ hideOthers }
          key={ name }
          name={ name }
          onClick={ onClick }
          parentDependencies={ [dependencies] }
        />
      ))
    }
  </ul>
