module.exports = {
  plugins: [
    'lodash',
    [
      "component",
      {
        libraryName: "element-ui",
        style: false
      }
    ]
  ],
  presets: [
    '@vue/app',
    ["@babel/env", { "targets": { "node": 6 } }],
  ]
}
