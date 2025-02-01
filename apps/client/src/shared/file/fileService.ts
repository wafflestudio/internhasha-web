import type { Apis, ExternalApis } from '@waffle/api';

import type { ServiceResponse } from '@/entities/response';

export type FileService = {
  getPresignedUrl({
    token,
    fileName,
    fileType,
  }: {
    token: string;
    fileName: string;
    fileType: string;
  }): ServiceResponse<{ presignedUrl: string }>;
  uploadImage({
    presignedUrl,
    file,
  }: {
    presignedUrl: string;
    file: File;
  }): ServiceResponse<void>;
};

export const implFileService = ({
  apis,
  externalApis,
}: {
  apis: Apis;
  externalApis: ExternalApis;
}): FileService => ({
  getPresignedUrl: async ({ token, fileName, fileType }) => {
    const body = { fileName, fileType };
    const { status, data } = await apis['POST /post/upload/presigned']({
      token,
      body,
    });

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
  uploadImage: async ({ presignedUrl, file }) => {
    const { status, data } = await externalApis['PUT upload-file']({
      path: presignedUrl,
      body: file,
      contentType: file.type,
    });

    console.log(file);

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
