import test from 'ava';
import _ from 'lodash';
import objectComb from './index';

test('gets string nested at first level', t => {
  let obj = {a : 'boom'};
  t.deepEqual(objectComb(obj, a => a.replace('om', 'm')), {a: 'bom'});
});

test('works if parent object is an array.', t => {
  let obj = ['boom'];
  t.deepEqual(objectComb(obj, a => a.replace('om', 'm')), ['bom']);
});

test('replaces multiple offending values', t => {
  let obj = ['boom', 'vroom'];
  t.deepEqual(objectComb(obj, a => a.replace('om', 'm')),
   ['bom', 'vrom']);
});

test('gets string nested at second level', t => {
  let obj = {
    a: {
      b: 'croom'
    }
  };
  t.deepEqual(objectComb(obj, a => a.replace('om', 'm')),
  {a:{b:'crom'}});
});

test('returns original val if passed a boolean', t => {
  let boo = true;
  t.is(objectComb(boo, a => a.replace('om', 'm')), true);
});

test('perform operation if value passed is string', t => {
  let strang = 'stroom';
  t.is(objectComb(strang, a => a.replace('om', 'm')), 'strom');
});

test('perform operation recursively on nested arrays', t => {
  let nest = [['c', 'c'], ['o', 'm', ['s', 't']]];
  t.deepEqual(objectComb(nest, e => e.replace('t', 'terous')), [['c', 'c'], ['o', 'm', ['s', 'terous']]]);
});

test('test for object.', t=> {
  let nest = {
    a: {
      site: 'cccom.com',
      build: 'cms',
    },
    b: {
      site: 'canada',
      build: 'lookbook'
    }
  };
  let transformer = r => {
    if(r.build == 'cms'){
      r.build = 'sterous';
    }
    return r;
  };
  t.is(objectComb(nest, transformer, _.isObject).a.build, 'sterous');
});

test('test for object at root', t=>{
  let nest = {
    site: 'cms',
    build: 'vb'
  },
    transformer = r => {
      r.build = r.build == 'vb' ? 'sterous' : r.build;
      return r;
    };
  t.deepEqual(objectComb(nest, transformer, r => _.isObject && _.has(r, 'build')), {site: 'cms', build: 'sterous'});
});

test('test for an array at root', t => {
  let arrest = [
    'tuna',
    'cheese',
    'taco'
  ],
    transformer = r => {
      return _.map(r, val => {
        return val == 'tuna' ? 'bean' : val;
      });
    };

    t.deepEqual(objectComb(arrest, transformer, _.isArray), ['bean', 'cheese', 'taco']);
});

test('test for an array nested', t => {
  let arrest = [
    'tuna',
    'cheese',
    ['taco', 'tuna']
  ],
    transformer = r => _.map(r, val => val == 'tuna' ? 'bean': val );
  t.deepEqual(objectComb(arrest, transformer, _.isArray), ['bean', 'cheese', ['taco', 'bean']]);
})