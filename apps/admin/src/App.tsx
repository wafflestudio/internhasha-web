import './index.css';

import { type ExternalCallParams, implApi } from '@waffle/api';
import { Button } from '@waffle/design-system';
import { useState } from 'react';
import { useReducer } from 'react';

import { implEchoService } from '@/services/echoService';

export const App = () => {
  const [count, increment] = useReducer((c: number) => c + 1, 0);
  const [message, setMessage] = useState('');
  const ENV = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    APP_ENV: import.meta.env.MODE as 'prod' | 'dev' | 'mock',
  };

  const externalCall = async (content: ExternalCallParams) => {
    const response = await fetch(
      `${ENV.APP_ENV === 'prod' ? ENV.API_BASE_URL : '/api'}/${content.path}`,
      {
        method: content.method,
        headers: content.headers,
        ...(content.body !== undefined
          ? { body: JSON.stringify(content.body) }
          : {}),
      },
    );

    const echoRegex = /^echo\/.*$/;

    if (echoRegex.test(content.path)) {
      const responseText = (await response.text().catch(() => null)) as string;
      const responseBody = {
        message: responseText,
      };

      return {
        status: response.status,
        data: responseBody,
      };
    }

    const responseBody = (await response.json().catch(() => null)) as unknown;
    return {
      status: response.status,
      data: responseBody,
    };
  };

  const apis = implApi({ externalCall });
  const echoService = implEchoService({ apis });

  const handleClickButton = async (input: string) => {
    try {
      const res = await echoService.sendMessage({ message: input });
      if (res.type === 'success') {
        setMessage(res.data.message);
      } else {
        console.error('Error:', res.message);
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
    }
  };

  return (
    <div>
      <button onClick={increment}>{count}</button>
      <Button>와플의 버튼</Button>
      <Button
        onClick={() => {
          void handleClickButton('Hello world!');
        }}
      >
        버튼 누르기
      </Button>
      <p>{message}</p>
    </div>
  );
};
