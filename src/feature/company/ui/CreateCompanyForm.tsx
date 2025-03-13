import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { ExternalLinkField } from '@/components/field/ExternalLinkField';
import { HashtagField } from '@/components/field/HashtagField';
import { ImageField } from '@/components/field/ImageField';
import { MarkdownEditorField } from '@/components/field/MarkdownEditorField';
import { PdfField } from '@/components/field/PdfField';
import { StringField } from '@/components/field/StringField';
import { StringFieldWithUnit } from '@/components/field/StringFieldWithLabel';
import { StringSelectField } from '@/components/field/StringSelectField';
import { FormContainer } from '@/components/form/FormContainer';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { createErrorMessage } from '@/entities/errors';
import type { FileType } from '@/entities/file';
import type { Series } from '@/entities/post';
import type { CreateCompanyRequest } from '@/entities/post';
import { seriesList } from '@/entities/post';
import { companyFormPresentation } from '@/feature/company/presentation/companyFormPresentation';
import {
  companyInputPresentation,
  MAX_EXPLANATION_LENGTH,
  MAX_SLOGAN_LENGTH,
} from '@/feature/company/presentation/companyInputPresentation';
import { InvestCompanyField } from '@/feature/company/ui/fields/InvestCompanyField';
import { SloganField } from '@/feature/company/ui/fields/SloganField';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { formatSeries } from '@/util/postFormatFunctions';

export const CreateCompanyForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { inputStates, formStates } = companyFormPresentation.useValidator({
    companyInputPresentation,
  });

  const {
    companyName,
    explanation,
    email,
    slogan,
    investAmount,
    rawInvestCompany,
    investCompany,
    series,
    irDeckPreview,
    landingPageLink,
    imagePreview,
    rawLink,
    links,
    rawTag,
    tags,
  } = inputStates;

  const { toMain } = useRouteNavigation();

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  const { handleCreateCompany, isPending } = useCreateCompanyWithUploads({
    setResponseMessage: setResponseMessage,
  });

  const handleSubmit = () => {
    setIsSubmit(true);
    if (
      formStates.companyName.isError ||
      formStates.explanation.isError ||
      formStates.email.isError ||
      formStates.slogan.isError ||
      formStates.investAmount.isError ||
      formStates.investCompany.isError ||
      formStates.series.isError ||
      formStates.landingPageLink.isError ||
      formStates.links.isError ||
      formStates.tags.isError
    ) {
      return;
    }

    // TODO: 불가능한 타입이지만 isError를 사용할 시 타입스크립트가 인식하지 못함.
    if (imagePreview.value === null) {
      return;
    }

    // TODO: 불가능한 타입이지만 isError를 사용할 시 타입스크립트가 인식하지 못함.
    if (formStates.series.value === 'NONE') {
      return;
    }

    handleCreateCompany({
      companyInfo: {
        companyName: formStates.companyName.value,
        explanation: formStates.explanation.value,
        email: formStates.email.value,
        slogan: formStates.slogan.value,
        investAmount: formStates.investAmount.value,
        investCompany: formStates.investCompany.value,
        series: formStates.series.value,
        landingPageLink: formStates.landingPageLink.value,
        links: formStates.links.value,
        tags: formStates.tags.value,
      },
      irDeckFile:
        irDeckPreview.value !== null ? irDeckPreview.value.file : undefined,
      companyThumbnailFile: imagePreview.value.file,
    })
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      });
  };

  return (
    <>
      <FormContainer handleSubmit={handleSubmit} className="gap-10">
        <StringField
          label="회사명"
          input={companyName}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.companyName.isError}
          placeholder="회사명을 입력해주세요."
          errorMessage="올바른 회사명을 입력해주세요."
          required={true}
        />
        <StringField
          label="회사 이메일"
          input={email}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.email.isError}
          placeholder="회사 이메일을 입력해주세요."
          errorMessage="올바르지 않은 이메일 형식입니다."
          required={true}
        />
        <SloganField
          label="한 줄 소개"
          input={slogan}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.slogan.isError}
          maxLength={MAX_SLOGAN_LENGTH}
          errorMessage={`한 줄 소개는 ${MAX_SLOGAN_LENGTH}자 이내로 작성해주세요.`}
          infoMessage="한 줄 소개는 공고 카드에 보여져요."
          required={true}
        />
        <MarkdownEditorField
          label="회사 상세 소개"
          input={explanation}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.explanation.isError}
          maxLength={MAX_EXPLANATION_LENGTH}
          errorMessage={`상세 소개는 ${MAX_EXPLANATION_LENGTH}자 이내로 작성해주세요.`}
          infoMessage="상세 소개는 공고 글에 보여져요."
          required={true}
        />
        <ImageField
          label="대표 사진"
          input={imagePreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={imagePreview.isError || imagePreview.value === null}
          errorMessage="1MB 이하의 이미지 파일을 올려주세요."
          infoMessage="회사 썸네일 이미지는 정사각형 비율(1:1)로 보여져요."
          required={true}
        />
        <StringSelectField<Series>
          label="투자 단계"
          input={series}
          inputList={seriesList as Series[]}
          formatter={formatSeries}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.series.isError}
          errorMessage="투자 단계를 선택해주세요."
          required={true}
        />
        <StringFieldWithUnit
          label="누적 투자액"
          input={investAmount}
          unit="천만원"
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.investAmount.isError}
          placeholder="10"
          errorMessage="0 이상의 10만 이하의 양의 정수로 입력해주세요."
          required={true}
        />
        <InvestCompanyField
          label="투자사 정보"
          input={investCompany}
          rawInput={rawInvestCompany}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.investCompany.isError}
          placeholder="투자사 이름을 입력해주세요."
          errorMessage="투자사 정보는 1개 이상, 10개 이하로 중복되지 않게 입력해주세요."
          inputErrorMessage="중복되지 않는 100자 이내의 투자사 이름을 작성해주세요."
          required={true}
        />
        <HashtagField
          label="해시태그"
          input={tags}
          rawInput={rawTag}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.tags.isError}
          placeholder="회사를 소개하는 태그를 입력해주세요. (최대 10개)"
          infoMessage="엔터를 치면 태그가 생성되며 한 개당 최대 8자까지 입력할 수 있어요."
          inputErrorMessage="입력한 태그와 중복되지 않는 8자 이하의 태그를 작성해주세요."
          errorMessage="하나의 태그는 8자 이하, 총 10개까지 작성 가능합니다."
        />
        <PdfField
          label="IR Deck 자료"
          input={irDeckPreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={irDeckPreview.isError}
          errorMessage="5MB 이하의 PDF 파일을 올려주세요."
        />
        <StringField
          label="기업 소개 홈페이지"
          input={landingPageLink}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.landingPageLink.isError}
          placeholder="https://"
          errorMessage="https로 시작하는 홈페이지 링크를 입력해주세요."
        />
        <ExternalLinkField
          label="외부 소개 링크"
          input={links}
          rawInput={rawLink}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.links.isError}
          placeholder={{
            description:
              '링크 제목을 작성해주세요. (e.g. OO 프로젝트 성과 기사)',
            link: 'https://',
          }}
          infoMessage="더벤처스, 잡코리아, 기사 링크 등 회사를 소개할 수 있는 기타 링크를 첨부해주세요."
          errorMessage="외부 소개 링크는 최대 5개까지 입력 가능하며 링크는 https로 시작해야 합니다."
          inputErrorMessage="중복되지 않는 유효한 링크와 100자 이내의 설명글을 입력해주세요."
        />
        {responseMessage !== '' && (
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        )}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleClickCancelButton();
            }}
            disabled={isPending}
            className="flex-1"
          >
            뒤로가기
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={isPending}
            className="flex-1"
          >
            저장
          </Button>
        </div>
      </FormContainer>
      {isCancel && (
        <CancelCheckModal onClose={toMain} onCancel={closeCancelModal} />
      )}
    </>
  );
};

