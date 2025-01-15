import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ReSignInModal = () => {
  const { toLogin } = useRouteNavigation();

  const onClickButton = () => {
    toLogin();
  };

  return (
    <div>
      <div>
        <h2>인증정보가 올바르지 않아요</h2>
        <p>다시 로그인해 주세요</p>
        <div>
          <button onClick={onClickButton}>로그인 페이지로</button>
        </div>
      </div>
    </div>
  );
};
