import { GlobalNavigationBar } from '@/components/nav/GlobarNavigationBar';
import { CreateCompanyForm } from '@/feature/company';

export const CreateCompanyPage = () => {
  return (
    <div>
      <GlobalNavigationBar />
      <h1>채용 공고 작성하기</h1>
      <CreateCompanyForm />
    </div>
  );
};
