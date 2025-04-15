import { useState } from 'react';

import type { Input } from '@/entities/input';

type InitialState = {
  content?: string;
};

export type CoffeeChatInputPresentation = {
  useValidator({ initialState }: { initialState?: InitialState }): {
    content: Input<string>;
  };
};

export const CONTENTS_MAX_LENGTH = 10000;

export const coffeeChatInputPresentation: CoffeeChatInputPresentation = {
  useValidator: ({ initialState = {} }) => {
    const [content, setContent] = useState(
      initialState.content !== undefined ? initialState.content : '',
    );

    return {
      content: {
        isError: content.length > CONTENTS_MAX_LENGTH || content.length === 0,
        value: content,
        onChange: setContent,
      },
    };
  },
};
