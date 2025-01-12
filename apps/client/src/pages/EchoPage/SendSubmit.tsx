import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';

export const SendSubmit = () => {
  const [email, setEmail] = useState('');
  const { sendMessage, message, isPending } = useSendSubmit();

  const handleButtonClick = () => {
    sendMessage({ email });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Send Submit</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Type your email"
        disabled={isPending}
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      <button
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        disabled={isPending}
      >
        {isPending ? 'Sending...' : 'Send'}
      </button>
      <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
        <strong>등록 시간:</strong> {message}
      </div>
    </div>
  );
};

const useSendSubmit = () => {
  const { echoService } = useGuardContext(ServiceContext);
  const [message, setMessage] = useState('');

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await echoService.sendSubmit({
        body: { email: email, isSubscribed: true },
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setMessage(response.data.createdAt); // Convert to uppercase
      } else {
        setMessage(response.message);
      }
    },
    onError: () => {
      setMessage('오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    },
  });

  return { sendMessage, message, isPending };
};
