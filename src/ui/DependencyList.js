import { css } from 'glamor';
import React from 'react';

import Dependency from './Dependency';

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

export default ({ dependencies, filter, hideOthers, onClick, packages }) =>
  <ul className={ ROOT_CSS }>
    {
      Object.keys(dependencies).map(name =>
        <Dependency
          filter={ filter }
          hideOthers={ hideOthers }
          key={ name }
          name={ name }
          onClick={ onClick }
          packages={ packages }
          requires={ dependencies[name].requires }
        />
      )
    }
  </ul>
