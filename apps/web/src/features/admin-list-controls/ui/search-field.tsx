import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';
import { useListParams } from '../model/use-list-params';

interface SearchFieldProps {
  placeholder?: string;
}

export function SearchField({ placeholder }: SearchFieldProps) {
  const { search, setParam } = useListParams();
  const [inputValue, setInputValue] = useState(search);

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-x/set-state-in-effect
  useEffect(() => setInputValue(search), [search]);

  const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParam('search', inputValue.trim());
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSearchSubmit}>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder}
          name="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" variant="secondary">
            Поиск
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
