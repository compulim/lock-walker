import { css } from 'glamor';
import React from 'react';

import * as Fonts from './styles/fonts';

const ROOT_CSS = css({
  flexBasis: 50,
  flexShrink: 0,

  '& > .fixed': {
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',

    '& > input': {
      ...Fonts.monospace,

      borderColor: '#CCC',
      borderStyle: 'solid',
      borderWidth: 1,
      color: '#333',
      flex: 1,
      fontSize: 20,
      height: 20,
      margin: 10,
      outline: 0,
      padding: 10
    },

    '& > label': {
      alignItems: 'center',
      bottom: -16,
      color: '#333',
      cursor: 'pointer',
      display: 'flex',
      fontSize: 16,
      position: 'absolute',
      right: 10,
      userSelect: 'none'
    }
  }
});

export default ({ hideOthers, onFilterChange, onHideOthersChange, value }) =>
  <React.Fragment>
    <div className={ ROOT_CSS }>
      <div className="fixed">
        <input
          autoFocus={ true }
          onChange={ onFilterChange }
          placeholder="Type keyword here"
          value={ value }
        />
        <label>
          <input
            checked={ hideOthers }
            onChange={ onHideOthersChange }
            type="checkbox"
          />
          Hide others
        </label>
      </div>
    </div>
  </React.Fragment>
