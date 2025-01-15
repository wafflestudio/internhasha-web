import {
  FormContainer,
  LabelContainer,
  TextInput,
} from '@waffle/design-system';

export const CreateCompanyForm = () => {
  const handleSubmit = () => {};
  return (
    <FormContainer handleSubmit={handleSubmit} response={''}>
      <LabelContainer label="회사명" id="companyName">
        <TextInput />
      </LabelContainer>
      <p>회사명</p>
      <p>회사 이메일</p>
      <p>한 줄 소개</p>
      <p>해시태그</p>
      <p>시리즈</p>
      <p>누적 투자액</p>
      <p>투자사 정보</p>
      <p>썸네일 이미지</p>
      <p>IR Deck 자료</p>
      <p>기업소개 랜딩 페이지</p>
      <p>외부 소개 링크</p>
    </FormContainer>
  );
};
