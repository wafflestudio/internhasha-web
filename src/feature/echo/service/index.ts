import type { ServiceResponse } from '@/entities/response';
import type { EchoMessage } from '@/feature/echo/entities';
import type { Apis } from '@/shared/api';

export type EchoService = {
  sendMessage({ message }: { message: string }): ServiceResponse<EchoMessage>;
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
    return { type: 'error', message: data.message };
  },
});
