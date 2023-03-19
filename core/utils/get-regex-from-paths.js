export function getRegexFromPaths(paths) {
  const regexStrings = paths.map((path) => {
    if (path.endsWith('/*')) {
      // replace the wildcard with a regex pattern
      return `^${path.replace('/*', '(/.*)?')}$`;
    }
    // escape special characters and add anchors to make an exact match
    return `^${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`;
  });

  const regex = new RegExp(`(${regexStrings.join('|')})`);

  return regex;
}
