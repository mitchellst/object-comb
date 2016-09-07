const _ = require('lodash');

module.exports = objectComb;
/**
 * @param {any} obj
 * @param {function} operation
 * @param {function:bool} test
 * @returns {any} a transformed version of obj.
 */
function objectComb(obj, operation, test=_.isString){
  if (test(obj)) {
    obj = operation(obj); 
  }
  if(_.isArray(obj)){
    return obj.map(val => {
      if (test(val)){
        return operation(val);
      } else if (_.isObject(val) || _.isArray(val)) {
        return objectComb(val, operation, test); 
      } else return val;
    });
  } else if(_.isObject(obj)){
    return _.mapValues(obj, val => {
      if(test(val)){
        return operation(val);
      } else if (_.isObject(val) || _.isArray(val)) {
        return objectComb(val, operation, test); 
      } else return val;
    });
  }
  return obj;
  
};