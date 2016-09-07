# Object Comb

Object comb is a find-and-replace that recursively drills down on a javascript object. 

`objectComb(obj, operation, test)`
returns: a transformed version of the object.

params:
`obj` - the JS object whose owned enumerated properties you are finding and replacing.
`operation`- a function that receives a single argument (the matched value to be replaced) and is responsible for returning its replacement.
`test` - a function that takes a value and determines whether or not it should be replaced by running it through `operation`. (returns a Boolean.) *Default* is `_.isString`.

For example:

```javascript
const objectComb = require('object-comb');

let dated = {
  title: 'Best deals for September',
  menu: [
    {
      title: 'Credit Card Deals for September',
      link : '/credit-card-deals/'
    },
    {
      title: 'Banking Deals for September',
      link : '/banking-deals/'
    }
  ]
};

objectComb(dated, s => s.replace('September', 'October'));
// Result:
// {
//   "title": "Best deals for October",
//   "menu": [
//     {
//       "title": "Credit Card Deals for October",
//       "link": "/credit-card-deals/"
//     },
//     {
//       "title": "Banking Deals for October",
//       "link": "/banking-deals/"
//     }
//   ]
// }

```
