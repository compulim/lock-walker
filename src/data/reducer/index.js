import * as FileActions from '../action/file';

const DEFAULT_STATE = {
  packageJSON: null
};

export default function reducer(state = DEFAULT_STATE, { payload, type }) {
  switch (type) {
    case FileActions.LOAD:
      state = { ...state, packageJSON: payload };
      break;
  }

  return state;
}
