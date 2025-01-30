import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { ImageField } from '@/components/field/ImageField';
import { MarkdownEditorField } from '@/components/field/MarkdownEditorField';
import { PdfField } from '@/components/field/PdfField';
import { StringField } from '@/components/field/StringField';
import { StringSelectForm } from '@/components/field/StringSelectForm';
import { StringWithLetterCountField } from '@/components/field/StringWithLetterCountField';
import { FormContainer } from '@/components/form';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { Button } from '@/components/ui/button';
import { createErrorMessage } from '@/entities/errors';
import type { Series } from '@/entities/post';
import type { CreateCompanyRequest } from '@/entities/post';
import { seriesList } from '@/entities/post';
import { companyFormPresentation } from '@/feature/company/presentation/companyFormPresentation';
import {
  companyInputPresentation,
  MAX_EXPLANATION_LENGTH,
  MAX_SLOGAN_LENGTH,
} from '@/feature/company/presentation/companyInputPresentation';
import { ExternalLinkField } from '@/feature/company/ui/fields/ExternalLinkField';
import { HashtagField } from '@/feature/company/ui/fields/HashtagField';
import { InvestAmountField } from '@/feature/company/ui/fields/InvestAmountField';
import { InvestCompanyField } from '@/feature/company/ui/fields/InvestCompanyField';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CreateCompanyForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [imageResponseMessage, setImageResponseMessage] = useState('');
  const [pdfResponseMessage, setPdfResponseMessage] = useState('');

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
    irDeckLink,
    landingPageLink,
    imagePreview,
    imageLink,
    rawExternalDescriptionLink,
    externalDescriptionLink,
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

  const handleChangeResponseMessage = (input: string) => {
    setResponseMessage(input);
  };
  const handleChangeImageResponseMessage = (input: string) => {
    setImageResponseMessage(input);
  };
  const handleChangePdfResponseMessage = (input: string) => {
    setPdfResponseMessage(input);
  };

  const { uploadFile, isPending: isUploadFilePending } = useUploadFile({
    setResponseMessage: handleChangeResponseMessage,
  });
  const { getPresignedUrl: uploadImage, isPending: isUploadImagePending } =
    useGetPresignedUrl({
      onSuccess: ({ presignedUrl }: { presignedUrl: string }) => {
        uploadFile({ file: imagePreview.value?.file, presignedUrl });
      },
      setResponseMessage: handleChangeImageResponseMessage,
      setLink: irDeckLink.onChange,
    });
  const { getPresignedUrl: uploadPdf, isPending: isUploadPdfPending } =
    useGetPresignedUrl({
      onSuccess: ({ presignedUrl }: { presignedUrl: string }) => {
        uploadFile({ file: irDeckPreview.value?.file, presignedUrl });
      },
      setResponseMessage: handleChangePdfResponseMessage,
      setLink: imageLink.onChange,
    });
  const { createCompany, isPending: isCreateCompanyPending } = useCreateCompany(
    { setResponseMessage },
  );

  const isPending =
    isUploadFilePending ||
    isUploadImagePending ||
    isUploadPdfPending ||
    isCreateCompanyPending;

  const handleSubmit = () => {
    setIsSubmit(true);
    // TODO: 불가능한 타입이지만 isError를 사용할 시 타입스크립트가 인식하지 못함.
    if (!imagePreview.isError && imagePreview.value !== null) {
      uploadImage({
        fileName: imagePreview.value.file.name,
        fileType: imagePreview.value.file.type,
      });
    }
    if (irDeckPreview.isError && irDeckPreview.value !== null) {
      uploadPdf({
        fileName: irDeckPreview.value.file.name,
        fileType: irDeckPreview.value.file.type,
      });
    }
    if (imageResponseMessage !== '' || pdfResponseMessage !== '') {
      return;
    }
    if (
      formStates.companyName.isError ||
      formStates.explanation.isError ||
      formStates.email.isError ||
      formStates.slogan.isError ||
      formStates.investAmount.isError ||
      formStates.investCompany.isError ||
      formStates.series.isError ||
      formStates.irDeckLink.isError ||
      formStates.landingPageLink.isError ||
      formStates.imageLink.isError ||
      formStates.externalDescriptionLink.isError ||
      formStates.tags.isError
    ) {
      return;
    }
    // TODO: 불가능한 타입이지만 isError를 사용할 시 타입스크립트가 인식하지 못함.
    if (formStates.series.value === 'NONE') {
      return;
    }
    createCompany({
      company: {
        companyName: formStates.companyName.value,
        explanation: formStates.explanation.value,
        email: formStates.email.value,
        slogan: formStates.slogan.value,
        investAmount: formStates.investAmount.value,
        investCompany: formStates.investCompany.value,
        series: formStates.series.value,
        irDeckLink: formStates.irDeckLink.value,
        landingPageLink: landingPageLink.value,
        imageLink: formStates.imageLink.value,
        externalDescriptionLink: formStates.externalDescriptionLink.value,
        tags: formStates.tags.value,
      },
    });
  };

  return (
    <>
      <FormContainer
        handleSubmit={handleSubmit}
        response={responseMessage}
        className="gap-10"
      >
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
        <StringWithLetterCountField
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
          isSubmitError={formStates.imageLink.isError}
          errorMessage="1MB 이하의 이미지 파일을 올려주세요."
          responseErrorMessage={imageResponseMessage}
          infoMessage="회사 썸네일 이미지는 정사각형 비율(1:1)로 보여져요."
          required={true}
        />
        <StringSelectForm<Series>
          label="투자 단계"
          input={series}
          inputList={seriesList}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.series.isError}
          errorMessage="투자 단계를 선택해주세요."
          required={true}
        />
        <InvestAmountField
          label="누적 투자액"
          input={investAmount}
          unit="천만원"
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.investAmount.isError}
          errorMessage="0 이상의 양의 정수로 입력해주세요."
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
          isSubmitError={formStates.irDeckLink.isError}
          errorMessage="5MB 이하의 PDF 파일을 올려주세요."
          responseErrorMessage={pdfResponseMessage}
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
          label={{
            main: '외부 소개 링크',
            description: '제목',
            link: '링크',
          }}
          input={externalDescriptionLink}
          rawInput={rawExternalDescriptionLink}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.externalDescriptionLink.isError}
          placeholder={{
            description:
              '링크 제목을 작성해주세요. (e.g. OO 프로젝트 성과 기사)',
            link: 'https://',
          }}
          infoMessage="더벤처스, 잡코리아, 기사 링크 등 회사를 소개할 수 있는 기타 링크를 첨부해주세요."
          errorMessage="외부 소개 링크는 최대 5개까지 입력 가능하며 링크는 https로 시작해야 합니다."
          inputErrorMessage="중복되지 않는 유효한 링크와 100자 이내의 설명글을 입력해주세요."
        />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={handleClickCancelButton}
            disabled={isPending}
            className="flex-1"
          >
            뒤로가기
          </Button>
          <Button
            onClick={handleSubmit}
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

