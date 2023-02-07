import PropTypes from 'prop-types';
import {
  HeaderSearchbar,
  SearchForm,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <HeaderSearchbar className="searchbar">
      <SearchForm className="form" onSubmit={onSubmit}>
        <Button type="submit" className="button">
          <ButtonLabel className="button-label">Search</ButtonLabel>
        </Button>

        <Input
          className="input"
          name="filter"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </HeaderSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
