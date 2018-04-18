import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import gas from 'rollup-plugin-gas';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/app.js',
  output: {
    file: 'dist/app.js',
    format: 'es',
  },
  plugins: [
    nodeResolve({ jsnext: true }),
    babel({
      exclude: 'node_modules/**',
    }),
    gas(),
    copy({
      'src/appsscript.json': 'dist/appsscript.json',
      'src/index.html': 'dist/index.html',
    }),
  ],
};
