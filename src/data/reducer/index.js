import * as FileActions from '../action/file';
import * as FilterActions from '../action/filter';
import * as ThemeActions from '../action/theme';

const DEFAULT_STATE = {
  filter: null,
  hideOthers: true,
  packageJSON: null,
  theme: 'light'
};

export default function reducer(state = DEFAULT_STATE, { payload, type }) {
  switch (type) {
    case FileActions.LOAD:
      state = { ...state, packageJSON: payload };
      break;

    case FilterActions.SET_FILTER:
      state = { ...state, filter: payload };
      break;

    case FilterActions.SET_HIDE_OTHERS:
      state = { ...state, hideOthers: payload };
      break;

    case ThemeActions.DARK_MODE:
      state = { ...state, theme: 'dark' };
      break;

    case ThemeActions.LIGHT_MODE:
      state = { ...state, theme: 'light' };
      break;

    default: break;
  }

  return state;
}
