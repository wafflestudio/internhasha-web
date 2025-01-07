interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password';
}

export const TextInput = ({
  type,
  value,
  id,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
}: TextInputProps) => {
  return (
    <input
      type={type === 'password' ? 'password' : 'text'}
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      style={{ padding: '10px', width: '300px', fontSize: '16px' }}
    />
  );
};
