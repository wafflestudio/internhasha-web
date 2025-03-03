import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authPresentation } from '@/feature/auth/presentation/authPresentation';

export const FindPwForm = () => {
  const { localId, snuMail } = authPresentation.useValidator({});

  const onSubmit = () => {};

  return (
    <>
      <FormContainer id="FindIdForm" handleSubmit={onSubmit}>
        <LabelContainer label="아이디" id="localId">
          <Input
            id="localId"
            value={localId.value}
            onChange={(e) => {
              localId.onChange(e.target.value);
            }}
            placeholder="가입한 아이디"
          />
        </LabelContainer>
        <LabelContainer label="이메일" id="email">
          <div className="relative">
            <Input
              id="email"
              value={snuMail.value}
              onChange={(e) => {
                snuMail.onChange(e.target.value);
              }}
              placeholder="마이스누 아이디"
              className="pr-[84px]"
            />
            <span className="absolute top-[11px] right-3 text-grey text-sm">
              @snu.ac.kr
            </span>
          </div>
        </LabelContainer>
        <Button>메일로 전송</Button>
      </FormContainer>
    </>
  );
};
