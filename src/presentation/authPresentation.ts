import { useState } from 'react';

type StringInput = {
  isError: boolean;
  value: string;
  onChange: (e: string) => void;
};

type AuthPresentation = {
  useValidator(): {
    email: StringInput;
    password: StringInput;
    name: StringInput;
    phoneNumber: StringInput;
  };
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@snu\.ac\.kr$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!^*])[A-Za-z\d@#$!^*]{8,20}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;
const PHONE_NUMBER_REGEX = /^(0\d{1,2})-?\d{3,4}-?\d{4}$/;

export const authPresentation: AuthPresentation = {
  useValidator: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleEmailChange = (input: string) => {
      setEmail(input);
    };

    const handlePasswordChange = (input: string) => {
      setPassword(input);
    };

    const handleNameChange = (input: string) => {
      setName(input);
    };

    const handlePhoneNumberChange = (input: string) => {
      setPhoneNumber(input);
    };

    return {
      email: {
        isError: !EMAIL_REGEX.test(email),
        value: email,
        onChange: handleEmailChange,
      },
      password: {
        isError: !PASSWORD_REGEX.test(password),
        value: password,
        onChange: handlePasswordChange,
      },
      name: {
        isError: !NAME_REGEX.test(name),
        value: name,
        onChange: handleNameChange,
      },
      phoneNumber: {
        isError: !PHONE_NUMBER_REGEX.test(phoneNumber),
        value: phoneNumber,
        onChange: handlePhoneNumberChange,
      },
    };
  },
};
