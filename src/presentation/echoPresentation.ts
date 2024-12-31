import { useState } from 'react';

type StringInput = {
  isError: boolean;
  value: string;
  onChange: (e: string) => void;
};

type EchoPresentation = {
  useMessageValidator(): { input: StringInput };
};

const MESSAGE_MAX_LENGTH = 500;

export const echoPresentation: EchoPresentation = {
  useMessageValidator: () => {
    const [message, setMessage] = useState('');

    const handleChange = (input: string) => {
      setMessage(input);
    };

    return {
      input: {
        isError: message.length > MESSAGE_MAX_LENGTH,
        value: message,
        onChange: handleChange,
      },
    };
  },
};
