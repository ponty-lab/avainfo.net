const findKey = (obj: Record<string, any>, val: string): string | null => {
  if (typeof obj === 'object') {
    for (const key in obj) {
      if (obj[key] === val) {
        return key;
      } else {
        const result: string | null = findKey(obj[key], val);
        if (result !== null) return result;
      }
    }
  }

  return null;
};

export default findKey;
