import { FC, useState, memo, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from 'core/constants/routes';
import { useAppSelector } from 'shared/hooks/app-selector.hook';
import {
  BlankDiv,
  SearchInputArea,
  SearchInputContainer,
  SearchInputResultsContainer,
  StyledSearchInput,
} from './styled';
import Tooltip from '../ui/tooltip';
import RoundButton from '../ui/round-button';
import CrossSvg from 'components/svg/cross-svg';
import SearchSvg from 'components/svg/search-svg';
import SearchInputResultsList from './search-input-result-list';

// TODO: improve filter, add invite action, implement search scope
const SearchInput: FC = memo(() => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const { searchScope } = useAppSelector((state) => state.searchInputReducer);

  const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearHandler = () => {
    setInputValue('');
  };

  const chatClickHandler = (chatId: string) => {
    navigate(routes.chat + chatId);
  };

  const userClickHandler = (userId: string, dmId?: string) => {
    if (dmId) {
      navigate(routes.dm + dmId);
    }
  };

  return (
    <SearchInputContainer onSubmit={(e) => e.preventDefault()}>
      <SearchInputArea>
        <Tooltip text="Поиск">
          <RoundButton size="24px" padding="8px" margin="0 8px">
            <SearchSvg />
          </RoundButton>
        </Tooltip>
        <StyledSearchInput
          onChange={changeValueHandler}
          value={inputValue}
          placeholder={!searchScope ? 'Поиск людей, чат-групп и сообщений' : `Поиск в чат-комнате ${searchScope.name}`}
        ></StyledSearchInput>
        {inputValue ? (
          <Tooltip text="Удалить поисковой запрос">
            <RoundButton size="24px" padding="8px" margin="0 8px" onClick={clearHandler}>
              <CrossSvg />
            </RoundButton>
          </Tooltip>
        ) : (
          <BlankDiv padding="25px"></BlankDiv>
        )}
      </SearchInputArea>

      {!searchScope && inputValue ? (
        <SearchInputResultsContainer>
          <SearchInputResultsList
            filterValue={inputValue}
            userClickHandler={userClickHandler}
            chatClickHandler={chatClickHandler}
          />
        </SearchInputResultsContainer>
      ) : (
        <></>
      )}
    </SearchInputContainer>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
