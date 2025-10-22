import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json' with { type: 'json' };

const extensions = [
  '.ts',
];

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
      interop: false,
      esModule: false,
    },
  ],
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      presets: [
        '@babel/typescript',
      ],
      comments: false,
    })
  ]
};
