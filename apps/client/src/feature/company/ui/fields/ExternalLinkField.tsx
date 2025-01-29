import { LabelContainer } from '@/components/input/LabelContainer';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ListInput } from '@/entities/input';

type HashtagFieldProps = {
  label: {
    main: string;
    link: string;
    description: string;
  };
  input: ListInput<{
    link: string;
    description: string;
  }>;
  isPending: boolean;
  isSubmit: boolean;
  errorMessage: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: {
    link?: string;
    description?: string;
  };
};

export const ExternalLinkField = ({
  label,
  input,
  isPending,
  isSubmit,
  errorMessage,
  infoMessage,
  required,
  placeholder,
}: HashtagFieldProps) => {
  return (
    <LabelContainer label={label.main} required={required}>
      {input.value.map((item, index) => (
        <div key={`external-link-${index}`}>
          <div>
            <LabelContainer label={label.description}>
              <Input
                value={item.description}
                placeholder={placeholder?.description}
                disabled={isPending}
                onChange={(e) => {
                  input.onChange({
                    input: {
                      link: item.link,
                      description: e.target.value,
                    },
                    index,
                    mode: 'PATCH',
                  });
                }}
              />
            </LabelContainer>
            <LabelContainer label={label.link}>
              <Input
                value={item.link}
                placeholder={placeholder?.link}
                disabled={isPending}
                onChange={(e) => {
                  input.onChange({
                    input: {
                      link: e.target.value,
                      description: item.description,
                    },
                    index,
                    mode: 'PATCH',
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    input.onChange({
                      input: { link: '', description: '' },
                      mode: 'ADD',
                    });
                  }
                }}
              />
            </LabelContainer>
            <Button
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                input.onChange({ input: item, mode: 'REMOVE' });
              }}
            >
              삭제
            </Button>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1">
        {infoMessage !== undefined && (
          <FormInfoResponse>{infoMessage}</FormInfoResponse>
        )}
        {isSubmit && input.isError && (
          <FormErrorResponse>{errorMessage}</FormErrorResponse>
        )}
      </div>
      <Button
        variant="secondary"
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          input.onChange({
            input: { link: '', description: '' },
            mode: 'ADD',
          });
        }}
      >
        추가
      </Button>
    </LabelContainer>
  );
};
