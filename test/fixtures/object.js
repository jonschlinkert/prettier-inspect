/* eslint-disable  no-unused-vars */
function fn( a, b ){return a + b}

module.exports = {
  a: [ { foo: 'bar', baz: { qux: 'fez'}      }],
  c: 'd',
  e: 'f',
  g: function  (one, two){return one + two},
  h: {
    a: 'b',
    c: 'd'
  },
  regex: /^foo(?=bar)/g
};
