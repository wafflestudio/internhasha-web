import { useState } from 'react';

import { LabelContainer } from '@/components/label/LabelContainer';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Input } from '@/components/ui/input';
import { ICON_SRC } from '@/entities/asset';
import type { Input as InputType } from '@/entities/input';

export const PasswordConfirmField = ({
  label,
  id,
  password,
  placeholder,
  formError,
}: {
  label: string;
  id: string;
  password: InputType<string>;
  placeholder: string;
  formError?: string;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <LabelContainer label={label}>
      <div className="relative">
        <Input
          id={id}
          type={isPasswordVisible ? 'text' : 'password'}
          value={password.value}
          onChange={(e) => {
            if (e.target.value === '') {
              setIsPasswordFocused(false);
            } else {
              setIsPasswordFocused(true);
            }
            password.onChange(e.target.value);
          }}
          placeholder={placeholder}
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
      {formError !== undefined && isPasswordFocused && password.isError && (
        <FormErrorResponse>{formError}</FormErrorResponse>
      )}
    </LabelContainer>
  );
};
