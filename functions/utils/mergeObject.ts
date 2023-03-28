function mergeObject(base: any, update: any) {
  const dest: Record<string, any> = {};
  Object.entries(update).forEach(([key, value]) => {
    if (base[key] !== value) {
      if (
        base[key] &&
        value &&
        base[key] instanceof Array &&
        value instanceof Array
      ) {
        dest[key] = Array.from(new Set(base[key].concat(update[key])));
      } else if (
        base[key] &&
        value &&
        typeof base[key] === "object" &&
        value instanceof Date
      ) {
        dest[key] = new Date(update[key]);
      } else if (
        base[key] &&
        value &&
        typeof base[key] === "object" &&
        typeof value === "object"
      ) {
        dest[key] = mergeObject(base[key], value);
      } else if (value !== undefined) {
        dest[key] = value;
      } else {
        dest[key] = base[key];
      }
    } else {
      dest[key] = value;
    }
  });
  return dest;
}

export default mergeObject;