const useGetPresignedUrl = ({
  onSuccess,
  setResponseMessage,
  setLink,
}: {
  onSuccess({ presignedUrl }: { presignedUrl: string }): void;
  setResponseMessage(input: string): void;
  setLink(input: string): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutate: getPresignedUrl, isPending } = useMutation({
    mutationFn: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return fileService.getPresignedUrl({ token, fileName, fileType });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        onSuccess({ presignedUrl: response.data.presignedUrl });
        setLink(response.data.presignedUrl);
      } else {
        setResponseMessage(createErrorMessage(response.code));
        setLink('');
      }
    },
    onError: () => {
      setResponseMessage('업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.');
      setLink('');
    },
  });

  return {
    getPresignedUrl,
    isPending,
  };
};

const useUploadFile = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutate: uploadFile, isPending } = useMutation({
    mutationFn: ({
      presignedUrl,
      file,
    }: {
      presignedUrl: string;
      file: File | undefined;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      if (file === undefined) {
        throw new Error('파일이 존재하지 않습니다.');
      }
      return fileService.uploadImage({ presignedUrl, file });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setResponseMessage('');
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage('업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  return {
    uploadFile,
    isPending,
  };
};

const useCreateCompany = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { postService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { toMain } = useRouteNavigation();

  const { mutate: createCompany, isPending } = useMutation({
    mutationFn: ({ company }: { company: CreateCompanyRequest }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return postService.createCompany({ token, companyContents: company });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toMain();
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '회사 생성에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return {
    createCompany,
    isPending,
  };
};
