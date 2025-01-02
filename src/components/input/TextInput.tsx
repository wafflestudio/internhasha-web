interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password';
}

export const TextInput = ({
  type,
  value,
  id,
  onChange,
  onKeyDown,
  placeholder,
}: TextInputProps) => {
  return (
    <input
      type={type === 'password' ? 'password' : 'text'}
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={{ padding: '10px', width: '300px', fontSize: '16px' }}
    />
  );
};
