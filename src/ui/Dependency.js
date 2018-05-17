import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import * as Colors from './styles/colors';
import * as Fonts from './styles/fonts';

const ROOT_CSS = css({
  ...Colors.primaryText,

  display: 'flex',
  flex: 1,

  '& > .arrow': {
    ...Fonts.monospace,

    color: 'Red',
    paddingLeft: '.5em',
    paddingRight: '.5em'
  },

  '& > .name': {
    ...Fonts.monospace,

    alignSelf: 'flex-start',

    '& > button': {
      backgroundColor: 'Transparent',
      border: 0,
      color: 'inherit',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 16,
      outline: 0,
      padding: 0,

      '&:hover': {
        color: 'Black'
      }
    },

    '&.filter-in': {
      backgroundColor: 'Yellow'
    },

    '&.filter-out:not(.match-subtree)': {
      color: '#CCC'
    }
  },

  '& > ul': {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
});

function match(dependency, pattern) {
  return !!~dependency.indexOf(pattern);
}

function flatten(dependencies) {
  return Object.keys(dependencies).reduce((flattened, name) => [...flattened, name, flatten(dependencies[name])], []);
}

const Dependency = ({ dependencies, filter, hideOthers, name, onClick }) => {
  const packageName = name.split('@').slice(0, -1).join('@');
  const packageVersion = name.split('@').slice(-1)[0];
  const matchSubtree = filter && flatten(dependencies).some(dependency => match(dependency, filter));
  const filterIn = filter && match(name, filter);
  const filterOut = filter && !match(name, filter);

  if (hideOthers && filter && !filterIn && !matchSubtree) {
    return false;
  }

  return (
    <div className={ ROOT_CSS }>
      <span className={ classNames(['name'], filter ? { 'filter-in': filterIn, 'match-subtree': matchSubtree, 'filter-out': filterOut } : {}) }>
        <button
          onClick={ onClick && onClick.bind(null, packageName) }
          type="button"
        >
          { packageName }
        </button>
        @
        <button
          onClick={ onClick && onClick.bind(null, name) }
          type="button"
        >
          { packageVersion }
        </button>
      </span>
      {
        !!Object.keys(dependencies).length &&
          <React.Fragment>
            <div className="arrow">--&gt;</div>
            <ul className="dependencies">
              {
                Object.keys(dependencies).map(name =>
                  <Dependency
                    dependencies={ dependencies[name] }
                    filter={ filter }
                    hideOthers={ hideOthers }
                    key={ name }
                    name={ name }
                    onClick={ onClick }
                  />
                )
              }
            </ul>
          </React.Fragment>
      }
    </div>
  );
}

export default Dependency;
