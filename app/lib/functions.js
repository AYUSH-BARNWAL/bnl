export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function generateTimestampOrderedStrings(prefix) {
  const timestamp = Date.now();
  const formattedTimestamp = prefix + timestamp.toString();
  return formattedTimestamp;
}
