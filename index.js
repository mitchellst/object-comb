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

  if(_.isArray(obj) || _.isObject(obj)){
    let mapFunction = _.isArray(obj) ? _.map : _.mapValues;
    
    return mapFunction(obj, val => {
      if(test(val)){
        return operation(val);
      } else if (_.isObject(val) || _.isArray(val)) {
        return objectComb(val, operation, test); 
      } else return val;
    });
  }
  
  return obj;
  
};