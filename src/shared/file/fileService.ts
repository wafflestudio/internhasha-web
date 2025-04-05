import type { Apis, ExternalApis, LocalServerDTO } from '@/api';
import type { FileType } from '@/entities/file';
import type { ServiceResponse } from '@/entities/response';

export type FileService = {
  getUploadPresignedUrl({
    token,
    fileName,
    fileType,
  }: {
    token: string;
    fileName: string;
    fileType: FileType;
  }): ServiceResponse<LocalServerDTO.S3UploadResp>;
  getDownloadPresignedUrl({
    token,
    s3Key,
    fileType,
  }: {
    token: string;
    s3Key: string;
    fileType: FileType;
  }): ServiceResponse<LocalServerDTO.S3DownloadResp>;
  uploadImage({
    presignedUrl,
    file,
  }: {
    presignedUrl: string;
    file: File;
  }): ServiceResponse<void>;
  downloadFileByPresignedUrl({
    presignedUrl,
    fileName,
  }: {
    presignedUrl: string;
    fileName: string;
  }): ServiceResponse<{ file: File; url: string }>;
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
  getDownloadPresignedUrl: async ({ token, s3Key, fileType }) => {
    const params = {
      s3Key,
      fileType,
    };

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
  downloadFileByPresignedUrl: async ({ presignedUrl, fileName }) => {
    console.log(presignedUrl);
    const { status, data } = await externalApis['GET download-file']({
      path: presignedUrl,
    });

    const getExtension = (input: string) => {
      if (input.includes('image/jpeg')) {
        return 'jpg';
      }
      if (input.includes('image/png')) {
        return 'png';
      }
      if (input.includes('application/pdf')) {
        return 'pdf';
      }
      if (input.includes('image/gif')) {
        return 'gif';
      }
      return 'jpg';
    };

    if (status === 200) {
      // 기타 필요한 타입 추가
      const extension = getExtension(data.type);
      const file = new File([data.blob], `${fileName}.${extension}`, {
        type: data.type,
      });
      return {
        type: 'success',
        data: { url: URL.createObjectURL(file), file },
      };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
