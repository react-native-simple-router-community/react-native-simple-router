module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.android.js',
          '.ios.js',
        ],
      },
    },
    node: true,
  },
  rules: {
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^react$',
          '^react-native$',
          '^react-native/',
        ],
      },
    ],
  },
};
