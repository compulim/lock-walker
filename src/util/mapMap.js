export default function mapMap(obj, mapper) {
  return Object.keys(obj).reduce((nextMap, key) => ({
    ...nextMap,
    [key]: mapper.call(obj, obj[key], key)
  }), {});
}
