import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const babelPlugin = getBabelOutputPlugin({
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
});

export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/esm.js',
      format: 'esm',
    },
    {
      file: './dist/es5.esm.js',
      format: 'esm',
      plugins: [
        babelPlugin,
      ],
    },
    {
      file: './dist/es5.cjs.js',
      format: 'cjs',
      plugins: [
        babelPlugin,
      ],
    },
  ],
};
