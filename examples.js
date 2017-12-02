/* eslint-disable  no-unused-vars */
const inspect = require('./');
function fn( a, b ){return a + b}

let foo = {
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

console.log('== arrays ==');
console.log(inspect([{a: 'b', c: 'd', e: 'f'}]))
console.log('== buffer ==');
console.log(inspect(new Buffer('foo')));
console.log();
console.log('== dates ==');
console.log(inspect(new Date()));
console.log();
console.log('== errors ==');
console.log(inspect(new Error('this is an error!')));
console.log();
console.log('== functions ==');
console.log(inspect(fn));
console.log();
console.log('== number ==');
console.log(inspect(9));
console.log();
console.log('== objects ==');
console.log(inspect({foo: 'bar', baz: 'qux'}));
console.log(inspect({foo: foo, baz: 'qux'}));
console.log(inspect(foo))
console.log();
console.log('== regex ==');
console.log(inspect(/foo/));
console.log();
console.log('== strings ==');
console.log(inspect('foo\nbar'));
console.log(inspect('9'));
console.log();
console.log('== undefined/null ==');
console.log(inspect(null));
console.log(inspect());
console.log();

var m = /foo/.exec('foo');
var obj = {
  match: m
};

console.log(inspect(/foo/.exec('foo')))
console.log(inspect(obj))


function func( a, b ){return a + b}
console.log(inspect([{a: 'b', c: 'd', e: 'f', fn: fn}]));

console.log(inspect({
  obj: {
  a: [ { foo: 'bar', baz: { qux: 'fez'}      }],
  c: 'd', e: 'f',
  g: function  (one, two){return one + two},
  h: {a: 'b', c: 'd'},
  regex: /^foo(?=bar)/g }
}));
