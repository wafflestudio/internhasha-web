import { useState } from 'react';

import type { Input } from '@/entities/input';

type InitialState = {
  phoneNumber?: string;
  contents?: string;
};

type CoffeeChatPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    phoneNumber: Input<string>;
    contents: Input<string>;
  };
};

const PHONE_NUMBER_REGEX = /^010-\d{4}-\d{4}$/;
export const CONTENTS_MAX_LENGTH = 10000;

export const coffeeChatPresentation: CoffeeChatPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [phoneNumber, setPhoneNumber] = useState(
      initialState.phoneNumber !== undefined ? initialState.phoneNumber : '',
    );
    const [contents, setContents] = useState(
      initialState.contents !== undefined ? initialState.contents : '',
    );

    const handlePhoneNumberChange = (input: string) => {
      setPhoneNumber(input);
    };

    const handleContentsChange = (input: string) => {
      setContents(input);
    };

    return {
      phoneNumber: {
        isError: !PHONE_NUMBER_REGEX.test(phoneNumber),
        value: phoneNumber,
        onChange: handlePhoneNumberChange,
      },
      contents: {
        isError: contents.length > CONTENTS_MAX_LENGTH || contents.length === 0,
        value: contents,
        onChange: handleContentsChange,
      },
    };
  },
};
