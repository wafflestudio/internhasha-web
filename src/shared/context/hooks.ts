import type { Context } from 'react';
import { useContext } from 'react';

export const useGuardContext = <T extends Record<string, unknown>>(
  context: Context<T | null>,
): T => {
  const contextValue = useContext(context);
  if (contextValue === null)
    throw new Error(
      `컨텍스트 값이 존재하지 않습니다: ${context.displayName ?? ''}`,
    );
  return contextValue;
};
