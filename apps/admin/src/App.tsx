import './reset.css';

import { Button } from '@waffle/design-system';
import { add, subtract } from '@waffle/math';
import { useReducer } from 'react';

export const App = () => {
  const [count, increment] = useReducer((c: number) => c + 1, 0);

  return (
    <div>
      <p>{add(2, 3)}</p>
      <p>{subtract(5, 3)}</p>
      <button onClick={increment}>{count}</button>
      <Button>와플의 버튼</Button>
    </div>
  );
};
