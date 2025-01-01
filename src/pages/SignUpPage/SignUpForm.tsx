import { GoogleSocialSignUpForm } from '@/pages/SignUpPage/GoogleSocialSignUpForm';
import { LocalSignUpForm } from '@/pages/SignUpPage/LocalSignUpForm';

export const SignUpForm = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>회원가입하기</h1>
      <GoogleSocialSignUpForm />
      <LocalSignUpForm />
    </div>
  );
};
