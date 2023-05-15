import { createRequire } from 'node:module';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const pkg = createRequire(import.meta.url)('./package.json');

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
