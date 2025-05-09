import { Button } from '@/components/ui/button';
import { ModalSelectBackground } from '@/components/ui/layout';
import { MarkdownPreview } from '@/components/ui/markdown-preview';
import { INFO_TERM_CONTENT } from '@/entities/agreements';
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
      className="max-h-screen w-full overflow-y-scroll rounded-none text-left xs:max-w-full sm:max-w-[800px]"
    >
      <div className="flex flex-col pt-4">
        <MarkdownPreview content={INFO_TERM_CONTENT} />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <Button variant="secondary" onClick={handleClose} className="flex-1">
          닫기
        </Button>
      </div>
    </ModalSelectBackground>
  );
};
