module.exports = {
  plugins: ['lodash'],
  presets: [
    '@vue/app',
    ["@babel/env", { "targets": { "node": 6 } }],
  ]
}
