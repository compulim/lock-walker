import { connect } from 'react-redux';
import { css } from 'glamor';
import React from 'react';
import DropToUpload from 'react-drop-to-upload';
import onErrorResumeNext from 'on-error-resume-next';

import { load } from '../data/action/file';
import * as Fonts from './styles/fonts';

const ROOT_CSS = css({
  display: 'flex',
  borderColor: '#CCC',
  borderStyle: 'dashed',
  borderWidth: 10,
  borderRadius: 20,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center'
});

const INSTRUCTIONS_CSS = css({
  color: '#CCC',

  '& > .upload': {
    ...Fonts.monospace,

    fontSize: 30
  },

  '& > .notes': {
    marginTop: '1em',

    '& > button': {
      background: 'Transparent',
      borderWidth: 0,
      color: 'inherit',
      cursor: 'pointer',
      fontSize: 'inherit',
      padding: 0,
      textDecoration: 'underline'
    }
  }
});

class UploadPackageJSON extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      over: false
    };
  }

  handleDownloadSampleClick = async () => {
    const res = await fetch('https://github.com/lerna/lerna/raw/master/package-lock.json');

    console.log(res.status);
  }

  handleLeave = () => this.setState(() => ({ over: false }))
  handleOver = () => this.setState(() => ({ over: true }))

  render() {
    const { props, state } = this;

    return (
      <DropToUpload
        className={ ROOT_CSS + '' }
        onDrop={ props.handleDrop }
        onLeave={ this.handleLeave }
        onOver={ this.handleOver }
      >
        <div className={ INSTRUCTIONS_CSS }>
          {
            state.over ?
              <React.Fragment>
                <div className="upload">
                  Release to upload
                </div>
                <div className="notes">
                  Be patient, the DOM could be huge even for React, it may take a while
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <div className="upload">
                  Drop package.json here
                </div>
                <div className="notes">
                  Don't worry, this is pure browser app, we don't send your package-lock.json over the network
                </div>
              </React.Fragment>
          }
        </div>
      </DropToUpload>
    );
  }
}

export default connect(
  (state, ownProps) => ({}),
  (dispatch, ownProps) => ({
    handleDrop: files => {
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        const packageJSON = onErrorResumeNext(() => JSON.parse(result));

        packageJSON && dispatch(load(packageJSON));
      };

      reader.readAsText(files[0]);
    }
  })
)(UploadPackageJSON);
