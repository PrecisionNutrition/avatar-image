/*
 * Courtesy of MDN:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 *
 * with the addition of escaping the literal `/` character.
 */

export default function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()/|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
