import {
  FormContainer,
  LabelContainer,
  TextInput,
} from '@waffle/design-system';

export const CreatePostForm = () => {
  const handleSubmit = () => {};
  return (
    <FormContainer handleSubmit={handleSubmit} response={''}>
      <LabelContainer label="직무 및 인원수" id="jobWithHeadcount">
        <TextInput />
      </LabelContainer>
      <p>직무 및 인원수</p>
      <p>미팅 날짜</p>
      <p>기업 소개</p>
    </FormContainer>
  );
};
