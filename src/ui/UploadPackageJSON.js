import { connect } from 'react-redux';
import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';
import DropToUpload from 'react-drop-to-upload';
import onErrorResumeNext from 'on-error-resume-next';

import { load } from '../data/action/file';
import * as Fonts from './styles/fonts';

const ROOT_CSS = css({
  backgroundImage: 'url(screenshot.gif)',
  backgroundPosition: '20px 20px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderColor: '#CCC',
  borderRadius: 50,
  borderStyle: 'dashed',
  borderWidth: 8,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',

  '&.over': {
    backgroundColor: '#DFD',
    backgroundImage: 'none',
    borderColor: '#3C3'
  }
});

const INSTRUCTIONS_CSS = css({
  color: '#666',

  '& > .upload': {
    ...Fonts.monospace,

    fontSize: 30
  },

  '& > .notes': {
    fontSize: 12,
    marginTop: '2em'
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
        className={ classNames(ROOT_CSS + '', { over: state.over }) }
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
                  Drop your package-lock.json here
                </div>
                <div className="notes">
                  <p>Don't worry, this is a pure browser app, we don't send your file over the network.</p>
                  <p>We do collect anonymous page visit data. It is not derived from any forms and parts of your file.</p>
                  <p>We respect your privacy.</p>
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
