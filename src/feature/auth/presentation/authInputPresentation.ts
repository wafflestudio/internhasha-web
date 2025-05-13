import { useState } from 'react';

import type { Agreement } from '@/entities/agreements';
import { TERMS } from '@/entities/agreements';
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
    password: InputWithDetailedError<
      string,
      {
        englishError: boolean;
        numberError: boolean;
        specialCharError: boolean;
        lengthError: boolean;
        patternError: boolean;
      }
    >;
    passwordConfirm: Input<string>;
    newPassword: InputWithDetailedError<
      string,
      {
        englishError: boolean;
        numberError: boolean;
        specialCharError: boolean;
        lengthError: boolean;
        patternError: boolean;
      }
    >;
    newPasswordConfirm: Input<string>;
    code: Input<string>;
    emailVerifySuccessCode: Input<string>;
    agreements: Input<Agreement[]>;
  };
};

const EMAIL_PREFIX_REGEX = /^[a-zA-Z0-9._%+-]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^.{8,64}$/;
const PASSWORD_DETAIL_REGEX = {
  ENGLISH_REGEX: /(?=.*[A-Z])(?=.*[a-z])/,
  NUMBER_REGEX: /\d/,
  SPECIAL_CHAR_REGEX: /[@#$!^*]/,
  LENGTH_REGEX: /^.{8,64}$/,
  INVALID_PATTERN_REGEX:
    /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)|([a-zA-Z0-9])\2{2,}/i,
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
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [code, setCode] = useState(
      initialState.code !== undefined ? initialState.code : '',
    );
    const [emailVerifySuccessCode, setEmailVerifySuccessCode] = useState('');
    const [agreements, setAgreements] = useState(
      TERMS.map((item) => ({ ...item, checked: false })),
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
          patternError:
            PASSWORD_DETAIL_REGEX.INVALID_PATTERN_REGEX.test(password),
        },
        onChange: setPassword,
      },
      passwordConfirm: {
        isError: password !== passwordConfirm,
        value: passwordConfirm,
        onChange: setPasswordConfirm,
      },
      newPassword: {
        isError: !PASSWORD_REGEX.test(newPassword),
        value: newPassword,
        detailedError: {
          englishError: !PASSWORD_DETAIL_REGEX.ENGLISH_REGEX.test(newPassword),
          numberError: !PASSWORD_DETAIL_REGEX.NUMBER_REGEX.test(newPassword),
          specialCharError:
            !PASSWORD_DETAIL_REGEX.SPECIAL_CHAR_REGEX.test(newPassword),
          lengthError: !PASSWORD_DETAIL_REGEX.LENGTH_REGEX.test(newPassword),
          patternError:
            PASSWORD_DETAIL_REGEX.INVALID_PATTERN_REGEX.test(newPassword),
        },
        onChange: setNewPassword,
      },
      newPasswordConfirm: {
        isError: newPassword !== newPasswordConfirm,
        value: newPasswordConfirm,
        onChange: setNewPasswordConfirm,
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
      emailVerifySuccessCode: {
        isError: false,
        value: emailVerifySuccessCode,
        onChange: setEmailVerifySuccessCode,
      },
      agreements: {
        isError: false,
        value: agreements,
        onChange: setAgreements,
      },
    };
  },
};
