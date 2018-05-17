const PREFIX = 'FILTER/';
export const SET_FILTER = `${ PREFIX }SET_FILTER`;

export function setFilter(pattern) {
  return {
    type: SET_FILTER,
    payload: pattern
  };
}

export const SET_HIDE_OTHERS = `${ PREFIX }SET_HIDE_OTHERS`;

export function setHideOthers(checked) {
  return {
    type: SET_HIDE_OTHERS,
    payload: checked
  };
}
