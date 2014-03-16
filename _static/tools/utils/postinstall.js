/*jshint node:true */
'use strict';

var path = require('path');
var shell = require('shelljs');

shell.cp('-R',
    path.resolve(__dirname, '../cache/nerdery-yuidoc-theme'),
    path.resolve(__dirname, '../../node_modules')
);
