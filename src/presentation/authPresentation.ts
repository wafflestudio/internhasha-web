import { useState } from 'react';

type StringInput = {
  isError: boolean;
  value: string;
  onChange: (e: string) => void;
};

type AuthPresentation = {
  useIdValidator(): { input: StringInput };
  usePasswordValidator(): { input: StringInput };
};

const ID_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!^*])[A-Za-z\d@#$!^*]{8,20}$/;

export const authPresentation: AuthPresentation = {
  useIdValidator: () => {
    const [id, setId] = useState('');

    const handleChange = (input: string) => {
      setId(input);
    };

    return {
      input: {
        isError: !ID_REGEX.test(id),
        value: id,
        onChange: handleChange,
      },
    };
  },
  usePasswordValidator: () => {
    const [password, setPassword] = useState('');

    const handleChange = (input: string) => {
      setPassword(input);
    };

    return {
      input: {
        isError: !PASSWORD_REGEX.test(password),
        value: password,
        onChange: handleChange,
      },
    };
  },
};
