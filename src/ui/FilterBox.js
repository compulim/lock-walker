import { css } from 'glamor';
import React from 'react';

import * as Fonts from './styles/fonts';

const DEBOUNCE = 300;

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

export default class FilterBox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { value: props.value };
  }

  componentWillReceiveProps({ value }) {
    this.setState(() => ({ value }));
  }

  componentWillUnmount() {
    clearTimeout(this._debounce);
  }

  handleFilterChange = ({ target: { value } }) => {
    clearTimeout(this._debounce);

    this.setState(() => ({ value }));

    this._debounce = setTimeout(() => {
      this.props.onFilterChange(value);
    }, DEBOUNCE);
  }

  handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      clearTimeout(this._debounce);
      this.props.onFilterChange(this.state.value);
    }
  }

  render() {
    const { props, state } = this;
    const { hideOthers, onHideOthersChange } = props;
    const { value } = state;

    return (
      <React.Fragment>
        <div className={ ROOT_CSS }>
          <div className="fixed">
            <input
              autoFocus={ true }
              onChange={ this.handleFilterChange }
              onKeyDown={ this.handleKeyDown }
              placeholder="Type keyword here"
              value={ value || '' }
            />
            <label>
              <input
                checked={ hideOthers || false }
                disabled={ !value }
                onChange={ onHideOthersChange }
                type="checkbox"
              />
              Hide others
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
