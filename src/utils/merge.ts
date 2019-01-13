// autor: https://stackoverflow.com/a/50228121/3744400
// Alternativa https://www.npmjs.com/package/object-merge-advanced
export function merge(current, update) {
  Object.keys(update).forEach(function (key) {
    // if update[key] exist, and it's not a string or array,
    // we go in one level deeper
    if (current.hasOwnProperty(key)
      && typeof current[key] === 'object'
      && !(current[key] instanceof Array)) {
      merge(current[key], update[key]);

      // if update[key] doesn't exist in current, or it's a string
      // or array, then assign/overwrite current[key] to update[key]
    } else {
      current[key] = update[key];
    }
  });
  return current;
}