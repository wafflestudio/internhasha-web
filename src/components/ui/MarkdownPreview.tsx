import MDEditor from '@uiw/react-md-editor';

import { normalTextToEscape } from '@/util/escapeEncoder';

export const MarkdownPreview = ({ content }: { content: string }) => {
  return (
    <div
      data-color-mode="light"
      className="w-full p-4 font-regular text-grey-800"
    >
      <MDEditor.Markdown
        source={normalTextToEscape(content)}
        style={{ fontSize: '14px' }}
      />
    </div>
  );
};
