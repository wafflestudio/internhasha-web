import { ApplicantInfo } from '@/feature/applicant';

export const CoffeeChatDetailView = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-10 px-6 py-[30px] sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl">
      <div className="flex w-[700px] flex-col gap-6 rounded-lg bg-white px-[40px] py-[46px] text-grey-900">
        <ApplicantInfo />
        <div className="flex flex-col gap-[16px]">
          <h3 className="text-22 font-bold">커피챗 내용</h3>
          <p className="text-sm text-gray-700">커피챗 내용 test</p>
        </div>
      </div>
    </div>
  );
};
