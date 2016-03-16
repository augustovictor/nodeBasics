#!/usr/bin/env node

var args = require('minimist')(process.argv.slice(2), { string: "name" }); // Do not use single quotes

var name = args.name;

console.log('Hello ' + name);
