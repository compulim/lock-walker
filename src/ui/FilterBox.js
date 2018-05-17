import { css } from 'glamor';
import React from 'react';

import * as Fonts from './styles/fonts';

const ROOT_CSS = css({
  ...Fonts.monospace,

  fontSize: 20,
  marginBottom: 10,
  padding: 10
});

export default ({ onChange, value }) =>
  <input
    autoFocus={ true }
    className={ ROOT_CSS }
    onChange={ onChange }
    placeholder="filter"
    value={ value }
  />
