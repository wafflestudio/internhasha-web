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
import { TextareaField } from '@/components/field/TextareaField';
import { FormContainer } from '@/components/form/FormContainer';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import type { CreateCompanyRequest, Domain } from '@/entities/company';
import { domainList } from '@/entities/company';
import { createErrorMessage } from '@/entities/errors';
import type { Link } from '@/entities/link';
import { companyFormPresentation } from '@/feature/company/presentation/companyFormPresentation';
import {
  companyInputPresentation,
  MAX_DETAIL_LENGTH,
  MAX_SLOGAN_LENGTH,
} from '@/feature/company/presentation/companyInputPresentation';
import { LocationField } from '@/feature/company/ui/form/fields/LocationField';
import { SkeletonCompanyProfileForm } from '@/feature/company/ui/form/SkeletonCompanyProfileForm';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import {
  useDownloadFile,
  useGetPresignedUrl,
  useUploadFile,
} from '@/shared/file/hooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { formatDomainToLabel } from '@/util/format';

export const CreateCompanyProfileForm = ({
  initialState,
}: {
  initialState?: {
    companyEstablishedYear?: number;
    domain?: Domain | 'NONE';
    headcount?: number;
    location?: string;
    slogan?: string;
    detail?: string;
    profileImageKey?: string;
    companyInfoPDFKey?: string;
    landingPageLink?: string;
    links?: Link[];
    tags?: { tag: string }[];
  };
}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { inputStates, formStates } = companyFormPresentation.useValidator({
    initialState: {
      ...initialState,
      tags: initialState?.tags?.map((items) => items.tag),
    },
    companyInputPresentation,
  });

  const {
    companyEstablishedYear,
    domain,
    headcount,
    mainLocation,
    detailedLocation,
    slogan,
    detail,
    profileImagePreview,
    companyInfoPDFPreview,
    landingPageLink,
    rawLink,
    links,
    rawTag,
    tags,
  } = inputStates;

  const { toBack } = useRouteNavigation();

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  const { handleCreateCompany, isPending } = useCreateCompanyWithUploads({
    setResponseMessage: setResponseMessage,
  });
  const { isPending: isInitialImagePreviewPending } = useDownloadFile({
    s3Key: initialState?.profileImageKey,
    fileType: 'COMPANY_THUMBNAIL',
    fileName: '인턴하샤_썸네일_이미지',
    setData: profileImagePreview.onChange,
  });
  const { isPending: isInitialCompanyInfoPreviewPending } = useDownloadFile({
    s3Key: initialState?.companyInfoPDFKey,
    fileType: 'IR_DECK',
    fileName: '인턴하샤_회사소개',
    setData: companyInfoPDFPreview.onChange,
  });

  if (
    (initialState?.companyInfoPDFKey !== undefined &&
      isInitialImagePreviewPending) ||
    (initialState?.companyInfoPDFKey !== undefined &&
      isInitialCompanyInfoPreviewPending)
  ) {
    return <SkeletonCompanyProfileForm />;
  }

  const handleSubmit = () => {
    setIsSubmit(true);
    if (
      formStates.companyEstablishedYear.isError ||
      formStates.domain.isError ||
      formStates.headcount.isError ||
      formStates.location.isError ||
      formStates.slogan.isError ||
      formStates.detail.isError ||
      formStates.landingPageLink.isError ||
      formStates.links.isError ||
      formStates.tags.isError
    ) {
      setResponseMessage(
        '작성 내용 중 유효하지 않은 값이 존재합니다. 다시 확인해주세요.',
      );
      return;
    }

    // TODO: 불가능한 타입이지만 isError를 사용할 시 타입스크립트가 인식하지 못함.
    if (profileImagePreview.value === null) {
      return;
    }

    // TODO: 불가능한 타입이지만 isError를 사용할 시 타입스크립트가 인식하지 못함.
    if (formStates.domain.value === 'NONE') {
      return;
    }

    handleCreateCompany({
      companyInfo: {
        companyEstablishedYear: formStates.companyEstablishedYear.value,
        domain: formStates.domain.value,
        headcount: formStates.headcount.value,
        location: formStates.location.value,
        slogan: formStates.slogan.value,
        detail: formStates.detail.value,
        landingPageLink: formStates.landingPageLink.value,
        links: formStates.links.value,
        tags: formStates.tags.value,
      },
      profileImageFile: profileImagePreview.value.file,
      companyInfoPDFFile:
        companyInfoPDFPreview.value !== null
          ? companyInfoPDFPreview.value.file
          : undefined,
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
      <FormContainer
        handleSubmit={handleSubmit}
        className="gap-10"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // 엔터키 기본 동작 방지
          }
        }}
      >
        <StringSelectField<Domain>
          label="회사 업종"
          input={domain}
          inputList={domainList as Domain[]}
          formatter={formatDomainToLabel}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.domain.isError}
          errorMessage="회사 업종을 선택해주세요."
          required={true}
        />
        <StringFieldWithUnit
          label="회사 설립년도"
          input={companyEstablishedYear}
          unit="년"
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.companyEstablishedYear.isError}
          placeholder="2000"
          errorMessage="유효한 연도를 입력해주세요. (e.g. 2021)"
          required={true}
        />
        <StringFieldWithUnit
          label="회사 규모"
          input={headcount}
          unit="명"
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.headcount.isError}
          placeholder="구성 인원 수"
          errorMessage="유효한 인원수를 입력해주세요. (e.g. 20)"
          required={true}
        />
        <LocationField
          label="근무 위치"
          mainLocationInput={mainLocation}
          detailedLocationInput={detailedLocation}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.location.isError}
          mainLocationPlaceholder="도로명 주소를 검색해주세요."
          detailedLocationPlaceholder="상세 주소를 입력해주세요."
          errorMessage="도로명 주소와 상세 주소를 모두 입력해주세요."
          required={true}
        />
        <TextareaField
          label="회사 한 줄 소개"
          input={slogan}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={slogan.isError}
          maxLength={MAX_SLOGAN_LENGTH}
          errorMessage={`내용은 ${MAX_SLOGAN_LENGTH}자 이내로 작성해주세요.`}
          infoMessage="한 줄 소개는 공고 카드에 보여져요."
          minLine={1}
          required={true}
        />
        <MarkdownEditorField
          label="회사 상세 소개"
          input={detail}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.detail.isError}
          maxLength={MAX_DETAIL_LENGTH}
          errorMessage={`상세 소개는 ${MAX_DETAIL_LENGTH}자 이내로 작성해주세요.`}
          infoMessage="상세 소개는 공고 글에 보여져요."
          required={true}
        />
        <ImageField
          label="대표 사진"
          input={profileImagePreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={
            profileImagePreview.isError || profileImagePreview.value === null
          }
          errorMessage="1MB 이하의 이미지 파일을 올려주세요."
          infoMessage="회사 썸네일 이미지는 정사각형 비율(1:1)로 보여져요."
          required={true}
        />
        <HashtagField
          label="태그"
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
          label="회사 소개 자료"
          input={companyInfoPDFPreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={companyInfoPDFPreview.isError}
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
            type="button"
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
        <CancelCheckModal
          onClose={() => {
            toBack();
          }}
          onCancel={closeCancelModal}
        />
      )}
    </>
  );
};

