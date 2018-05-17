import { connect } from 'react-redux';
import { css } from 'glamor';
import React, { Component } from 'react';
import DropToUpload from 'react-drop-to-upload';
import onErrorResumeNext from 'on-error-resume-next';
import { load } from '../data/action/file';

const ROOT_CSS = css({
  flex: 1
});

class UploadPackageJSON extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      over: false
    };
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
        {
          state.over ?
            'Drop to visualize'
          :
            'Drop package.json here'
        }
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
