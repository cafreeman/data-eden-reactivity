export function traverse(obj: any, predicate: (key: string, value: any, parent: any) => boolean) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  Object.entries(obj).forEach(([key, value]) => {
    if (predicate(key, value, obj)) {
      traverse(value, predicate);
    }
  });
}
