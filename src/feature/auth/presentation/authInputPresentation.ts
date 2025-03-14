import { useState } from 'react';

import type { Input, InputWithDetailedError } from '@/entities/input';

type InitialInputState = {
  snuMailPrefix?: string;
  mail?: string;
  username?: string;
  password?: string;
  code?: string;
};

export type AuthInputPresentation = {
  useValidator({ initialState }: { initialState?: InitialInputState }): {
    snuMailPrefix: Input<string>;
    mail: Input<string>;
    username: Input<string>;
    password: InputWithDetailedError<string>;
    passwordConfirm: Input<string>;
    code: Input<string>;
  };
};

const EMAIL_PREFIX_REGEX = /^[a-zA-Z0-9._%+-]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!*()]).{8,20}$/;
const PASSWORD_DETAIL_REGEX = {
  ENGLISH_REGEX: /(?=.*[A-Z])(?=.*[a-z])/,
  NUMBER_REGEX: /\d/,
  SPECIAL_CHAR_REGEX: /[@#$!^*]/,
  LENGTH_REGEX: /^.{8,20}$/,
};
const CODE_REGEX = /^\d{6}$/;
const USERNAME_REGEX = /^([가-힣]{2,6}|[A-Za-z]{2,20})$/;

export const authInputPresentation: AuthInputPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [snuMailPrefix, setSnuMailPrefix] = useState(
      initialState.snuMailPrefix !== undefined
        ? initialState.snuMailPrefix
        : '',
    );
    const [mail, setMail] = useState(
      initialState.mail !== undefined ? initialState.mail : '',
    );
    const [username, setUsername] = useState(
      initialState.username !== undefined ? initialState.username : '',
    );
    const [password, setPassword] = useState(
      initialState.password !== undefined ? initialState.password : '',
    );
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [code, setCode] = useState(
      initialState.code !== undefined ? initialState.code : '',
    );

    const handleSnuMailPrefixChange = (input: string) => {
      const sanitizedInput = input.replace(/@snu\.ac\.kr$/, '');
      setSnuMailPrefix(sanitizedInput);
    };

    return {
      snuMailPrefix: {
        isError: !EMAIL_PREFIX_REGEX.test(snuMailPrefix),
        value: snuMailPrefix,
        onChange: handleSnuMailPrefixChange,
      },
      mail: {
        isError: !EMAIL_REGEX.test(mail),
        value: mail,
        onChange: setMail,
      },
      password: {
        isError: !PASSWORD_REGEX.test(password),
        value: password,
        detailedError: {
          englishError: !PASSWORD_DETAIL_REGEX.ENGLISH_REGEX.test(password),
          numberError: !PASSWORD_DETAIL_REGEX.NUMBER_REGEX.test(password),
          specialCharError:
            !PASSWORD_DETAIL_REGEX.SPECIAL_CHAR_REGEX.test(password),
          lengthError: !PASSWORD_DETAIL_REGEX.LENGTH_REGEX.test(password),
        },
        onChange: setPassword,
      },
      passwordConfirm: {
        isError: password !== passwordConfirm,
        value: passwordConfirm,
        onChange: setPasswordConfirm,
      },
      code: {
        isError: !CODE_REGEX.test(code),
        value: code,
        onChange: setCode,
      },
      username: {
        isError: !USERNAME_REGEX.test(username),
        value: username,
        onChange: setUsername,
      },
    };
  },
};
