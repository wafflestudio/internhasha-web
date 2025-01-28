import { useState } from 'react';

export const useDialog = ({ onClose }: { onClose(): void }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return { isVisible, handleClose };
};
