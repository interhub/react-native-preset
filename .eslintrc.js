module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier/react'],
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '~': './src',
        },
      },
    },
  },
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['internal', 'external', 'builtin', 'index', 'sibling', 'parent', 'object'],
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    semi: 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
}
