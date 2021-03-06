#!/usr/bin/env node

'use strict';

const path = require('path');
const assert = require('assert');
const utils = require('../utils.js');

assert(!module.parent);
assert(__dirname === process.cwd());

const target = process.argv[2] || 'host';
const input = './test-x-index.js';
const output = './АБРАКАДАБРА/test-output.exe'; // cyrillic

let right;
utils.mkdirp.sync(path.dirname(output));

utils.pkg.sync(['--target', target, '--output', output, input]);

right = utils.spawn.sync(output, [], {});

assert.strictEqual(right, '42\n42\n');
utils.vacuum.sync(path.dirname(output));
