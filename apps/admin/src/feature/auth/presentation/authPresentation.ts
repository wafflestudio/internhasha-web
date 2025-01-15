import { useState } from 'react';

type StringInput = {
  isError: boolean;
  value: string;
  onChange: (e: string) => void;
};

type InitialState = {
  password?: string;
  localId?: string;
};

type AuthPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    password: StringInput;
    localId: StringInput;
  };
};

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!^*])[A-Za-z\d@#$!^*]{8,20}$/;
const LOCAL_ID_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;

export const authPresentation: AuthPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [password, setPassword] = useState(
      initialState.password !== undefined ? initialState.password : '',
    );
    const [localId, setLocalId] = useState(
      initialState.localId !== undefined ? initialState.localId : '',
    );

    const handlePasswordChange = (input: string) => {
      setPassword(input);
    };

    const handleLocalIdChange = (input: string) => {
      setLocalId(input);
    };

    return {
      password: {
        isError: !PASSWORD_REGEX.test(password),
        value: password,
        onChange: handlePasswordChange,
      },
      localId: {
        isError: !LOCAL_ID_REGEX.test(localId),
        value: localId,
        onChange: handleLocalIdChange,
      },
    };
  },
};
