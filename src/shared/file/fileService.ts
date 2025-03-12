import type { Apis, ExternalApis, LocalServerDTO } from '@/api';
import type { ServiceResponse } from '@/entities/response';

export type FileService = {
  getUploadPresignedUrl({
    token,
    fileName,
    fileType,
  }: {
    token: string;
    fileName: string;
    fileType: string;
  }): ServiceResponse<LocalServerDTO.S3DownloadResp>;
  getDownloadPresignedUrl({
    token,
    filePath,
    fileType,
  }: {
    token: string;
    filePath: string;
    fileType: string;
  }): ServiceResponse<LocalServerDTO.S3DownloadResp>;
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
  getUploadPresignedUrl: async ({ token, fileName, fileType }) => {
    const body = { fileName, fileType };
    const { status, data } = await apis['POST /s3']({
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
  getDownloadPresignedUrl: async ({ token, filePath, fileType }) => {
    const downloadPath = new URLSearchParams({
      filePath,
      fileType,
    });

    const params = { filePath: downloadPath.toString() };

    const { status, data } = await apis['GET /s3']({
      token,
      params,
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

    if (status === 200) {
      return {
        type: 'success',
        data,
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
