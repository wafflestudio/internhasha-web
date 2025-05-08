import { Button } from '@/components/ui/button';
import { ModalSelectBackground } from '@/components/ui/layout';
import { MarkdownPreview } from '@/components/ui/markdown-preview';
import { useDialog } from '@/shared/modal/hooks';

export const InfoTermModal = ({ onClose }: { onClose: () => void }) => {
  const { isVisible, handleClose } = useDialog({
    onClose,
  });

  return (
    <ModalSelectBackground
      variant="transparent"
      isVisible={isVisible}
      onOutSlideClick={handleClose}
      className="max-h-screen w-full max-w-[800px] overflow-y-scroll rounded-none text-left"
    >
      <div className="flex flex-col pt-4">
        <MarkdownPreview content={term} />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <Button variant="secondary" onClick={handleClose} className="flex-1">
          닫기
        </Button>
      </div>
    </ModalSelectBackground>
  );
};

const term = `
# 개인정보 처리방침

인턴하샤(이하 '회사')는 『개인정보 보호법』 등 관련 법령상의 개인정보 보호 규정을 준수하며, 이용자의 개인정보 보호를 위해 최선을 다하고 있습니다. 본 개인정보 처리방침은 회사가 제공하는 서비스와 관련하여 이용자의 개인정보를 어떻게 수집, 이용, 보관, 파기하는지를 설명하며, **2025년 5월 8일부터 적용**됩니다.

## 1. 수집하는 개인정보

회사는 다음과 같은 개인정보를 수집합니다.

- **학생 회원가입**
  - 수집 항목: 실명, 서울대학교 이메일 주소(@snu.ac.kr)
  - 수집 방식: 회원가입 시 직접 입력 또는 학교 메일 인증

- **회사 회원가입**
  - 수집 항목: 회사명, 회사 이메일 주소
  - 수집 방식: 이메일을 통한 개별 수집

- **서비스 이용**
  - 수집 항목: 학번, 학과, 이력서, 포트폴리오
  - 수집 방식: 서비스 이용 중 이용자가 직접 입력

## 2. 개인정보의 이용 목적

회사는 수집한 개인정보를 다음과 같은 목적을 위해 활용합니다.

- 회원 식별 및 인증, 서비스 제공 및 유지·관리  
- 인턴 커피챗 신청 및 매칭  
- 신규 서비스 개발 및 기존 서비스 개선  
- 학생이 신청한 커피챗이 수락된 경우, **실명, 이메일 등의 정보는 신청한 회사에 전달됨**

> ※ 단, 회사에 학생 정보 제공을 원하지 않는 경우 커피챗 신청을 취소할 수 있습니다.

## 3. 개인정보의 보유 및 이용기간

- **학생 회원**: 탈퇴 시점에 모든 개인정보가 즉시 파기됩니다.  
- **회사 회원**: 탈퇴 요청 시 회사가 수동으로 탈퇴를 처리하며, **회사 공고 이외의 모든 데이터는 삭제**됩니다.

## 4. 개인정보의 제3자 제공

회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.  
단, 아래의 경우 예외로 합니다.

- **이용자가 커피챗을 신청하고, 해당 신청이 수락된 경우**:  
  - 학생의 실명, 이메일 등 일부 정보가 신청한 회사에 제공됩니다.

## 5. 개인정보 처리의 위탁

회사는 개인정보 처리를 외부에 위탁하지 않습니다.

## 6. 개인정보의 파기

회사는 개인정보 보유 기간의 경과 또는 처리 목적 달성 시 지체 없이 해당 개인정보를 파기합니다.

- **전자적 파일**: 복구 및 재생이 불가능한 방식으로 삭제  
- **종이 문서**: 분쇄 또는 소각

## 7. 만 14세 미만 아동의 개인정보

회사는 만 14세 미만 아동으로부터 개인정보를 수집하지 않으며, 해당 연령층의 가입을 불허합니다.

## 8. 이용자의 권리와 행사 방법

- 이용자는 언제든지 본인의 개인정보에 대해 **열람, 정정, 삭제, 처리정지**를 요청할 수 있습니다.  
- 동의를 철회하고자 하는 경우, 서비스 내 **탈퇴 기능**을 통해 개인정보의 수집·이용을 철회할 수 있습니다.

## 9. 개인정보 보호책임자 안내

회사는 개인정보 보호에 관한 업무를 총괄해서 책임지고 있으며, 개인정보 관련 문의사항에 신속하고 성실하게 답변해드리고 있습니다.

- **개인정보 보호책임자**: 김연우  
- **이메일**: internhasha.official@gmail.com

## 10. 고지의 의무

이 개인정보 처리방침은 **2025년 5월 8일부터 적용**됩니다.  
변경이 있을 경우 사전 공지를 통해 안내드립니다.

`;
