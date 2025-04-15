import type { Input, InputForForm } from '@/entities/input';
import type { CoffeeChatInputPresentation } from '@/feature/coffeeChat/presentation/coffeeChatInputPresentation';
import { escapeToNormalText, normalTextToEscape } from '@/util/escapeEncoder';

type InitialFormState = {
  content?: string;
};

type CoffeeChatFormPresentation = {
  useValidator({
    initialState,
    coffeeChatInputPresentation,
  }: {
    initialState?: InitialFormState;
    coffeeChatInputPresentation: CoffeeChatInputPresentation;
  }): {
    inputStates: {
      content: Input<string>;
    };
    formStates: {
      content: InputForForm<string>;
    };
  };
};

export const coffeeChatFormPresentation: CoffeeChatFormPresentation = {
  useValidator: ({ initialState, coffeeChatInputPresentation }) => {
    const initialStateForInput = {
      content:
        initialState?.content !== undefined
          ? normalTextToEscape(initialState.content)
          : undefined,
    };

    const { content } = coffeeChatInputPresentation.useValidator({
      initialState: initialStateForInput,
    });

    return {
      inputStates: {
        content,
      },
      formStates: {
        content: {
          ...content,
          value: escapeToNormalText(content.value),
        },
      },
    };
  },
};
