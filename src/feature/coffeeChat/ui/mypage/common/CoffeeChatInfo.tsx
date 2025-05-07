import { ICON_SRC } from '@/entities/asset';

export const CoffeeChatInfo = () => {
  return (
    <div className="flex gap-2 text-13 font-light text-grey-700">
      <img src={ICON_SRC.INFO} className="mt-0.5 h-4 w-4" />
      <div className="flex flex-col gap-1 text-12 font-light">
        <p>
          커피챗의 상태는{' '}
          <b className="font-semibold">대기, 성사, 거절, 취소</b>로 나뉘어요.
        </p>
        <p>• 대기: 아직 회사에서 성사 또는 거절을 선택하지 않은 상태</p>
        <p>• 성사/거절: 회사 측에서 커피챗의 성사 또는 거절을 결정한 상태</p>
        <p>• 취소: 지원자가 커피챗을 취소한 상태</p>
      </div>
    </div>
  );
};
