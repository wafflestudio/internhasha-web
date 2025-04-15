import MDEditor from '@uiw/react-md-editor';

export const MarkdownPreview = ({ content }: { content: string }) => {
  return (
    <div
      data-color-mode="light"
      className="w-full p-4 font-regular text-grey-800"
    >
      <MDEditor.Markdown source={content} style={{ fontSize: '14px' }} />
    </div>
  );
};
