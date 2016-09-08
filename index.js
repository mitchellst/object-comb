const _ = require('lodash');

module.exports = objectComb;
/**
 * @param {any} obj
 * @param {function} operation
 * @param {function:bool} test
 * @returns {any} a transformed version of obj.
 */
function objectComb(obj, operation, test=_.isString){
  obj = test(obj) ? operation(obj) : obj;

  if(_.isArray(obj) || _.isObject(obj)){
    let mapFunction = _.isArray(obj) ? _.map : _.mapValues;
    return mapFunction(obj, val => objectComb(val, operation, test));
  }
  
  return obj;
  
};