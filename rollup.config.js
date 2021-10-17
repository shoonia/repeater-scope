import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.main,
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
