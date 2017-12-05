const babel = require('babel-core');
const { writeFileSync } = require('fs');

const { code } = babel.transformFileSync('./src/index.js');

writeFileSync('./dist/index.js', code);
