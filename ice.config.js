const path = require('path');
const webpack = require('webpack');
console.log(process.env.NODE_ENV);

const server =
  process.env.NODE_ENV === 'production'
    ? 'http://101.132.64.25:60000'
    : 'http://localhost:4040';

module.exports = {
  entry: 'src/index.jsx',
  publicPath: './',
  plugins: [
    ['ice-plugin-fusion', { themePackage: '@icedesign/theme' }],
    ['ice-plugin-moment-locales', { locales: ['zh-cn'] }]
  ],
  define: {
    $server: JSON.stringify(server)
  },
  alias: {
    '@': path.resolve(__dirname, './src/')
  }
};
