import { FC, useId, memo } from 'react';

import { StyledListCheckbox, StyledListCheckboxLabel } from './styled';

interface ListCheckboxProps {
  initialValue?: boolean;
  onChecked?: (event?: any) => void;
}

// TODO: Add inherited from html-checkbox props

const ListCheckbox: FC<ListCheckboxProps> = memo((props: ListCheckboxProps) => {
  const { onChecked, initialValue, ...other } = props;
  const id = useId();
  return (
    <>
      <StyledListCheckbox id={id} name={id} onChange={onChecked} checked={initialValue} {...other} />
      <StyledListCheckboxLabel htmlFor={id} />
    </>
  );
});

ListCheckbox.displayName = 'ListCheckbox';

export default ListCheckbox;
