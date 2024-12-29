import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { echoPresentation } from '@/presentation/echoPresentation';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';

export const MessageUppercaseConverter = () => {
  const [isValidationError, setIsValidationError] = useState(false);
  const messageState = echoPresentation.useMessageValidator();
  const { sendMessage, responseMessage, isPending } = useSendMessage();

  const handleButtonClick = () => {
    if (messageState.input.isError) {
      setIsValidationError(true);
    } else {
      sendMessage({ message: messageState.input.value });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Echo Message</h1>
      <input
        type="text"
        value={messageState.input.value}
        onChange={(e) => {
          messageState.input.onChange(e.target.value);
        }}
        placeholder="Type your message"
        disabled={isPending}
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      <button
        onClick={() => {
          handleButtonClick();
        }}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        disabled={isPending}
      >
        Send
      </button>
      {isValidationError && (
        <div style={{ marginTop: '20px', fontSize: '18px', color: 'red' }}>
          <strong>
            최대 입력 글자자수를 초과하였습니다. 500자 이내로 다시 입력해주세요.
          </strong>
        </div>
      )}
      <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
        <strong>Response:</strong> {responseMessage}
      </div>
    </div>
  );
};

const useSendMessage = () => {
  const { echoService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: ({ message }: { message: string }) => {
      return echoService.sendMessage({ message });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage('오류가 발생했습니다. 잠시 후에 다시 실행해주세요.');
      }
    },
    onError: () => {
      setResponseMessage('오류가 발생했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  return { sendMessage, responseMessage, isPending };
};
