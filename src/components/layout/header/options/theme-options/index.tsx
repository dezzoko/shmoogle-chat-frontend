import { ChangeEvent, FC } from 'react';

import { themes } from 'shared/themes';
import { useAppTheme } from 'shared/hooks/use-app-theme.hook';
import { OptionsHeader } from '../styled';
import { RadioButtonContainer } from './styled';
import { RadioButton } from 'components/ui';

const ThemeOptions: FC = () => {
  const [theme, setTheme] = useAppTheme();

  const themeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value in themes) {
      setTheme(value);
    }
  };

  return (
    <>
      <OptionsHeader>Оформление</OptionsHeader>
      <div style={{ marginTop: '20px' }}>
        <RadioButtonContainer>
          <RadioButton name="theme" checked={theme == themes.light} value="light" onChange={themeChangeHandler}>
            Светлое
          </RadioButton>
        </RadioButtonContainer>
        <RadioButtonContainer style={{ marginTop: '10px' }}>
          <RadioButton name="theme" checked={theme == themes.dark} value="dark" onChange={themeChangeHandler}>
            Тёмное
          </RadioButton>
        </RadioButtonContainer>
      </div>
    </>
  );
};

ThemeOptions.displayName = 'ThemeOptions';

export default ThemeOptions;
