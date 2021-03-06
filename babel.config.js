module.exports = {
  presets: ['@babel/preset-react'],
  sourceMaps: true,
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    production: {
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
