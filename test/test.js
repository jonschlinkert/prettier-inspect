'use strict';

require('mocha');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const prettier = require('prettier');
const inspect = require('..');

const fixtures = path.join.bind(path, __dirname, 'fixtures');
const expected = path.join.bind(path, __dirname, 'expected');
const read = name => fs.readFileSync(expected(name), 'utf8');

describe('prettier-inspect', function() {
  it('should format arrays', function() {
    assert.equal(inspect(['a', 'b']), `['a', 'b'];\n`);
    assert.equal(inspect([{a: 'b'}]), `[{ a: 'b' }];\n`);
    assert.equal(inspect(require(fixtures('array'))), read('array.txt'));
  });

  it('should format booleans', function() {
    assert.equal(inspect(true), 'true');
    assert.equal(inspect(false), 'false');
  });

  it('should format buffers', function() {
    assert.equal(inspect(new Buffer('foo')), '<Buffer 66 6f 6f>');
    assert.equal(inspect(new Buffer('')), '<Buffer >');
  });

  it('should format dates', function() {
    assert.equal(inspect(new Date('2017-12-01T20:08:42.357Z')), '2017-12-01T20:08:42.357Z');
  });

  it('should format errors', function() {
    assert(/^Error: foo/.test(inspect(new Error('foo'))));
  });

  it('should format functions', function() {
    function foo( a  ,   b  ){return a + b }
    assert.equal(inspect(foo), prettier.format(foo.toString()));
  });

  it('should format null and undefined', function() {
    assert.equal(inspect(null), 'null');
    assert.equal(inspect(), 'undefined');
    assert.equal(inspect(undefined), 'undefined');
  });

  it('should format numbers', function() {
    assert.equal(inspect(0), '0');
    assert.equal(inspect(10), '10');
  });

  it('should format objects', function() {
    assert.equal(inspect({a: 'b'}), `{ a: 'b' };\n`);
    assert.equal(inspect(require(fixtures('object'))), read('object.txt'));
  });

  it('should format regular expressions', function() {
    assert.equal(inspect(/foo/), '/foo/');
    assert.equal(inspect(/^foo$/), '/^foo$/');
  });

  it('should format strings', function() {
    assert.equal(inspect('foo'), `'foo'`);
    assert.equal(inspect('"foo";'), `'foo'`);
  });

  it('should format symbols', function() {
    assert.equal(inspect(Symbol('foo')), 'Symbol(foo)');
  });
});
