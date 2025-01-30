import { reactConfig } from '@waffle/eslint-react';

export default [
  ...reactConfig(import.meta.dirname),
  {
    ignores: ['src/components/ui/calendar.tsx'],
  },
];
