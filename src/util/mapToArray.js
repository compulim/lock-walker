export default function mapToArray(map) {
  return Object.keys(map).map(key => map[key]);
}
