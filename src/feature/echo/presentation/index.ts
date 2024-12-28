import { useState } from 'react';

import { MESSAGE_MAX_LENGTH } from '@/entities/echo';

type StringInput = {
  isError: boolean;
  value: string;
  onChange: (e: string) => void;
};

type EchoPresentation = {
  useMessageValidator(): { input: StringInput };
};

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
