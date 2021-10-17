import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.exports.import,
      format: 'es',
    },
    {
      file: pkg.exports.require,
      format: 'cjs',
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            useBuiltIns: 'entry',
            targets: 'defaults',
          },
        ],
      ],
    })
  ]
};
