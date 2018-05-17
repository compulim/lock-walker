import { css } from 'glamor';
import React from 'react';

import fontFamily from '../util/fontFamily';

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
      (props.dependencies || []).map(dependency =>
        <li key={ dependency }>{ dependency }</li>
      )
    }
  </ul>
