import { Viewer } from '@toast-ui/react-editor';

export const MarkdownPreview = ({ content }: { content: string }) => {
  return (
    <div className="w-full p-4 font-regular text-grey-800">
      <Viewer initialValue={content} />
    </div>
  );
};
