export default function mapMap(obj, mapper) {
  return Object.keys(obj).reduce((nextMap, key) => {
    const context = { key: nextKey => key = nextKey };
    const nextValue = mapper.call(obj, obj[key], key, context);

    return {
      ...nextMap,
      [key]: nextValue
    };
  }, {});
}
