import { useState } from 'react';

import { ExternalLinkField } from '@/components/field/ExternalLinkField';
import { HashtagField } from '@/components/field/HashtagField';
import { ImageField } from '@/components/field/ImageField';
import { PdfField } from '@/components/field/PdfField';
import { StringField } from '@/components/field/StringField';
import { StringFieldWithUnit } from '@/components/field/StringFieldWithLabel';
import { TextareaField } from '@/components/field/TextareaField';
import { FormContainer } from '@/components/form/FormContainer';
import { CancelCheckModal } from '@/components/modal/CancelCheckModal';
import { Button } from '@/components/ui/button';
import { applicantFormPresentation } from '@/feature/applicant/presentation/applicantFormPresentation';
import {
  applicantInputPresentation,
  MAX_EXPLANATION_LENGTH,
  MAX_SLOGAN_LENGTH,
} from '@/feature/applicant/presentation/applicantInputPresentation';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const CreateProfileForm = () => {
  const [isCancel, setIsCancel] = useState(false);

  const { inputStates, formStates } = applicantFormPresentation.useValidator({
    applicantInputPresentation,
  });

  const {
    enrollYear,
    department,
    slogan,
    explanation,
    rawStack,
    stack,
    imagePreview,
    cvPreview,
    portfolioPreview,
    rawLink,
    links,
  } = inputStates;

  const { toMain } = useRouteNavigation();

  const handleClickCancelButton = () => {
    setIsCancel(true);
  };

  const closeCancelModal = () => {
    setIsCancel(false);
  };

  // TODO: API 연결 이후 삭제
  const handleSubmit = () => {};
  const isPending = false;
  const isSubmit = false;

  return (
    <>
      <FormContainer handleSubmit={handleSubmit} className="gap-10">
        <StringField
          label="학과"
          input={department}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.department.isError}
          placeholder="학과명을 입력해주세요."
          errorMessage="올바른 학과명을 입력해주세요."
          required={true}
        />
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
        {/* TODO: 지망 포지션 필드 추가 */}
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
          placeholder="자신에 대한 상세 소개를 작성해주세요.\n\n[예시 작성 문항]\n- 전공 및 지원 분야에 대한 관심\n- 참여한 프로젝트등의 관련 경험\n- 성격적 강점\n 팀 협업 경험\n"
          errorMessage={`상세 소개는 ${MAX_EXPLANATION_LENGTH}자 이내로 작성해주세요.`}
          infoMessage="나를 소개하는 한 마디를 입력해주세요."
          minLine={7}
        />
        <HashtagField
          label="상세 기술 스택"
          input={stack}
          rawInput={rawStack}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={formStates.stack.isError}
          placeholder="사용할 수 있는 상세 기술 스택을 입력해주세요.(최대 10개)"
          infoMessage="기술 스택은 엔터로 구분되며 한 개당 최대 20자까지 입력할 수 있어요."
          inputErrorMessage="기존 태그와 중복되지 않는 20자 이하의 태그를 작성해주세요."
          errorMessage="하나의 태그는 20자 이하, 총 10개까지 작성 가능합니다."
        />
        <ImageField
          label="프로필 사진"
          input={imagePreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={imagePreview.isError || imagePreview.value === null}
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
        {/* TODO: 디자이너 직군을 선택한 경우에면 포트폴리오 입력 필드가 나타나도록 설정 */}
        <PdfField
          label="포트폴리오 (디자이너용)"
          input={portfolioPreview}
          isPending={isPending}
          isSubmit={isSubmit}
          isSubmitError={portfolioPreview.isError}
          errorMessage="5MB 이하의 PDF 파일을 올려주세요."
        />
        <ExternalLinkField
          label="외부 소개 링크"
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
