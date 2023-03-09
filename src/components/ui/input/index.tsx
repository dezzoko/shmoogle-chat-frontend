import { ChangeEvent, FC, ReactNode, useRef } from 'react';

import { InputContainer, InputLengthIndicator, StyledInput } from './styled';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit?: (value?: string) => void;
  placeholder?: string;
  isLengthIndicator?: boolean;
  maxLength?: number;
  children?: ReactNode;
}

// TODO: add as option

const Input: FC<InputProps> = (props: InputProps) => {
  const { value, setValue, onSubmit, placeholder, children, maxLength, isLengthIndicator } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = (event: any) => {
    if (onSubmit) {
      onSubmit(value);
      setValue('');
    }
    event.preventDefault();
  };

  return (
    <InputContainer onSubmit={submitHandler}>
      <div>{children}</div>
      <StyledInput
        ref={inputRef}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={valueChangeHandler}
      />
      {isLengthIndicator && maxLength ? (
        <InputLengthIndicator>{value.length + '/' + maxLength}</InputLengthIndicator>
      ) : (
        <></>
      )}
    </InputContainer>
  );
};

Input.displayName = 'Input';

export default Input;
