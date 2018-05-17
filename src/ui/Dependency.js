import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import fontFamily from '../util/fontFamily';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,

  '& > .arrow': {
    color: 'Red',
    fontFamily: fontFamily('Consolas', 'Courier New', 'monospace'),
    paddingLeft: '.5em',
    paddingRight: '.5em'
  },

  '& > .name': {
    alignSelf: 'flex-start',
    fontFamily: fontFamily('Consolas', 'Courier New', 'monospace'),

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

    '&.filter-out': {
      color: '#CCC'
    }
  },

  '& > ul': {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
});

const Dependency = ({ dependencies, filter, name, onClick }) => {
  const filterIn = filter && ~name.indexOf(filter);
  const filterOut = filter && !~name.indexOf(filter);
  const packageName = name.split('@').slice(0, -1).join('@');
  const packageVersion = name.split('@').slice(-1)[0];

  return (
    <div className={ ROOT_CSS }>
      <span className={ classNames(['name'], { 'filter-in': filterIn, 'filter-out': filterOut }) }>
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
