import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { ExternalLinkField } from '@/components/field/ExternalLinkField';
import { HashtagField } from '@/components/field/HashtagField';
import { ImageField } from '@/components/field/ImageField';
import { MultiStringField } from '@/components/field/MultiStringField';
import { PdfField } from '@/components/field/PdfField';
import { StringField } from '@/components/field/StringField';
import { StringFieldWithUnit } from '@/components/field/StringFieldWithLabel';
import { TextareaField } from '@/components/field/TextareaField';
import { FormContainer } from '@/components/form/FormContainer';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { SeperatorLine } from '@/components/ui/separator';
import { createErrorMessage } from '@/entities/errors';
import type { Link } from '@/entities/link';
import { applicantFormPresentation } from '@/feature/applicant/presentation/applicantFormPresentation';
import {
  applicantInputPresentation,
  MAX_EXPLANATION_LENGTH,
  MAX_SLOGAN_LENGTH,
} from '@/feature/applicant/presentation/applicantInputPresentation';
import { DepartmentsField } from '@/feature/applicant/ui/form/fields/DepartmentField';
import { SkeletonProfileForm } from '@/feature/applicant/ui/form/SkeletonProfileForm';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import {
  useDownloadFile,
  useGetPresignedUrl,
  useUploadFile,
} from '@/shared/file/hooks';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

type CreateApplicantProfileRequest = {
  enrollYear: number;
  department: string;
  positions?: string[];
  slogan?: string;
  explanation?: string;
  stacks?: string[];
  imageKey?: string;
  cvKey?: string;
  portfolioKey?: string;
  links?: Link[];
};

