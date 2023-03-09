import { FC } from 'react';

import OptionsContainer from './options-container';
import ThemeOptions from './theme-options';

const OptionsList: FC = () => {
  return (
    <div>
      <OptionsContainer>
        <ThemeOptions />
      </OptionsContainer>
    </div>
  );
};

OptionsList.displayName = 'ThemeOptions';

export default OptionsList;
