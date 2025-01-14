import './index.css';

import { Button } from '@waffle/design-system';
import { useReducer } from 'react';

import { EchoPage } from './pages/EchoPage';

export const App = () => {
  const [count, increment] = useReducer((c: number) => c + 1, 0);

  return (
    <div>
      <button onClick={increment}>{count}</button>
      <Button>와플의 버튼</Button>
      <EchoPage />
    </div>
  );
};
