import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })],
  output: [
    {
      file: 'dist/bundle.cjs.js', // 输出的文件名
      format: 'cjs', // CommonJS格式
      sourcemap: true, // 生成sourcemap文件
    },
    {
      file: 'dist/bundle.esm.js', // 输出的文件名
      format: 'esm', // ES模块格式
      sourcemap: true, // 生成sourcemap文件
    },
    {
      file: 'dist/bundle.umd.js', // 输出的文件名
      format: 'umd', // UMD格式
      name: 'ChromeExtensionEval', // 当使用UMD格式时，需要指定导出的全局变量名
      sourcemap: true, // 生成sourcemap文件
    }
  ]
};