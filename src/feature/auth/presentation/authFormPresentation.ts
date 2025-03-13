import type {
  Input,
  InputForForm,
  InputWithDetailedError,
} from '@/entities/input';
import type { AuthInputPresentation } from '@/feature/auth/presentation/authInputPresentation';

type InitialFormState = {
  snuMail?: string;
  mail?: string;
  username?: string;
  password?: string;
  code?: string;
};

type AuthFormPresentation = {
  useValidator({
    initialState,
    authInputPresentation,
  }: {
    initialState?: InitialFormState;
    authInputPresentation: AuthInputPresentation;
  }): {
    inputStates: {
      snuMailPrefix: Input<string>;
      mail: Input<string>;
      username: Input<string>;
      password: InputWithDetailedError<string>;
      passwordConfirm: Input<string>;
      code: Input<string>;
    };
    formStates: {
      snuMail: InputForForm<string>;
      mail: InputForForm<string>;
      username: InputForForm<string>;
      password: InputForForm<string>;
      code: InputForForm<string>;
    };
  };
};

export const authFormPresentation: AuthFormPresentation = {
  useValidator: ({ initialState, authInputPresentation }) => {
    const initialStateForInput = {
      snuMailPrefix:
        initialState?.snuMail !== undefined
          ? initialState.snuMail.split('@')[0]
          : undefined,
      mail: initialState?.mail,
      username: initialState?.username,
      password: initialState?.password,
      code: initialState?.code,
    };

    const { snuMailPrefix, mail, username, password, passwordConfirm, code } =
      authInputPresentation.useValidator({
        initialState: initialStateForInput,
      });

    return {
      inputStates: {
        snuMailPrefix,
        mail,
        username,
        password,
        passwordConfirm,
        code,
      },
      formStates: {
        snuMail: {
          ...snuMailPrefix,
          value: snuMailPrefix.value + '@snu.ac.kr',
        },
        mail,
        username,
        password,
        code,
      },
    };
  },
};
