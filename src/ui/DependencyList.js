import { css } from 'glamor';
import React from 'react';

import Dependency from './Dependency';

import fontFamily from '../util/fontFamily';
import mapMap from '../util/mapMap';
import mapToArray from '../util/mapToArray';

const ROOT_CSS = css({
  listStyleType: 'none',
  margin: 0,
  padding: 0,

  '> li': {
    fontFamily: fontFamily('Consolas', 'Courier New', 'monospace')
  }
});

export default props =>
  <ul className={ ROOT_CSS }>
    {
      mapToArray(mapMap(props.dependencies || {}, (dependencies, name) =>
        <li key={ name }>
          <Dependency dependencies={ dependencies } name={ name } />
        </li>
      ))
    }
  </ul>
