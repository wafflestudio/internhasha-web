import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor, Viewer } from '@toast-ui/react-editor';
import { useEffect, useRef } from 'react';

import { LabelContainer } from '@/components/label/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import type { Input as InputType } from '@/entities/input';

type MarkdownEditorFieldProps = {
  label: string;
  input: InputType<string>;
  isPending: boolean;
  isSubmit: boolean;
  isSubmitError: boolean;
  placeholder?: string;
  errorMessage: string;
  maxLength: number;
  infoMessage?: string;
  required?: boolean;
};

export const MarkdownEditorField = ({
  label,
  input,
  isPending,
  isSubmit,
  isSubmitError,
  placeholder,
  errorMessage,
  infoMessage,
  required,
  maxLength,
}: MarkdownEditorFieldProps) => {
  const editorRef = useRef<Editor>(null);

  const handleChange = () => {
    if (editorRef.current !== null) {
      const editorInstance = editorRef.current.getInstance();
      const markdown = editorInstance.getMarkdown();
      input.onChange(markdown);
    }
  };

  useEffect(() => {
    if (editorRef.current !== null) {
      const editorInstance = editorRef.current.getInstance();
      if (input.value.length === 0) {
        editorInstance.setMarkdown('');
      }
    }
  }, [input]);

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'link'],
    ['code', 'codeblock'],
  ];

  if (isPending) {
    <Viewer initialValue={input.value} />;
  }

  return (
    <LabelContainer label={label} required={required}>
      <Editor
        toolbarItems={toolbarItems}
        initialValue={input.value.trim().length !== 0 ? input.value : ' '}
        usageStatistics={false}
        useCommandShortcut={true}
        onChange={handleChange}
        autofocus={false}
        hideModeSwitch={true}
        ref={editorRef}
        placeholder={placeholder}
      />
      <div className="mt-1 flex flex-col gap-1">
        <div className="flex w-full flex-col justify-between sm:flex-row">
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
          <span
            className={`text-sm ${input.value.length > maxLength ? 'text-red-300' : 'text-grey-500'}`}
          >
            {input.value.length}/{maxLength}
          </span>
        </div>
        {isSubmit && isSubmitError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
    </LabelContainer>
  );
};
