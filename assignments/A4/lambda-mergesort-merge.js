/**
 * Created by vanilla on 9/18/16.
 */
'use strict';

module.exports.handler = function(event, context, cb) {
  var result = [];

  while (event.left.length && event.right.length) {
    if (event.left[0] <= event.right[0]) {
      result.push(event.left.shift());
    } else {
      result.push(event.right.shift());
    }
  }

  while (event.left.length)
    result.push(event.left.shift());

  while (event.right.length)
    result.push(event.right.shift());

  return cb(null, result);
};
