import react from '@woohm402/eslint-config-react';

export default [
  ...react({
    tsconfigRootDir: import.meta.dirname,
    envAllowedFiles: ['src/App.tsx'],
  }),
  {
    ignores: [
      '.yarn',
      '*.js',
      'public/mockServiceWorker.js',
      'dist',
      'src/components/ui/calendar.tsx',
    ],
  },
];
