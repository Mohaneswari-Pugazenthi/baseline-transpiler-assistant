// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Target only the latest Node version for simplicity in testing
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};