const useCreateCompanyWithUploads = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { companyService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const queryClient = useQueryClient();
  const { getPresignedUrl } = useGetPresignedUrl({ setResponseMessage });
  const { uploadFile } = useUploadFile({ setResponseMessage });

  const [isPending, setIsPending] = useState(false);
  const { toMyPage } = useRouteNavigation();

  const { mutate: createCompany } = useMutation({
    mutationFn: ({
      companyEstablishedYear,
      domain,
      headcount,
      location,
      slogan,
      detail,
      profileImageKey,
      companyInfoPDFKey,
      landingPageLink,
      links,
      tags,
    }: {
      companyEstablishedYear: number;
      domain: Domain;
      headcount: number;
      location: string;
      slogan: string;
      detail: string;
      profileImageKey: string;
      companyInfoPDFKey?: string;
      landingPageLink?: string;
      links?: Link[];
      tags?: { tag: string }[];
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }

      return companyService.createCompany({
        token,
        companyEstablishedYear,
        domain,
        headcount,
        location,
        slogan,
        detail,
        profileImageKey,
        companyInfoPDFKey,
        landingPageLink,
        links,
        tags,
      });
    },

    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries();
        toMyPage({ query: { tab: 'PROFILE' } });
        return;
      }
      setResponseMessage(createErrorMessage(response.code));
    },

    onError: () => {
      setResponseMessage(
        '프로필 생성에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  const handleCreateCompany = async ({
    companyInfo,
    profileImageFile,
    companyInfoPDFFile,
  }: {
    companyInfo: Omit<
      CreateCompanyRequest,
      'profileImageKey' | 'companyInfoPDFKey'
    >;
    profileImageFile: File;
    companyInfoPDFFile?: File;
  }) => {
    try {
      setIsPending(true);

      const [
        profileImagePresignedUrlResponse,
        companyInfoPDFPresignedUrlResponse,
      ] = await Promise.all([
        getPresignedUrl({
          fileName: profileImageFile.name,
          fileType: 'COMPANY_THUMBNAIL',
        }),
        companyInfoPDFFile !== undefined
          ? getPresignedUrl({
              fileName: companyInfoPDFFile.name,
              fileType: 'IR_DECK',
            })
          : Promise.resolve(null),
      ]);

      if (
        profileImagePresignedUrlResponse.type === 'error' ||
        companyInfoPDFPresignedUrlResponse?.type === 'error'
      ) {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
        setIsPending(false);
        return;
      }

      const [profileImageUploadResponse, companyInfoPDFUploadResponse] =
        await Promise.all([
          uploadFile({
            presignedUrl: profileImagePresignedUrlResponse.data.url,
            file: profileImageFile,
          }),
          companyInfoPDFPresignedUrlResponse !== null
            ? uploadFile({
                presignedUrl: companyInfoPDFPresignedUrlResponse.data.url,
                file: companyInfoPDFFile,
              })
            : null,
        ]);

      if (
        profileImageUploadResponse.type === 'error' ||
        companyInfoPDFUploadResponse?.type === 'error'
      ) {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
        setIsPending(false);
        return;
      }

      createCompany({
        ...companyInfo,
        companyInfoPDFKey:
          companyInfoPDFPresignedUrlResponse !== null
            ? companyInfoPDFPresignedUrlResponse.data.s3Key
            : undefined,
        profileImageKey: profileImagePresignedUrlResponse.data.s3Key,
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
