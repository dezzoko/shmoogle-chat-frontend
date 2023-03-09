import { FC, ReactNode, useId, memo, ChangeEvent, InputHTMLAttributes } from 'react';

import { StyledOptionRadio, StyledOptionRadioLabel } from './styled';

interface OptionRadioOwnProps {
  children: ReactNode;
  name: string;
  value: any;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

type OptionRadioProps = OptionRadioOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof OptionRadioOwnProps>;

const OptionRadio: FC<OptionRadioProps> = memo((props: OptionRadioProps) => {
  const { children, name, value, checked, onChange, ...other } = props;

  const id = useId();

  return (
    <>
      <StyledOptionRadio
        {...other}
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <StyledOptionRadioLabel htmlFor={id}>{children}</StyledOptionRadioLabel>
    </>
  );
});

OptionRadio.displayName = 'OptionRadio';

export default OptionRadio;
