import { FC, ReactNode, useId, memo, InputHTMLAttributes } from 'react';

import { HiddenInput, RadioButtonLabel, StyledRadioButton } from './styled';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const RadioButton: FC<RadioButtonProps> = memo((props: RadioButtonProps) => {
  const { children, ...other } = props;

  const id = useId();

  return (
    <>
      <HiddenInput {...other} type="radio" id={id} />
      <StyledRadioButton htmlFor={id}></StyledRadioButton>
      <RadioButtonLabel htmlFor={id}>{children}</RadioButtonLabel>
    </>
  );
});

RadioButton.displayName = 'RadioButton';

export default RadioButton;