export const CreateProfileForm = ({
  initialState,
}: {
  initialState?: {
    enrollYear?: number;
    department: string;
    positions?: string[];
    slogan?: string;
    explanation?: string;
    stacks?: string[];
    imageKey?: string;
    cvKey?: string;
    portfolioKey?: string;
    links?: Link[];
  };
}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const { inputStates, formStates } = applicantFormPresentation.useValidator({
    applicantInputPresentation,
    initialState,
  });

  const {
    enrollYear,
    majorDepartment,
    rawMinorDepartment,
    minorDepartment,
    rawPosition,
    positions,
    slogan,
    explanation,
    rawStack,
    stacks,
    imagePreview,
    cvPreview,
    portfolioPreview,
    rawLink,
    links,
  } = inputStates;

  const { toBack } = useRouteNavigation();

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  const { handleCreateApplicantProfile, isPending } =
    useCreateApplicantProfileWithUploads({
      setResponseMessage: setResponseMessage,
    });

  const { isPending: isInitialImagePreviewPending } = useDownloadFile({
    s3Key: initialState?.imageKey,
    fileType: 'USER_THUMBNAIL',
    fileName: '인턴하샤_썸네일_이미지',
    setData: imagePreview.onChange,
  });
  const { isPending: isInitialCvPreviewPending } = useDownloadFile({
    s3Key: initialState?.cvKey,
    fileType: 'CV',
    fileName: '인턴하샤_이력서',
    setData: cvPreview.onChange,
  });
  const { isPending: isInitialPortfolioPreviewPending } = useDownloadFile({
    s3Key: initialState?.portfolioKey,
    fileType: 'PORTFOLIO',
    fileName: '인턴하샤_포트폴리오',
    setData: portfolioPreview.onChange,
  });

  if (
    (initialState?.imageKey !== undefined && isInitialImagePreviewPending) ||
    (initialState?.cvKey !== undefined && isInitialCvPreviewPending) ||
    (initialState?.portfolioKey !== undefined &&
      isInitialPortfolioPreviewPending)
  ) {
    return <SkeletonProfileForm />;
  }

  const handleSubmit = () => {
    setIsSubmit(true);
    if (
      formStates.enrollYear.isError ||
      formStates.department.isError ||
      formStates.slogan.isError ||
      formStates.explanation.isError ||
      formStates.stacks.isError ||
      formStates.links.isError
    ) {
      return;
    }

    handleCreateApplicantProfile({
      applicantInfo: {
        enrollYear: formStates.enrollYear.value,
        positions: formStates.positions.value,
        department: formStates.department.value,
        slogan: formStates.slogan.value,
        explanation: formStates.explanation.value,
        stacks: formStates.stacks.value,
        links: formStates.links.value,
      },
      imagePreview:
        imagePreview.value !== null ? imagePreview.value.file : null,
      cvPreview: cvPreview.value !== null ? cvPreview.value.file : null,
      portfolioPreview:
        portfolioPreview.value !== null ? portfolioPreview.value.file : null,
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
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-22 font-semibold">필수 작성 항목</h3>
          <p className="text-12 font-regular text-grey-600">
            아래 항목은 필수로 작성해주세요.
          </p>
        </div>
        <StringFieldWithUnit
          label="학번"
          input={enrollYear}
          unit="학번"
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.enrollYear.isError}
          placeholder="25"
          errorMessage="두 자리 수 숫자로 작성해주세요. (e.g. 25)"
          required={true}
        />
        <DepartmentsField
          label="학과"
          majorInput={majorDepartment}
          minorListInput={minorDepartment}
          minorRawInput={rawMinorDepartment}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.department.isError}
          majorPlaceholder="주전공 학과명을 입력해주세요. (예시: 컴퓨터공학부, 경제학부 등)"
          minorPlaceholder="다전공 학과명을 입력해주세요. (예시: 컴퓨터공학부, 경제학부 등)"
          errorMessage="희망 직무는 10개 이하로 중복되지 않게 입력해주세요."
          inputErrorMessage="중복되지 않는 100자 이내의 직무명을 작성해주세요."
          required={true}
        />

        <SeperatorLine />

        <div className="flex flex-col gap-[10px]">
          <h3 className="text-22 font-semibold">선택 작성 항목</h3>
          <p className="text-12 font-regular text-grey-600">
            아래 항목은 필수로 작성하지 않아도 괜찮지만, 작성해 주시면 채용
            담당자가 지원자의 강점을 이해하는 데 더욱 도움이 되어요.
          </p>
        </div>
        <MultiStringField
          label="희망 직무"
          keyPrefix="invest-company"
          input={positions}
          rawInput={rawPosition}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.positions.isError}
          placeholder="희망 직무를 입력해주세요. (예시: 웹 프론트엔드 개발, 백엔드 개발 등)"
          errorMessage="희망 직무는 10개 이하로 중복되지 않게 입력해주세요."
          inputErrorMessage="중복되지 않는 100자 이내의 직무명을 작성해주세요."
        />
        <HashtagField
          label="기술 스택"
          input={stacks}
          rawInput={rawStack}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.stacks.isError}
          placeholder="사용할 수 있는 상세 기술 스택을 입력해주세요.(최대 10개)(예시: Python, Django 등)"
          infoMessage="기술 스택은 엔터로 구분되며 한 개당 최대 30자까지 입력할 수 있어요."
          inputErrorMessage="기존 태그와 중복되지 않는 30자 이하의 기술 스택을 작성해주세요."
          errorMessage="하나의 기술 스택은 30자 이하, 총 10개까지 작성 가능합니다."
        />
        <StringField
          label="한 줄 소개"
          input={slogan}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.slogan.isError}
          maxLength={MAX_SLOGAN_LENGTH}
          placeholder="한 줄 소개를 입력해주세요."
          errorMessage={`한 줄 소개는 ${MAX_SLOGAN_LENGTH}자 이내로 작성해주세요.`}
        />
        <TextareaField
          label="자기소개"
          input={explanation}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.explanation.isError}
          maxLength={MAX_EXPLANATION_LENGTH}
          placeholder="자신에 대한 상세 소개를 작성해주세요.\n\n[예시 작성 문항]\n- 전공 및 지원 분야에 대한 관심\n- 참여한 프로젝트등의 관련 경험\n- 성격적 강점\n- 팀 협업 경험\n"
          errorMessage={`상세 소개는 ${MAX_EXPLANATION_LENGTH}자 이내로 작성해주세요.`}
          infoMessage="나를 소개하는 한 마디를 입력해주세요."
          minLine={7}
        />
        <ImageField
          label="프로필 사진"
          input={imagePreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={imagePreview.isError}
          errorMessage="1MB 이하의 이미지 파일을 올려주세요."
          infoMessage="회사 썸네일 이미지는 정사각형 비율(1:1)로 보여져요."
        />
        <PdfField
          label="이력서 (CV)"
          input={cvPreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={cvPreview.isError}
          errorMessage="5MB 이하의 PDF 파일을 올려주세요."
        />
        <PdfField
          label="포트폴리오 (디자이너용)"
          input={portfolioPreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={portfolioPreview.isError}
          errorMessage="5MB 이하의 PDF 파일을 올려주세요."
        />
        <ExternalLinkField
          label="기타 소개 링크"
          input={links}
          rawInput={rawLink}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.links.isError}
          placeholder={{
            description: '링크 제목을 작성해주세요. (e.g. 깃허브)',
            link: 'https://',
          }}
          infoMessage="깃허브, 링크드인, 개인 홈페이지 등 자신을 소개할 수 있는 기타 링크를 첨부해주세요."
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

const useCreateApplicantProfileWithUploads = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { applicantService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const queryClient = useQueryClient();
  const { getPresignedUrl } = useGetPresignedUrl({ setResponseMessage });
  const { uploadFile } = useUploadFile({ setResponseMessage });

  const [isPending, setIsPending] = useState(false);
  const { toMyPage } = useRouteNavigation();

  const { mutate: createApplicantProfile } = useMutation({
    mutationFn: ({
      applicantContents,
    }: {
      applicantContents: CreateApplicantProfileRequest;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return applicantService.putProfile({ token, body: applicantContents });
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
        '프로필 저장에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  const handleCreateApplicantProfile = async ({
    applicantInfo,
    imagePreview,
    cvPreview,
    portfolioPreview,
  }: {
    applicantInfo: Omit<
      CreateApplicantProfileRequest,
      'imageKey' | 'cvKey' | 'portfolioKey'
    >;
    imagePreview: File | null;
    cvPreview: File | null;
    portfolioPreview: File | null;
  }) => {
    try {
      setIsPending(true);

      const [
        applicantThumbnailPresignedUrlResponse,
        cvPresignedUrlResponse,
        portfolioPresignedUrlResponse,
      ] = await Promise.all([
        imagePreview !== null
          ? getPresignedUrl({
              fileName: imagePreview.name,
              fileType: 'USER_THUMBNAIL',
            })
          : Promise.resolve(null),
        cvPreview !== null
          ? getPresignedUrl({
              fileName: cvPreview.name,
              fileType: 'CV',
            })
          : Promise.resolve(null),
        portfolioPreview !== null
          ? getPresignedUrl({
              fileName: portfolioPreview.name,
              fileType: 'PORTFOLIO',
            })
          : Promise.resolve(null),
      ]);

      if (
        applicantThumbnailPresignedUrlResponse?.type === 'error' ||
        cvPresignedUrlResponse?.type === 'error' ||
        portfolioPresignedUrlResponse?.type === 'error'
      ) {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
        return;
      }

      const [
        applicantThumbnailUploadResponse,
        cvUploadResponse,
        portfolioUploadResponse,
      ] = await Promise.all([
        applicantThumbnailPresignedUrlResponse !== null
          ? uploadFile({
              presignedUrl: applicantThumbnailPresignedUrlResponse.data.url,
              file: imagePreview !== null ? imagePreview : undefined,
            })
          : null,
        cvPresignedUrlResponse !== null
          ? uploadFile({
              presignedUrl: cvPresignedUrlResponse.data.url,
              file: cvPreview !== null ? cvPreview : undefined,
            })
          : null,
        portfolioPresignedUrlResponse !== null
          ? uploadFile({
              presignedUrl: portfolioPresignedUrlResponse.data.url,
              file: portfolioPreview !== null ? portfolioPreview : undefined,
            })
          : null,
      ]);

      if (
        applicantThumbnailUploadResponse?.type === 'error' ||
        cvUploadResponse?.type === 'error' ||
        portfolioUploadResponse?.type === 'error'
      ) {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
        return;
      }

      createApplicantProfile({
        applicantContents: {
          ...applicantInfo,
          imageKey:
            applicantThumbnailPresignedUrlResponse !== null
              ? applicantThumbnailPresignedUrlResponse.data.s3Key
              : undefined,
          cvKey:
            cvPresignedUrlResponse !== null
              ? cvPresignedUrlResponse.data.s3Key
              : undefined,
          portfolioKey:
            portfolioPresignedUrlResponse !== null
              ? portfolioPresignedUrlResponse.data.s3Key
              : undefined,
        },
      });
    } catch {
      setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return {
    handleCreateApplicantProfile,
    isPending,
  };
};
