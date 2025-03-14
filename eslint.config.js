import react from '@woohm402/eslint-config-react';

export default [
  {
    ignores: [
      '.yarn',
      '*.js',
      'public/mockServiceWorker.js',
      'dist',
      'src/components/ui/calendar.tsx',
    ],
  },
  ...react({
    tsconfigRootDir: import.meta.dirname,
    envAllowedFiles: ['src/App.tsx'],
  }),
  {
    rules: {
      'no-restricted-imports': ['error', { patterns: ['./*', '../*'] }],
    },
  },
];
