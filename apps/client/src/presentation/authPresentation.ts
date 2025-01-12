import { useState } from 'react';

type StringInput = {
  isError: boolean;
  value: string;
  onChange: (e: string) => void;
};

type StringInputWithDetailedError = StringInput & {
  detailedError: Record<string, boolean>;
};

type StringInputWithPostfix = StringInput & {
  postfix: string;
};

type InitialState = {
  snuMail?: string;
  password?: string;
  passwordConfirm?: string;
  localId?: string;
  phoneNumber?: string;
  code?: string;
  username?: string;
};

type AuthPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    snuMail: StringInputWithPostfix;
    password: StringInputWithDetailedError;
    passwordConfirm: StringInput;
    localId: StringInput;
    phoneNumber: StringInput;
    code: StringInput;
    username: StringInput;
  };
};

const EMAIL_PREFIX_REGEX = /^[a-zA-Z0-9._%+-]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!^*])[A-Za-z\d@#$!^*]{8,20}$/;
const PASSWORD_DETAIL_REGEX = {
  ENGLISH_REGEX: /(?=.*[A-Z])(?=.*[a-z])/,
  NUMBER_REGEX: /\d/,
  SPECIAL_CHAR_REGEX: /[@#$!^*]/,
  LENGTH_REGEX: /^.{8,20}$/,
};
const LOCAL_ID_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;
const PHONE_NUMBER_REGEX = /^(0\d{1,2})-?\d{3,4}-?\d{4}$/;
const CODE_REGEX = /^\d{6}$/;
const USERNAME_REGEX = /^([가-힣]{2,6}|[A-Za-z]{2,20})$/;

export const authPresentation: AuthPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [email, setEmail] = useState(
      initialState.snuMail !== undefined ? initialState.snuMail : '',
    );
    const [password, setPassword] = useState(
      initialState.password !== undefined ? initialState.password : '',
    );
    const [passwordConfirm, setPasswordConfirm] = useState(
      initialState.passwordConfirm !== undefined
        ? initialState.passwordConfirm
        : '',
    );
    const [localId, setLocalId] = useState(
      initialState.localId !== undefined ? initialState.localId : '',
    );
    const [phoneNumber, setPhoneNumber] = useState(
      initialState.phoneNumber !== undefined ? initialState.phoneNumber : '',
    );
    const [code, setCode] = useState(
      initialState.code !== undefined ? initialState.code : '',
    );
    const [username, setUsername] = useState(
      initialState.username !== undefined ? initialState.username : '',
    );

    const handleEmailChange = (input: string) => {
      const sanitizedInput = input.replace(/@snu\.ac\.kr$/, '');
      setEmail(sanitizedInput);
    };

    const handlePasswordChange = (input: string) => {
      setPassword(input);
    };

    const handlePasswordConfirmChange = (input: string) => {
      setPasswordConfirm(input);
    };

    const handleLocalIdChange = (input: string) => {
      setLocalId(input);
    };

    const handlePhoneNumberChange = (input: string) => {
      setPhoneNumber(input);
    };

    const handleCodeChange = (input: string) => {
      setCode(input);
    };

    const handleUsernameChange = (input: string) => {
      setUsername(input);
    };

    return {
      snuMail: {
        isError: !EMAIL_PREFIX_REGEX.test(email),
        value: email,
        onChange: handleEmailChange,
        postfix: email + '@snu.ac.kr',
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
        onChange: handlePasswordChange,
      },
      passwordConfirm: {
        isError: password !== passwordConfirm,
        value: passwordConfirm,
        onChange: handlePasswordConfirmChange,
      },
      localId: {
        isError: !LOCAL_ID_REGEX.test(localId),
        value: localId,
        onChange: handleLocalIdChange,
      },
      phoneNumber: {
        isError: !PHONE_NUMBER_REGEX.test(phoneNumber),
        value: phoneNumber,
        onChange: handlePhoneNumberChange,
      },
      code: {
        isError: !CODE_REGEX.test(code),
        value: code,
        onChange: handleCodeChange,
      },
      username: {
        isError: !USERNAME_REGEX.test(username),
        value: username,
        onChange: handleUsernameChange,
      },
    };
  },
};
