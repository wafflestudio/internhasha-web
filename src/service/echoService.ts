import type { EchoMessage, UserSubmit } from '@/entities/echo';
import type { ServiceResponse } from '@/entities/response';
import type { Apis } from '@/shared/api';

export type EchoService = {
  sendMessage({ message }: { message: string }): ServiceResponse<EchoMessage>;
  sendSubmit({
    body,
  }: {
    body: Omit<UserSubmit, 'createdAt'>;
  }): ServiceResponse<UserSubmit>;
};

export const implEchoService = ({ apis }: { apis: Apis }): EchoService => ({
  sendMessage: async ({ message }) => {
    const params = { message };
    const { status, data } = await apis['GET /echo/:message']({ params });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
  sendSubmit: async ({ body }) => {
    const { status, data } = await apis['POST /pretotype']({ body });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', message: data.error };
  },
});
