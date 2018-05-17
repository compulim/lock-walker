import { css } from 'glamor';
import React from 'react';

import * as Fonts from './styles/fonts';

const ROOT_CSS = css({
  flexBasis: 50,
  flexShrink: 0,

  '& > .fixed': {
    display: 'flex',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',

    '& > input': {
      ...Fonts.monospace,

      // backgroundColor: 'rgba(255, 255, 255, .8)',
      borderColor: '#CCC',
      borderStyle: 'solid',
      borderWidth: 1,
      flex: 1,
      fontSize: 20,
      height: 20,
      margin: 10,
      outline: 0,
      padding: 10
    }
  }
});

export default ({ onChange, value }) =>
  <React.Fragment>
    <div className={ ROOT_CSS }>
      <div className="fixed">
        <input
          autoFocus={ true }
          onChange={ onChange }
          placeholder="filter"
          value={ value }
        />
      </div>
    </div>
  </React.Fragment>
