import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'compiled/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [uglify()],
};
