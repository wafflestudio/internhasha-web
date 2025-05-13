import { useState } from 'react';

import { LabelContainer } from '@/components/label/LabelContainer';
import { Input } from '@/components/ui/input';
import { ICON_SRC } from '@/entities/asset';
import type { InputWithDetailedError } from '@/entities/input';

export const PasswordFieldWithDetailedError = ({
  label,
  id,
  password,
  placeholder,
}: {
  label: string;
  id: string;
  password: InputWithDetailedError<
    string,
    {
      englishError: boolean;
      numberError: boolean;
      specialCharError: boolean;
      lengthError: boolean;
      patternError: boolean;
    }
  >;
  placeholder: string;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const isPasswordValid =
    !password.detailedError.lengthError &&
    !password.detailedError.numberError &&
    !password.detailedError.englishError &&
    !password.detailedError.specialCharError &&
    !password.detailedError.patternError;

  const detailedPasswordError = [
    {
      message: '비밀번호 8자리 이상(필수)',
      value: password.detailedError.lengthError,
    },
    { message: '숫자 포함', value: password.detailedError.numberError },
    {
      message: '영문 대소문자 포함',
      value: password.detailedError.englishError,
    },
    {
      message: '특수문자 포함',
      value: password.detailedError.specialCharError,
    },
    {
      message: '3자리 이상 반복 및 연속된 문자열이나 숫자가 없어야 함',
      value: password.detailedError.patternError,
    },
  ];
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
          onFocus={() => {
            setIsPasswordFocused(true);
          }}
          placeholder={placeholder}
          className="relative pr-10"
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
      {isPasswordFocused && !isPasswordValid && (
        <div className="flex flex-col gap-1">
          <div className="flex gap-[6px]">
            <img src={ICON_SRC.INFO} className="h-5 w-5" />
            <span className="text-13">
              아래와 같이 비밀번호를 설정하면 보안등급을 올릴 수 있어요
            </span>
          </div>
          <div className="flex flex-col gap-1 pl-6">
            {detailedPasswordError.map((detailedError, index) => (
              <div key={`detailed-error-${index}`} className="flex gap-1">
                {!detailedError.value ? (
                  <img src={ICON_SRC.CHECK} alt="통과 아이콘" />
                ) : (
                  <img src={ICON_SRC.CLOSE.GREY} alt="재작성 아이콘" />
                )}{' '}
                <span
                  className={
                    !detailedError.value
                      ? 'text-sm text-grey-900'
                      : 'text-sm text-grey-300'
                  }
                >
                  {detailedError.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </LabelContainer>
  );
};
