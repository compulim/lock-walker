import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,

  '& > .arrow': {
    color: 'Red',
    paddingLeft: '.5em',
    paddingRight: '.5em'
  },

  '& > .name.filter-out': {
    color: '#CCC'
  },

  '& > ul': {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
});

const Dependency = ({ dependencies, filter, name }) => {
  return (
    <div className={ ROOT_CSS }>
      <div className={ classNames(['name'], { 'filter-out': filter && !~name.indexOf(filter) }) }>
        { name }
      </div>
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
