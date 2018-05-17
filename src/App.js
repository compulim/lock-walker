import { connect } from 'react-redux';
import { css } from 'glamor';
import React from 'react';

import UploadPackageJSON from './ui/UploadPackageJSON';
import Visualizer from './ui/Visualizer';

css.global('html', {
  display: 'flex',
  fontFamily: ['Arial', 'sans-serif'].map(name => `'${ name }'`).join(','),
  height: '100%'
});

css.global('body, #root', {
  display: 'flex',
  flex: 1
});

const ROOT_CSS = css({
  display: 'flex',
  flex: 1
});

export default connect(
  (state, ownProps) => ({
    loaded: !!state.packageJSON
  }),
  (dispatch, ownProps) => ({
  })
)(props =>
  <div className={ ROOT_CSS }>
    {
      props.loaded ?
        <Visualizer />
      :
        <UploadPackageJSON />
    }
  </div>
);
