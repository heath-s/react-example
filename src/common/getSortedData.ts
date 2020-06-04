export default function getSortedData<T>(data: T[], key: string, direction: 'asc' | 'desc'): T[] | null {
  if (!data) {
    return null;
  }
  if (!key) {
    return data;
  }
  return data
    .sort((a, b) => {
      let valA = pluck(a, key);
      let valB = pluck(b, key);
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
      } else {
        valA = +valA || 0;
      }
      if (typeof valB === 'string') {
        valB = valB.toLowerCase();
      } else {
        valB = +valB || 0;
      }
      const mul = direction === 'desc' ? 1 : -1;
      if (valA < valB) {
        return mul;
      }
      if (valA > valB) {
        return -mul;
      }
      return 0;
    });
}

function pluck(value: any, key: string) {
  const keys = key.split('.');
  return keys
    .reduce((v: any, k: string) => {
      return v[k];
    }, value);
}
