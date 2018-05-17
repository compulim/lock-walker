export default function fontFamily(...fonts) {
  return (fonts || []).map(font => `'${ font }'`).join(',');
}
