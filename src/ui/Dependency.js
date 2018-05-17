import { css } from 'glamor';
import React from 'react';

const ROOT_CSS = css({
  display: 'flex',
  flex: 1,

  '& > .arrow': {
    color: 'Red',
    padding: '0 1em'
  },

  '& > ul': {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
});

const Dependency = ({ dependencies, name }) => {
  return (
    <div className={ ROOT_CSS }>
      <div className="name">
        { name }
      </div>
      {
        !!Object.keys(dependencies).length &&
          <React.Fragment>
            <div className="arrow">-&gt;</div>
            <ul className="dependencies">
              {
                Object.keys(dependencies).map(name =>
                  <Dependency
                    dependencies={ dependencies[name] }
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
