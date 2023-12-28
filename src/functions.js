export function generateTimestampOrderedStrings(prefix) {
  const timestamp = Date.now();
  const formattedTimestamp = prefix + timestamp.toString();
  return formattedTimestamp;
}
