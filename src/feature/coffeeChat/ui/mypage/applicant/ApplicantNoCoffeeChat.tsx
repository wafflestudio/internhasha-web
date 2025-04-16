export const ApplicantNoCoffeeChat = () => {
  return (
    <div className="flex h-[300px] flex-col items-center justify-around rounded-xl bg-white px-6 py-12 text-grey-900">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-22 font-bold">
          아직 신청된 커피챗이 존재하지 않습니다.
        </h2>
        <p className="text-14 font-regular text-grey-700">
          커피챗 신청이 오면 이메일로 알림을 전송해드려요.
        </p>
      </div>
    </div>
  );
};
