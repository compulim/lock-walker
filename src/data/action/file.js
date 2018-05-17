const PREFIX = 'FILE/';

export const LOAD = `${ PREFIX }LOAD`;

export function load(obj) {
  return {
    type: LOAD,
    payload: obj
  };
}