const useCreateCompanyWithUploads = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { fileService, postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const queryClient = useQueryClient();

  const [isPending, setIsPending] = useState(false);
  const { toMyPage } = useRouteNavigation();

  const { mutateAsync: getPresignedUrl } = useMutation({
    mutationFn: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType: FileType;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return fileService.getUploadPresignedUrl({ token, fileName, fileType });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        return;
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '이미지 업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  const { mutateAsync: uploadFile } = useMutation({
    mutationFn: async ({
      presignedUrl,
      file,
    }: {
      presignedUrl: string;
      file: File | undefined;
    }) => {
      if (file === undefined) {
        throw new Error('파일이 존재하지 않습니다.');
      }
      return fileService.uploadImage({ presignedUrl, file });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setResponseMessage('');
      } else {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
      }
    },
    onError: () => {
      setResponseMessage('업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  const { mutate: createCompany } = useMutation({
    mutationFn: ({
      companyContents,
    }: {
      companyContents: CreateCompanyRequest;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.createCompany({ token, companyContents });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        toMyPage();
      }
    },
    onError: () => {
      setResponseMessage(
        '회사 생성에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  const handleCreateCompany = async ({
    companyInfo,
    irDeckFile,
    companyThumbnailFile,
  }: {
    companyInfo: Omit<CreateCompanyRequest, 'irDeckLink' | 'imageLink'>;
    irDeckFile?: File;
    companyThumbnailFile: File;
  }) => {
    try {
      setIsPending(true);

      const [irDeckPresignedUrlResponse, companyThumbnailPresignedUrlResponse] =
        await Promise.all([
          irDeckFile !== undefined
            ? getPresignedUrl({
                fileName: irDeckFile.name,
                fileType: 'IR_DECK',
              })
            : Promise.resolve(null),
          getPresignedUrl({
            fileName: companyThumbnailFile.name,
            fileType: 'COMPANY_THUMBNAIL',
          }),
        ]);

      if (
        irDeckPresignedUrlResponse?.type === 'error' ||
        companyThumbnailPresignedUrlResponse.type === 'error'
      ) {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
        setIsPending(false);
        return;
      }

      const [irDeckUploadResponse, companyThumbnailUploadResponse] =
        await Promise.all([
          irDeckPresignedUrlResponse !== null
            ? uploadFile({
                presignedUrl: irDeckPresignedUrlResponse.data.url,
                file: irDeckFile,
              })
            : null,
          uploadFile({
            presignedUrl: companyThumbnailPresignedUrlResponse.data.url,
            file: companyThumbnailFile,
          }),
        ]);

      if (
        irDeckUploadResponse?.type === 'error' ||
        companyThumbnailUploadResponse.type === 'error'
      ) {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
        setIsPending(false);
        return;
      }

      createCompany({
        companyContents: {
          ...companyInfo,
          irDeckLink:
            irDeckPresignedUrlResponse !== null
              ? irDeckPresignedUrlResponse.data.s3Key
              : undefined,
          imageLink: companyThumbnailPresignedUrlResponse.data.s3Key,
        },
      });
    } catch {
      setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return {
    handleCreateCompany,
    isPending,
  };
};
