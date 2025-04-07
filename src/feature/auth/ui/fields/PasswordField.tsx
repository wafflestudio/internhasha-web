import { useState } from 'react';

import { LabelContainer } from '@/components/label/LabelContainer';
import { Input } from '@/components/ui/input';
import { ICON_SRC } from '@/entities/asset';
import type { Input as InputType } from '@/entities/input';

export const PasswordField = ({
  label,
  id,
  password,
  placeholder,
}: {
  label: string;
  id: string;
  password: InputType<string>;
  placeholder: string;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <LabelContainer label={label}>
      <div className="relative">
        <Input
          id={id}
          type={isPasswordVisible ? 'text' : 'password'}
          value={password.value}
          onChange={(e) => {
            password.onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="relative"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPasswordVisible(!isPasswordVisible);
          }}
          className="absolute right-3 top-3 flex items-center"
        >
          <img
            src={isPasswordVisible ? ICON_SRC.EYE.OPEN : ICON_SRC.EYE.CLOSE}
            alt="비밀번호 보기"
            className="h-5 w-5 cursor-pointer"
          />
        </button>
      </div>
    </LabelContainer>
  );
};
