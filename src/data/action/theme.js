const PREFIX = 'THEME/';

export const DARK_MODE = `${ PREFIX }DARK_MODE`;

export function darkMode() {
  return { type: DARK_MODE };
}

export const LIGHT_MODE = `${ PREFIX }LIGHT_MODE`;

export function lightMode() {
  return { type: LIGHT_MODE };
}
