import { css } from 'glamor';
import React from 'react';

import * as Fonts from './styles/fonts';

const ROOT_CSS = css({
  ...Fonts.monospace,

  backgroundColor: 'rgba(255, 255, 255, .8)',
  bottom: 0,
  color: '#999',
  fontStyle: 'italic',
  padding: 10,
  position: 'fixed',
  right: 0,

  '& > a': {
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

export default props =>
  <div className={ ROOT_CSS }>
    package-lock walker by <a href="https://github.com/compulim/">@compulim</a>
  </div>
