const PREFIX = 'FILTER/';
export const SET = `${ PREFIX }SET`;

export function set(pattern) {
  return {
    type: SET,
    payload: pattern
  };
}
