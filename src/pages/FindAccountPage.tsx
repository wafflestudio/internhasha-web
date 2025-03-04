import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FindIdForm, FindPasswordForm } from '@/feature/auth';

export const FindAccountPage = () => {
  return (
    <ModalBackgroundWithHeader>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[22px] font-bold text-center">
          아이디 ∙ 비밀번호 찾기
        </h2>
        <Tabs defaultValue="ID" className="flex flex-col w-full">
          <TabsList className="mt-[26px] p-[6px] gap-0 rounded-[10px] bg-grey-light">
            <TabsTrigger value="ID" variant="button">
              아이디
            </TabsTrigger>
            <TabsTrigger value="PASSWORD" variant="button">
              비밀번호
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ID">
            <FindIdForm />
          </TabsContent>
          <TabsContent value="PASSWORD">
            <FindPasswordForm />
          </TabsContent>
        </Tabs>
      </div>
    </ModalBackgroundWithHeader>
  );
};
